/* ==========================================================================
   Wongdhen Cafe — motion (every page, after main.js)
   Everything here plays ONCE, when it first comes into view, and then stands
   still: headings rise in word by word, photos open like a curtain, menu
   sections drift up, numbers count up. The only thing that follows the scroll
   is the logo's ornament ring, which turns in place. There is no smooth-scroll
   library and no animation loop, so scrolling is the browser's own and nothing
   can flicker while you scroll. The marquee is a plain CSS animation.
   With prefers-reduced-motion nothing moves at all.
   ========================================================================== */
(function () {
  "use strict";
  var root = document.documentElement;
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !("IntersectionObserver" in window)) { window.wdMotion = { observe: function () {} }; return; }
  root.classList.add("motion");

  /* ---------- split headings ----------
     data-split         → words rise and fade in, one after another
     data-split="chars" → the element's own text letter by letter (nested elements word by word)
     Words become inline-block spans (no masks, no clipping); once in, they are plain static text. */
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
    $$(".w__i", el).forEach(function (w, i) { w.style.transitionDelay = (d + i * (chars ? 0.04 : 0.05)).toFixed(3) + "s"; });
    el.classList.add("is-split");
  }

  /* ---------- count-ups: "4.4" counts up from 0 the first time it is seen ---------- */
  function countUp(el) {
    var txt = el.getAttribute("data-countup"), target = parseFloat(txt.replace(/,/g, ""));
    var dec = (txt.split(".")[1] || "").length, t0 = performance.now(), D = 1600;
    var fmt = function (v) { return dec ? v.toFixed(dec) : Math.round(v).toLocaleString("en-IN"); };
    (function step(t) {
      var k = Math.min(1, Math.max(0, (t - t0) / D)), e = 1 - Math.pow(2, -10 * k);
      el.textContent = fmt(k === 1 ? target : target * e);
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* ---------- one observer; every element is revealed once and then left alone ---------- */
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
    $$("[data-media]:not(.is-in)", scope).forEach(function (el) { io.observe(el); });
    $$(".menu-sub", scope).forEach(function (el) { el.setAttribute("data-rise", ""); io.observe(el); });
    $$("[data-countup]:not(.is-in)", scope).forEach(function (el) {
      if (!el.getAttribute("data-countup")) el.setAttribute("data-countup", el.textContent.trim());
      var dec = (el.getAttribute("data-countup").split(".")[1] || "").length;
      el.textContent = dec ? (0).toFixed(dec) : "0";
      io.observe(el);
    });
  }
  observe(document);
  window.wdMotion = { observe: observe }; // main.js calls this after re-drawing the menu

  /* ---------- marquees: a CSS loop; the script only builds two identical halves ----------
     The line is repeated until one half is wider than the screen, the half is
     copied, and CSS slides the track by exactly -50% at a steady pace. Built
     after the web fonts load, so the widths it measures are the final ones. */
  function buildMarquee(m) {
    var track = m.querySelector(".marquee__track");
    var item = track.querySelector(".marquee__item");
    track.classList.remove("is-running");
    track.innerHTML = "";
    var half = document.createElement("div"); half.className = "marquee__half";
    half.appendChild(item);
    track.appendChild(half);
    var guard = 0;
    while (half.offsetWidth < m.offsetWidth && guard++ < 12) {
      var c = item.cloneNode(true); c.setAttribute("aria-hidden", "true"); half.appendChild(c);
    }
    var copy = half.cloneNode(true); copy.setAttribute("aria-hidden", "true");
    track.appendChild(copy);
    track.style.setProperty("--mq-time", Math.max(20, half.offsetWidth / 55).toFixed(1) + "s"); // ~55 px a second
    track.classList.add("is-running");
  }
  var marquees = $$("[data-marquee]");
  if (marquees.length) {
    var build = function () { marquees.forEach(buildMarquee); };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(build); else build();
    var lastW = window.innerWidth, t = 0;
    window.addEventListener("resize", function () {
      if (window.innerWidth === lastW) return; // phone toolbars change the height only: leave it running
      lastW = window.innerWidth; clearTimeout(t); t = setTimeout(build, 250);
    });
  }

  /* ---------- the seal turns as you scroll (header + footer logos) ----------
     Only the logo's ornament ring rotates, at most once per frame while the page
     scrolls (a full turn every 3000px); nothing changes position. */
  var rings = $$(".site-header .logo__ring, .site-footer .logo__ring");
  if (rings.length) {
    var ticking = false;
    var turn = function () {
      ticking = false;
      var a = "rotate(" + (window.scrollY * 0.12).toFixed(1) + "deg)";
      rings.forEach(function (r) { r.style.transform = a; });
    };
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(turn); } }, { passive: true });
    turn();
  }

  // mobile menu links arrive one by one (CSS reads --i)
  $$(".mnav__links li").forEach(function (li, i) { li.style.setProperty("--i", i); });
})();
