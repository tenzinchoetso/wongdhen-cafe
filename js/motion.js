/* ==========================================================================
   Wongdhen Cafe — motion (every page, after main.js)
   Everything here plays ONCE, when it first comes into view, and then stands
   still: page headlines rise in word by word and photos open like a curtain
   (once the photo has loaded). The only thing that follows the scroll
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
    var d = parseFloat(getComputedStyle(el).getPropertyValue("--d")) || 0; // read before the spans exist (no style flush after)
    if (el.closest(".hero, .page-hero")) d += 0.15;
    if (chars && !el.hasAttribute("aria-label")) el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
    el.classList.add("is-split");
    (function walk(node, top) {
      [].slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) { if (n.textContent.trim()) node.replaceChild(wrap(n.textContent, chars && top), n); }
        else if (n.nodeType === 1 && n.tagName !== "BR") walk(n, false);
      });
    })(el, true);
    $$(".w__i", el).forEach(function (w, i) { w.style.transitionDelay = (d + i * (chars ? 0.04 : 0.05)).toFixed(3) + "s"; });
  }

  /* ---------- one observer; every element is revealed once and then left alone ----------
     It fires a little BEFORE an element enters the screen (6% below the bottom edge),
     so nothing can sit invisible at the bottom of the screen when scrolling stops.
     A photo's curtain waits until the photo has loaded, so it never opens on an empty frame. */
  var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : null;
  function show(el) {
    var done = function () { el.classList.add("is-in"); };
    var later = setTimeout(done, 3000); // never keep anything waiting for long
    var go = function () { clearTimeout(later); done(); };
    // page headlines wait for the web fonts, so they never rise in a fallback font and then re-wrap
    if (el.hasAttribute("data-split") && fontsReady) { fontsReady.then(go, go); return; }
    // photos wait until decoded, so the cover never lifts off an empty frame
    var img = el.hasAttribute("data-media") && el.querySelector("img");
    if (!img) { go(); return; }
    var decode = function () { if (img.decode) img.decode().then(go, go); else go(); };
    if (img.complete) decode();
    else { img.addEventListener("load", decode, { once: true }); img.addEventListener("error", go, { once: true }); }
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      show(e.target);
      io.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px 6% 0px" });

  function observe(scope) {
    $$("[data-split]:not(.is-split)", scope).forEach(function (el) { split(el); io.observe(el); });
    $$("[data-media]:not(.is-in)", scope).forEach(function (el) { io.observe(el); });
  }
  observe(document);
  window.wdMotion = { observe: observe };

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
