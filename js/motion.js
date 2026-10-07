/* ==========================================================================
   Wongdhen Cafe — motion (every page, after main.js)
   One requestAnimationFrame loop drives: smooth wheel scrolling (Lenis,
   mouse devices only), parallax, the hero drifting away, the evening band
   growing to full width, words lighting up, marquees, the scroll progress
   line, the header hiding on the way down and the seal turning as you scroll.
   Reveals (split headings, image curtains, count-ups) run off one
   IntersectionObserver. Transform / opacity / clip-path only.
   With prefers-reduced-motion nothing moves and everything is shown.
   ========================================================================== */
(function () {
  "use strict";
  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var vh = window.innerHeight;

  if (reduce || !("IntersectionObserver" in window)) { window.wdMotion = { observe: function () {} }; return; }
  root.classList.add("motion");
  // the loading screen (inline in each page) adds html.intro-done as its curtains lift;
  // until then the hero's reveals wait (styles.css) and the page doesn't scroll
  var waiting = root.classList.contains("is-intro") && !root.classList.contains("intro-done");

  /* ---------- split text ---------- */
  // data-split        → each word rises out of its own mask
  // data-split="chars" → the element's own text rises letter by letter (nested elements by word)
  function wrap(text, chars) {
    var frag = document.createDocumentFragment();
    text.split(/([ \t\n\r]+)/).forEach(function (part) {
      if (!part) return;
      if (/^[ \t\n\r]+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
      var w = document.createElement("span"); w.className = "w";
      (chars ? part.split("") : [part]).forEach(function (ch) {
        var i = document.createElement("span"); i.className = "w__i"; i.textContent = ch; w.appendChild(i);
      });
      frag.appendChild(w);
    });
    return frag;
  }
  function split(el) {
    var chars = el.getAttribute("data-split") === "chars";
    if (chars && !el.hasAttribute("aria-label")) el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
    (function walk(node, top) {
      [].slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) { if (n.textContent.trim()) node.replaceChild(wrap(n.textContent, chars && top), n); }
        else if (n.nodeType === 1 && n.tagName !== "BR") walk(n, false);
      });
    })(el, true);
    var d = parseFloat(getComputedStyle(el).getPropertyValue("--d")) || 0;
    if (el.closest(".hero, .page-hero")) d += 0.15;
    $$(".w__i", el).forEach(function (w, i) { w.style.transitionDelay = (d + i * (chars ? 0.045 : 0.055)).toFixed(3) + "s"; });
    el.classList.add("is-split");
  }

  /* ---------- count-ups: "4.4" → counts from 0 when it scrolls in ---------- */
  function countUp(el) {
    var txt = el.getAttribute("data-countup"), target = parseFloat(txt.replace(/,/g, ""));
    var dec = (txt.split(".")[1] || "").length, t0 = performance.now(), D = 1700;
    var fmt = function (v) { return dec ? v.toFixed(dec) : Math.round(v).toLocaleString("en-IN"); };
    (function step(t) {
      var k = clamp((t - t0) / D, 0, 1), e = 1 - Math.pow(2, -10 * k);
      el.textContent = fmt(target * (k === 1 ? 1 : e));
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* ---------- one observer for every reveal ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      if (e.target.hasAttribute("data-countup")) countUp(e.target);
      io.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -8% 0px" });

  function observe(scope) {
    $$("[data-split]:not(.is-split)", scope).forEach(function (el) { split(el); io.observe(el); });
    $$("[data-media]", scope).forEach(function (el) { io.observe(el); });
    $$(".menu-sub", scope).forEach(function (el) { el.setAttribute("data-rise", ""); io.observe(el); });
    $$("[data-countup]", scope).forEach(function (el) {
      if (!el.getAttribute("data-countup")) el.setAttribute("data-countup", el.textContent.trim());
      var dec = (el.getAttribute("data-countup").split(".")[1] || "").length;
      el.textContent = dec ? (0).toFixed(dec) : "0";
      io.observe(el);
    });
  }
  observe(document);
  window.wdMotion = { observe: observe }; // main.js calls this after re-drawing the menu

  /* ---------- words that light up as you read down (data-scrub) ---------- */
  var scrubs = $$("[data-scrub]").map(function (el) {
    (function walk(node) {
      [].slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3 && n.textContent.trim()) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/([ \t\n\r]+)/).forEach(function (p) {
            if (!p) return;
            if (/^[ \t\n\r]+$/.test(p)) frag.appendChild(document.createTextNode(" "));
            else { var s = document.createElement("span"); s.className = "sw"; s.textContent = p; frag.appendChild(s); }
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1) walk(n);
      });
    })(el);
    return { el: el, words: $$(".sw", el), last: [] };
  });

  /* ---------- marquees: drift, speed up with the scroll, follow its direction ---------- */
  var marquees = $$("[data-marquee]").map(function (m) {
    var track = m.firstElementChild, item = track.firstElementChild;
    var mq = { m: m, track: track, item: item, w: 0, x: 0, dir: m.getAttribute("data-marquee") === "right" ? 1 : -1, on: true };
    mq.measure = function () {
      mq.w = item.offsetWidth;
      while (track.children.length < Math.ceil(m.offsetWidth / mq.w) + 2) {
        var c = item.cloneNode(true); c.setAttribute("aria-hidden", "true"); track.appendChild(c);
      }
    };
    mq.measure();
    new IntersectionObserver(function (en) { mq.on = en[0].isIntersecting; }).observe(m);
    return mq;
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { marquees.forEach(function (mq) { mq.measure(); }); });

  /* ---------- smooth wheel scrolling (mouse devices) ---------- */
  var lenis = null;
  if (mouse && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.085, wheelMultiplier: 0.95, autoRaf: false });
    window.wdLenis = lenis; // main.js stops it while the mobile menu is open
    if (waiting) { lenis.stop(); window.addEventListener("wd:intro-done", function () { lenis.start(); }); }
  }

  /* ---------- things the loop moves ---------- */
  var hero = $(".hero, .page-hero");
  var heroText = hero && $(".hero__inner, .page-hero__text", hero);
  var heroImg = hero && $(".hero__media img, .page-hero__media img", hero);
  var bands = $$(".band");
  // k × 2 × height = the most a photo moves; it stays inside its headroom
  // (band photos are 16% taller than the band, revealed photos are scaled 1.1)
  var para = $$("[data-parallax]").map(function (img) { return { img: img, box: img.closest("section") || img.parentElement, k: 0.035 }; })
    .concat($$("[data-media] img").filter(function (img) { return !img.closest(".split__media--duo"); })
      .map(function (img) { return { img: img, box: img.closest("[data-media]"), k: 0.024 }; }));
  var rings = $$(".site-header .logo__ring, .site-footer .logo__ring, .marquee__sep .logo__ring");
  var header = $("[data-header]");
  var pinnedHeader = !!$(".menu-bar"); // the menu bar sits under the header, so it stays
  var bar = document.createElement("div"); bar.className = "progress"; bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);

  var lastY = -1, vel = 0, lastT = 0, docH = 1, hidden = false, dirSign = -1;
  window.addEventListener("resize", function () { vh = window.innerHeight; lastY = -1; marquees.forEach(function (mq) { mq.measure(); }); });

  function onScroll(y, dy) {
    // read everything first…
    docH = Math.max(1, root.scrollHeight - vh);
    var hr = hero && hero.getBoundingClientRect();
    var bandR = bands.map(function (b) { return b.getBoundingClientRect(); });
    var paraR = para.map(function (o) { return o.box.getBoundingClientRect(); });
    var scrubR = scrubs.map(function (s) { return s.el.getBoundingClientRect(); });

    // …then write
    bar.style.transform = "scaleX(" + (y / docH).toFixed(4) + ")";
    rings.forEach(function (r) { r.style.transform = "rotate(" + (y * 0.12).toFixed(1) + "deg)"; });

    if (header && !pinnedHeader) {
      var limit = hr ? hr.height - 80 : 300, open = document.body.classList.contains("menu-open");
      var hide = open || y <= limit ? false : dy > 1 ? true : dy < -2 ? false : hidden;
      if (hide !== hidden) { hidden = hide; header.setAttribute("data-hidden", hide ? "true" : "false"); }
    }

    if (hr && heroText && hr.bottom > 0) { // the hero drifts and fades as you leave it
      var p = clamp(-hr.top / hr.height, 0, 1);
      heroText.style.transform = "translate3d(0," + (p * hr.height * 0.32).toFixed(1) + "px,0)";
      heroText.style.opacity = (1 - p * 1.35).toFixed(3);
      if (heroImg) { heroImg.style.translate = "0 " + (p * hr.height * 0.18).toFixed(1) + "px"; heroImg.style.scale = (1 + p * 0.1).toFixed(4); }
    }

    bands.forEach(function (b, i) { // the evening photo grows to full width as it arrives
      var r = bandR[i];
      if (r.top > vh || r.bottom < 0) return;
      var e = 1 - Math.pow(1 - clamp(1 - r.top / vh, 0, 1), 3);
      b.style.transform = "scale(" + (0.9 + 0.1 * e).toFixed(4) + ")";
      b.style.borderRadius = ((1 - e) * 32).toFixed(1) + "px";
    });

    para.forEach(function (o, i) { // photos move a little slower than the page
      var r = paraR[i];
      if (r.top > vh + 100 || r.bottom < -100) return;
      var c = clamp((r.top + r.height / 2 - vh / 2) / vh, -1, 1);
      o.img.style.translate = "0 " + (c * -o.k * r.height * 2).toFixed(1) + "px";
    });

    scrubs.forEach(function (s, i) {
      var r = scrubR[i];
      if (r.top > vh || r.bottom < 0) return;
      var lit = clamp((vh * 0.88 - r.top) / (r.height + vh * 0.38), 0, 1) * (s.words.length + 3) - 1.5;
      s.words.forEach(function (w, j) {
        var o = (0.16 + 0.84 * clamp(lit - j, 0, 1)).toFixed(2);
        if (s.last[j] !== o) { s.last[j] = o; w.style.opacity = o; }
      });
    });
  }

  function frame(t) {
    if (lenis) lenis.raf(t);
    var dt = lastT ? Math.min(64, t - lastT) : 16; lastT = t;
    var y = window.scrollY;
    var dy = lastY < 0 ? 0 : y - lastY;
    vel += (dy - vel) * 0.18;
    if (Math.abs(dy) > 0.5) dirSign = dy > 0 ? -1 : 1;
    if (y !== lastY) { onScroll(y, dy); lastY = y; }

    marquees.forEach(function (mq) {
      if (!mq.on || !mq.w) return;
      var speed = 70 + Math.min(1400, Math.abs(vel) * 55);
      mq.x += mq.dir * dirSign * -1 * speed * dt / 1000;
      if (mq.x <= -mq.w) mq.x += mq.w;
      if (mq.x > 0) mq.x -= mq.w;
      mq.track.style.transform = "translate3d(" + mq.x.toFixed(2) + "px,0,0) skewX(" + clamp(-vel * 0.25, -8, 8).toFixed(2) + "deg)";
    });
    moveCursor();
    requestAnimationFrame(frame);
  }

  /* ---------- mouse-only extras: cursor, magnetic buttons, card tilt ---------- */
  var cur = null, ring = null, label = null, mx = -100, my = -100, cx = -100, cy = -100;
  function moveCursor() {
    if (!cur) return;
    cx += (mx - cx) * 0.2; cy += (my - cy) * 0.2;
    cur.style.transform = "translate3d(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px,0)";
  }
  if (mouse) {
    cur = document.createElement("div"); cur.className = "cursor"; cur.setAttribute("aria-hidden", "true");
    cur.innerHTML = '<div class="cursor__ring"><span class="cursor__label"></span></div>';
    document.body.appendChild(cur);
    ring = $(".cursor__ring", cur); label = $(".cursor__label", cur);
    window.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      mx = e.clientX; my = e.clientY;
      if (!cur.classList.contains("is-on")) { cx = mx; cy = my; cur.classList.add("is-on"); }
    }, { passive: true });
    document.addEventListener("mouseleave", function () { cur.classList.remove("is-on"); });
    document.addEventListener("pointerover", function (e) {
      var t = e.target, state = "", text = "";
      if (t.closest("input, textarea, select, iframe")) state = "text";
      else if (t.closest("[data-strip]")) { state = "drag"; text = "Drag"; }
      else if (t.closest(".day__card")) { state = "view"; text = "View"; }
      else if (t.closest("a, button, label, summary")) state = "link";
      cur.setAttribute("data-state", state);
      label.textContent = text;
    });

    $$(".btn, .dock a").forEach(function (b) {
      b.addEventListener("pointermove", function (e) {
        if (e.pointerType !== "mouse") return;
        var r = b.getBoundingClientRect();
        b.style.translate = ((e.clientX - r.left - r.width / 2) * 0.28).toFixed(1) + "px " + ((e.clientY - r.top - r.height / 2) * 0.4).toFixed(1) + "px";
      });
      b.addEventListener("pointerleave", function () { b.style.translate = ""; });
    });

    $$(".day__card").forEach(function (c) {
      c.addEventListener("pointermove", function (e) {
        if (e.pointerType !== "mouse") return;
        var r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        c.style.transform = "perspective(1100px) rotateX(" + ((0.5 - py) * 7).toFixed(2) + "deg) rotateY(" + ((px - 0.5) * 9).toFixed(2) + "deg)";
        c.style.setProperty("--mx", (px * 100).toFixed(1) + "%"); c.style.setProperty("--my", (py * 100).toFixed(1) + "%");
      });
      c.addEventListener("pointerleave", function () { c.style.transform = ""; });
    });
  }

  // mobile menu links arrive one by one
  $$(".mnav__links li").forEach(function (li, i) { li.style.setProperty("--i", i); });

  requestAnimationFrame(frame);
})();
