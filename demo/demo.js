/* ==========================================================================
   Wongdhen — design demo
   - the hero: one number, --e (0 → 1), follows the scroll while the hero is held
     on screen; the photo window, the name and the bar's two link layers all
     read it, so they move together in the same frame
   - reveals play once; parallax and the drawn lines are run by the browser
     itself where it can (see demo.css), so nothing here runs while you scroll
     except the hero number and the logo ring
   ========================================================================== */
(function () {
  "use strict";
  var root = document.documentElement;
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) root.classList.add("rm");
  root.classList.add("ready");

  /* ---------- hero + bar ---------- */
  var hero = document.querySelector("[data-hero]"), stick = hero.querySelector(".hero__stick"), bar = document.querySelector("[data-bar]");
  var ring = document.querySelector(".bar__logo .logo__ring"), photo = stick.querySelector(".hero__zoom img");
  // where the brass sign is in each photo (fractions of its width and height): it is kept whole in the final window
  var SIGN = { wide: [0.05, 0.17, 0.55, 0.68], tall: [0.05, 0.18, 0.99, 0.56] };
  var navH = 0, hold = 0, photoTop = 0, lastE = -1, lastA = "", ticking = false;
  var ease = function (p) { return -(Math.cos(Math.PI * p) - 1) / 2; }; // gentle at both ends
  function measure() {
    var h = stick.offsetHeight, phone = window.matchMedia("(max-width: 760px)").matches;
    navH = bar.offsetHeight;
    hold = Math.max(1, hero.offsetHeight - h);
    photoTop = phone ? navH + Math.max(0.3 * h, 200) : navH + 0.03 * h; // the photo's top edge at --e 1 (as in demo.css)
    frame(stick.offsetWidth, h, phone);
  }
  // the photo's final scale and shift: the sign centred in the window, the window always covered
  function frame(W, H, phone) {
    var nw = photo.naturalWidth || (phone ? 900 : 2000), nh = photo.naturalHeight || (phone ? 1156 : 1434);
    var A = nw / nh, dw = W / H > A ? W : H * A, dh = W / H > A ? W / A : H;
    var ox = (W - dw) * 0.5, oy = (H - dh) * 0.42; // object-position: 50% 42%
    var gut = parseFloat(getComputedStyle(document.querySelector(".hero__line")).paddingLeft) || 20;
    var x0 = phone ? gut : W / 2, x1 = phone ? W - gut : W, y0 = photoTop, y1 = phone ? H * 0.96 : H;
    var f = phone ? SIGN.tall : SIGN.wide, fw = (f[2] - f[0]) * dw * 1.1, fh = (f[3] - f[1]) * dh * 1.1;
    var s = Math.max((x1 - x0) / dw, (y1 - y0) / dh, Math.min(1, (x1 - x0) / fw, (y1 - y0) / fh));
    var cx = W / 2, cy = H / 2, fcx = ox + (f[0] + f[2]) / 2 * dw, fcy = oy + (f[1] + f[3]) / 2 * dh;
    var tx = (x0 + x1) / 2 - cx - s * (fcx - cx), ty = (y0 + y1) / 2 - cy - s * (fcy - cy);
    var L = cx + s * (ox - cx), R = cx + s * (ox + dw - cx), T = cy + s * (oy - cy), B = cy + s * (oy + dh - cy);
    tx = Math.min(x0 - L, Math.max(x1 - R, tx)); ty = Math.min(y0 - T, Math.max(y1 - B, ty));
    root.style.setProperty("--tx", tx.toFixed(1) + "px"); root.style.setProperty("--ty", ty.toFixed(1) + "px"); root.style.setProperty("--s1", s.toFixed(4));
  }
  function update() {
    ticking = false;
    var y = window.scrollY;
    var e = reduce ? 1 : ease(Math.min(1, Math.max(0, y / (hold * 0.8)))); // settles over the first 80%, then rests
    if (!reduce && e !== lastE) { root.style.setProperty("--e", e.toFixed(4)); lastE = e; }
    // the bar turns solid cream only once cream is behind it (the photo's top edge has passed below it)
    bar.classList.toggle("is-solid", y >= hold - 1 || e * photoTop >= navH + 1);
    if (ring && !reduce) { var a = "rotate(" + (y * 0.12).toFixed(1) + "deg)"; if (a !== lastA) { ring.style.transform = a; lastA = a; } }
  }
  var request = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  measure(); update();
  window.addEventListener("scroll", request, { passive: true });
  var lastW = window.innerWidth;
  window.addEventListener("resize", function () {
    measure(); request();
    if (window.innerWidth !== lastW) { lastW = window.innerWidth; $$("[data-contour]").forEach(contour); }
  });
  window.addEventListener("load", function () { measure(); request(); });
  photo.addEventListener("load", function () { measure(); request(); });

  /* ---------- reveals: once, as each block comes into view ---------- */
  var items = $$("[data-rv]");
  if (reduce || !("IntersectionObserver" in window)) items.forEach(function (el) { el.classList.add("is-in"); });
  else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- contour lines round a photo, like rings in wood ---------- */
  function contour(fig) {
    var w = fig.offsetWidth, h = fig.offsetHeight, pad = 40, NS = "http://www.w3.org/2000/svg";
    if (!w || !h) return;
    var svg = fig.querySelector(".contour");
    if (!svg) { svg = document.createElementNS(NS, "svg"); svg.setAttribute("class", "contour draw"); svg.setAttribute("aria-hidden", "true"); fig.insertBefore(svg, fig.firstChild); }
    svg.setAttribute("viewBox", "0 0 " + (w + 2 * pad) + " " + (h + 2 * pad));
    svg.style.cssText = "left:" + -pad + "px;top:" + -pad + "px;width:" + (w + 2 * pad) + "px;height:" + (h + 2 * pad) + "px";
    var html = "";
    for (var k = 0; k < 7; k++) {
      var off = 6 + k * 4.2, amp = 1.2 + k * .5;
      var per = 2 * (w + h) + 2 * Math.PI * off, n = Math.round(per / 4), pts = [];
      for (var i = 0; i < n; i++) {
        var s = i / n * per, a = s / per * Math.PI * 2, q = edge(s, w, h, off);
        var wob = amp * (Math.sin(a * Math.round(per / 70) + k * 1.7) * .62 + Math.sin(a * Math.round(per / 29) + k * 2.9) * .38);
        pts.push((pad + q[0] + q[2] * wob).toFixed(1) + " " + (pad + q[1] + q[3] * wob).toFixed(1));
      }
      html += '<path pathLength="1" d="M' + pts.join("L") + 'Z"/>';
    }
    svg.innerHTML = html;
  }
  // a point (x, y) and its outward normal (nx, ny) at distance s along a rounded frame `off` outside a w×h box
  function edge(s, w, h, off) {
    var arc = Math.PI / 2 * off, segs = [w, arc, h, arc, w, arc, h, arc], i = 0;
    while (i < 7 && s > segs[i]) { s -= segs[i]; i++; }
    var t = s / (segs[i] || 1), ang;
    switch (i) {
      case 0: return [t * w, -off, 0, -1];
      case 1: ang = -Math.PI / 2 + t * Math.PI / 2; return [w + Math.cos(ang) * off, Math.sin(ang) * off, Math.cos(ang), Math.sin(ang)];
      case 2: return [w + off, t * h, 1, 0];
      case 3: ang = t * Math.PI / 2; return [w + Math.cos(ang) * off, h + Math.sin(ang) * off, Math.cos(ang), Math.sin(ang)];
      case 4: return [w - t * w, h + off, 0, 1];
      case 5: ang = Math.PI / 2 + t * Math.PI / 2; return [Math.cos(ang) * off, h + Math.sin(ang) * off, Math.cos(ang), Math.sin(ang)];
      case 6: return [-off, h - t * h, -1, 0];
      default: ang = Math.PI + t * Math.PI / 2; return [Math.cos(ang) * off, Math.sin(ang) * off, Math.cos(ang), Math.sin(ang)];
    }
  }
  $$("[data-contour]").forEach(contour);
})();
