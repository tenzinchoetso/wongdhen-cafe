/* ==========================================================================
   Wongdhen Cafe — site behaviour (every page)
   Content comes from the data files: js/hours.js (hours + contact),
   js/menu-data.js (menu) and js/reviews.js (Google reviews).
   Everything is progressive: the HTML already holds the real phone,
   address and hours, so the site still works without JS.
   ========================================================================== */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
  var SITE = window.WONGDHEN || {};
  var HOURS = window.WONGDHEN_HOURS || { days: [] };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DEFAULT_WA = "Hello Wongdhen Cafe! I'd like to book a table.";

  /* ---------- helpers ---------- */
  function waLink(text) {
    return "https://wa.me/" + SITE.whatsapp + (text ? "?text=" + encodeURIComponent(text) : "");
  }
  function fmtTime(hhmm) { // "22:30" → "10:30 pm", "12:00" → "12 noon", "08:00" → "8 am"
    var p = hhmm.split(":"), h = +p[0], m = +p[1];
    if (h === 12 && m === 0) return "12 noon";
    var ap = h >= 12 ? "pm" : "am", h12 = h % 12 || 12;
    return h12 + (m ? ":" + String(m).padStart(2, "0") : "") + " " + ap;
  }
  function nowIST() { // {day 0=Mon..6=Sun, mins since midnight, iso date}
    var f = new Intl.DateTimeFormat("en-GB", { timeZone: HOURS.timezone || "Asia/Kolkata", weekday: "long", hour: "2-digit", minute: "2-digit", hour12: false, year: "numeric", month: "2-digit", day: "2-digit" });
    var parts = {}; f.formatToParts(new Date()).forEach(function (x) { parts[x.type] = x.value; });
    var names = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return { day: names.indexOf(parts.weekday), mins: (+parts.hour % 24) * 60 + +parts.minute, iso: parts.year + "-" + parts.month + "-" + parts.day };
  }
  function toMins(hhmm) { var p = hhmm.split(":"); return +p[0] * 60 + +p[1]; }
  function rupees(n) { return "₹" + Number(n).toLocaleString("en-IN"); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function observeReveal(root) {
    var els = $$("[data-reveal]", root);
    if (!("IntersectionObserver" in window) || reduce) { els.forEach(function (el) { el.classList.add("is-in"); }); return; }
    els.forEach(function (el) { revealIO.observe(el); });
  }

  /* ---------- contact details from hours.js ---------- */
  $$("[data-tel]").forEach(function (a) { a.href = "tel:" + SITE.phone; });
  $$("[data-tel-text]").forEach(function (el) { el.textContent = SITE.phoneDisplay; });
  $$("[data-wa]").forEach(function (a) {
    a.href = waLink(a.getAttribute("data-wa") || DEFAULT_WA);
    a.target = "_blank"; a.rel = "noopener";
  });
  var ext = { "data-maps": "mapsUrl", "data-insta": "instagram", "data-insta-rinchen": "instagramRinchen", "data-insta-gelato": "instagramGelato", "data-zomato": "zomato", "data-swiggy": "swiggy", "data-google": "googleReviews" };
  Object.keys(ext).forEach(function (attr) {
    $$("[" + attr + "]").forEach(function (a) { if (SITE[ext[attr]]) a.href = SITE[ext[attr]]; a.target = "_blank"; a.rel = "noopener"; });
  });
  $$("[data-address]").forEach(function (el) { el.innerHTML = (SITE.address || []).map(esc).join("<br>"); });
  $$("[data-map-embed]").forEach(function (f) { if (!f.getAttribute("src")) f.src = SITE.mapsEmbed; });
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- hours ---------- */
  (function () {
    if (!HOURS.days.length) return;
    var now = nowIST(), today = HOURS.days[now.day];
    var range = function (d) { return fmtTime(d.open) + " – " + fmtTime(d.close); };
    $$("[data-hours-summary]").forEach(function (el) {
      el.innerHTML = "Mon–Fri " + range(HOURS.days[0]) + "<br>Sat–Sun " + range(HOURS.days[5]);
    });
    $$("[data-hours-inline]").forEach(function (el) { el.textContent = "Today · " + range(today); });
    $$("[data-open-now]").forEach(function (el) {
      var open = today && now.mins >= toMins(today.open) && now.mins < toMins(today.close);
      el.setAttribute("data-state", open ? "open" : "closed");
      var label = $("span", el);
      if (!label) return;
      if (open) label.textContent = "Open now · until " + fmtTime(today.close);
      else {
        var next = now.mins < toMins(today.open) ? today : HOURS.days[(now.day + 1) % 7];
        label.textContent = "Closed now · opens " + fmtTime(next.open) + (next === today ? " today" : " tomorrow");
      }
    });
    $$("[data-hours-table]").forEach(function (el) {
      el.innerHTML = HOURS.days.map(function (d, i) {
        return '<div class="hours__row"' + (i === now.day ? ' data-today="true"' : "") + "><span>" + d.day + "</span><span>" + range(d) + "</span></div>";
      }).join("");
    });
  })();

  /* ---------- header: solid after the hero ---------- */
  var header = $("[data-header]");
  var hero = $("[data-hero]");
  function headerState() {
    if (!header) return;
    var limit = hero ? hero.offsetTop + hero.offsetHeight - header.offsetHeight : 40;
    header.setAttribute("data-solid", window.scrollY > limit ? "true" : "false");
  }
  headerState();
  window.addEventListener("scroll", headerState, { passive: true });
  window.addEventListener("resize", headerState);

  /* ---------- mobile nav ---------- */
  var burger = $("[data-burger]"), mnav = $("[data-mnav]");
  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (burger) { burger.setAttribute("aria-expanded", open ? "true" : "false"); burger.setAttribute("aria-label", open ? "Close menu" : "Open menu"); }
    if (mnav) mnav.setAttribute("aria-hidden", open ? "false" : "true");
  }
  if (burger) burger.addEventListener("click", function () { setMenu(!document.body.classList.contains("menu-open")); });
  if (mnav) $$("a", mnav).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---------- reveal on scroll ---------- */
  var revealIO = ("IntersectionObserver" in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); revealIO.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px" }) : null;
  observeReveal(document);

  /* ---------- parallax on full-bleed bands (transform only) ---------- */
  var pImgs = $$("[data-parallax]");
  if (pImgs.length && !reduce) {
    var pTick = false;
    var pUpdate = function () {
      pImgs.forEach(function (img) {
        var r = (img.closest("section") || img.parentElement).getBoundingClientRect();
        if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
        var k = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        img.style.transform = "translate3d(0," + (k * -6).toFixed(2) + "%,0)";
      });
      pTick = false;
    };
    window.addEventListener("scroll", function () { if (!pTick) { pTick = true; requestAnimationFrame(pUpdate); } }, { passive: true });
    pUpdate();
  }

  /* ---------- reviews (before strips so they can be measured) ---------- */
  var revWrap = $("[data-reviews]");
  if (revWrap && window.WONGDHEN_REVIEWS) {
    var star = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z"/></svg>';
    var count = parseInt(revWrap.getAttribute("data-count") || "3", 10);
    revWrap.innerHTML = window.WONGDHEN_REVIEWS.slice(0, count).map(function (r, i) {
      return '<figure class="quote" data-reveal style="--d:' + (i * 0.12) + 's"><blockquote>' + esc(r.text) + "</blockquote>" +
        '<figcaption><span class="stars" aria-label="5 out of 5 stars">' + star + star + star + star + star + "</span><strong>" + esc(r.name) + "</strong> · Google review · " + esc(r.date) + "</figcaption></figure>";
    }).join("");
    observeReveal(revWrap);
  }

  /* ---------- strips: auto-drift + mouse drag + touch swipe, loop ---------- */
  $$("[data-strip]").forEach(function (strip) {
    var items = [].slice.call(strip.children);
    if (items.length < 2) return;
    items.forEach(function (it) { // duplicate once so the drift can loop
      var c = it.cloneNode(true);
      c.setAttribute("aria-hidden", "true");
      $$("a, button", c).forEach(function (a) { a.tabIndex = -1; });
      strip.appendChild(c);
    });
    var loopW = function () { return strip.scrollWidth / 2; };
    var pos = 0, paused = false, resumeAt = 0, inView = true, last = 0;
    var speed = parseFloat(strip.getAttribute("data-speed") || "26"); // px per second

    function hold(ms) { paused = true; resumeAt = performance.now() + (ms || 2000); }
    function wrap() {
      var w = loopW();
      if (strip.scrollLeft >= w) strip.scrollLeft -= w;
      else if (strip.scrollLeft <= 0 && w > 0) strip.scrollLeft += w;
      pos = strip.scrollLeft;
    }
    var dragging = false, sx = 0, sl = 0, moved = 0;
    strip.addEventListener("pointerdown", function (e) {
      hold(2000);
      if (e.pointerType !== "mouse") return; // touch uses native scrolling
      dragging = true; moved = 0; sx = e.clientX; sl = strip.scrollLeft;
      strip.setPointerCapture(e.pointerId);
    });
    strip.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx));
      if (moved > 4) strip.classList.add("is-dragging");
      strip.scrollLeft = sl - dx;
      wrap(); sl = strip.scrollLeft + dx;
      hold(2000);
    });
    var end = function (e) {
      if (!dragging) return;
      dragging = false;
      try { strip.releasePointerCapture(e.pointerId); } catch (_) {}
      setTimeout(function () { strip.classList.remove("is-dragging"); }, 0);
      hold(2000);
    };
    strip.addEventListener("pointerup", end);
    strip.addEventListener("pointercancel", end);
    strip.addEventListener("click", function (e) { if (moved > 4) { e.preventDefault(); e.stopPropagation(); } }, true);
    strip.addEventListener("touchstart", function () { hold(2500); }, { passive: true });
    strip.addEventListener("touchmove", function () { hold(2500); }, { passive: true });
    strip.addEventListener("wheel", function (e) { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) hold(2000); }, { passive: true });
    strip.addEventListener("scroll", function () { if (paused) wrap(); }, { passive: true });
    strip.addEventListener("focusin", function () { hold(4000); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { inView = en[0].isIntersecting; }).observe(strip);
    }
    function frame(t) {
      var dt = last ? Math.min(64, t - last) : 16; last = t;
      if (paused && t > resumeAt && !dragging) { paused = false; pos = strip.scrollLeft; }
      if (!paused && inView && !reduce) {
        pos += speed * dt / 1000;
        if (pos >= loopW()) pos -= loopW();
        strip.scrollLeft = pos;
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  });

  /* ---------- videos: play only while on screen ---------- */
  if ("IntersectionObserver" in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting && !reduce) {
          if (!v.getAttribute("src") && v.dataset.src) v.src = v.dataset.src;
          var p = v.play(); if (p && p.catch) p.catch(function () {});
        } else v.pause();
      });
    }, { threshold: 0.2 });
    $$("video[data-autoplay]").forEach(function (v) { v.muted = true; v.playsInline = true; vio.observe(v); });
  }

  /* ---------- menu page ---------- */
  var menuRoot = $("[data-menu]");
  if (menuRoot && window.WONGDHEN_MENU) {
    var MENU = window.WONGDHEN_MENU;
    var tabsEl = $("[data-menu-tabs]"), chipsEl = $("[data-menu-chips]");
    var mark = function (it) {
      if (it.veg === true) return '<i class="mark mark--veg" title="Vegetarian" aria-label="Vegetarian"></i>';
      if (it.veg === false) return '<i class="mark mark--nonveg" title="Non-vegetarian" aria-label="Non-vegetarian"></i>';
      return "";
    };
    var PRICES = window.WONGDHEN_PRICES || { breakfastCard: true, printedMenu: true };
    var showFor = function (g) { return g.source === "breakfast-card" ? PRICES.breakfastCard : PRICES.printedMenu; };
    var noPrice = function (t) { return String(t).replace(/\s*(?:\+₹|@)\s*\d+/g, ""); }; // "Add honey @10." → "Add honey."
    var itemHTML = function (it, show) {
      var right = "", under = "";
      if (it.prices) under = it.prices.map(function (p) { return "<span>" + esc(p[0]) + (show ? " <b>" + rupees(p[1]) + "</b>" : "") + "</span>"; }).join(show ? "" : '<span aria-hidden="true">·</span>');
      else if (it.price === null || it.price === undefined) right = show ? '<span class="ask">Ask us</span>' : "";
      else right = show ? rupees(it.price) : "";
      var desc = it.desc ? (show ? it.desc : noPrice(it.desc)) : "";
      return '<div class="menu-item"><div class="menu-item__name">' + mark(it) + "<span>" + esc(it.name) + "</span>" + (it.spl ? '<span class="spl">Chef\'s special</span>' : "") + "</div>" +
        '<div class="menu-item__price' + (right.indexOf("ask") > -1 ? " ask" : "") + '">' + right + "</div>" +
        (desc ? '<p class="menu-item__desc">' + esc(desc) + "</p>" : "") +
        (under ? '<div class="menu-item__variants">' + under + "</div>" : "") + "</div>";
    };
    menuRoot.innerHTML = MENU.map(function (sec, si) {
      return '<div class="menu-panel" id="panel-' + sec.id + '" role="tabpanel" aria-labelledby="tab-' + sec.id + '"' + (si ? " hidden" : "") + ">" +
        sec.groups.map(function (g) {
          var show = showFor(g);
          var note = g.note ? (show ? g.note : (g.noteNoPrice || noPrice(g.note))) : "";
          return '<section class="menu-group" id="' + g.id + '" data-group><div class="menu-group__aside"><div class="menu-group__sticky">' +
            '<h2 class="h2">' + esc(g.label) + "</h2>" + (note ? '<p class="note">' + esc(note) + "</p>" : "") +
            (g.image ? '<div class="menu-group__img"><img src="' + g.image + '" alt="" loading="lazy" width="900" height="1035"></div>' : "") +
            '</div></div><div class="menu-group__list">' +
            g.sub.map(function (s) {
              return '<div class="menu-sub"><h3 class="menu-sub__label">' + esc(show ? s.label : noPrice(s.label)) + "</h3>" + s.items.map(function (it) { return itemHTML(it, show); }).join("") + "</div>";
            }).join("") + "</div></section>";
        }).join("") + "</div>";
    }).join("");

    var bar = $(".menu-bar");
    var setBarH = function () { if (bar) document.documentElement.style.setProperty("--menubar-h", bar.offsetHeight + "px"); };
    setBarH(); window.addEventListener("resize", setBarH);
    var current = MENU[0].id;
    var renderChips = function () {
      var sec = MENU.filter(function (s) { return s.id === current; })[0];
      chipsEl.innerHTML = sec.groups.map(function (g, i) {
        return '<a class="chip" href="#' + g.id + '"' + (i === 0 ? ' aria-current="true"' : "") + ">" + esc(g.label) + "</a>";
      }).join("");
    };
    var selectTab = function (id, scroll) {
      current = id;
      $$(".tab", tabsEl).forEach(function (t) { t.setAttribute("aria-selected", t.getAttribute("data-tab") === id ? "true" : "false"); });
      $$(".menu-panel", menuRoot).forEach(function (p) { p.hidden = p.id !== "panel-" + id; });
      renderChips();
      if (scroll) { var first = $("#panel-" + id + " [data-group]", menuRoot); if (first) first.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }
    };
    tabsEl.innerHTML = MENU.map(function (s, i) {
      return '<button class="tab" role="tab" id="tab-' + s.id + '" data-tab="' + s.id + '" aria-controls="panel-' + s.id + '" aria-selected="' + (i ? "false" : "true") + '">' + esc(s.label) + "</button>";
    }).join("");
    $$(".tab", tabsEl).forEach(function (t) { t.addEventListener("click", function () { selectTab(t.getAttribute("data-tab"), true); }); });
    renderChips();
    if ("IntersectionObserver" in window) {
      var gio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          $$(".chip", chipsEl).forEach(function (c) {
            var on = c.getAttribute("href") === "#" + e.target.id;
            c.setAttribute("aria-current", on ? "true" : "false");
            if (on) chipsEl.scrollTo({ left: c.offsetLeft - 24, behavior: reduce ? "auto" : "smooth" });
          });
        });
      }, { rootMargin: "-40% 0px -55% 0px" });
      $$("[data-group]", menuRoot).forEach(function (g) { gio.observe(g); });
    }
    // deep links: menu.html#drinks (a tab) or menu.html#pizza (a group)
    var hash = location.hash.slice(1);
    if (hash) {
      var sec = MENU.filter(function (s) { return s.id === hash || s.groups.some(function (g) { return g.id === hash; }); })[0];
      if (sec) {
        selectTab(sec.id, false);
        setTimeout(function () {
          setBarH();
          var t = sec.id === hash ? $("#panel-" + hash + " [data-group]", menuRoot) : document.getElementById(hash);
          if (t) t.scrollIntoView({ behavior: "auto" });
        }, 80);
      }
    }
  }

  /* ---------- booking form → WhatsApp ---------- */
  var form = $("[data-book]");
  if (form) {
    var dateIn = $("#b-date", form), timeSel = $("#b-time", form), err = $("[data-form-error]", form);
    var now = nowIST();
    dateIn.min = now.iso;
    if (!dateIn.value) dateIn.value = now.iso;
    var fillTimes = function () {
      var d = dateIn.value ? new Date(dateIn.value + "T12:00:00") : new Date();
      var day = HOURS.days[(d.getDay() + 6) % 7] || HOURS.days[0]; // JS Sunday=0 → our Monday=0
      var start = toMins(day.open), endM = toMins(day.close) - 30;
      var keep = timeSel.value, isToday = dateIn.value === now.iso;
      var opts = ['<option value="">Choose a time</option>'];
      for (var m = start; m <= endM; m += 30) {
        if (isToday && m < now.mins + 30) continue;
        var hh = String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
        opts.push('<option value="' + hh + '">' + fmtTime(hh) + "</option>");
      }
      if (opts.length === 1) opts.push('<option value="" disabled>No more times today, pick another date</option>');
      timeSel.innerHTML = opts.join("");
      if (keep && $('option[value="' + keep + '"]', timeSel)) timeSel.value = keep;
    };
    fillTimes();
    dateIn.addEventListener("change", fillTimes);

    var params = new URLSearchParams(location.search);
    ["occasion", "seating"].forEach(function (k) {
      var v = params.get(k);
      if (v) { var r = $('input[name="' + k + '"][value="' + v.replace(/"/g, "") + '"]', form); if (r) r.checked = true; }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      err.textContent = "";
      var name = $("#b-name", form).value.trim();
      var guests = $("#b-guests", form).value;
      if (!name) { err.textContent = "Please add your name."; $("#b-name", form).focus(); return; }
      if (!dateIn.value) { err.textContent = "Please pick a date."; dateIn.focus(); return; }
      if (!timeSel.value) { err.textContent = "Please pick a time."; timeSel.focus(); return; }
      var seat = ($('input[name="seating"]:checked', form) || {}).value || "No preference";
      var occasion = ($('input[name="occasion"]:checked', form) || {}).value || "";
      var note = $("#b-note", form).value.trim();
      var d = new Date(dateIn.value + "T12:00:00");
      var dateTxt = d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
      var lines = [
        DEFAULT_WA,
        "",
        "Name: " + name,
        "Date: " + dateTxt,
        "Time: " + fmtTime(timeSel.value),
        "Guests: " + guests,
        "Seating: " + seat
      ];
      if (occasion && occasion !== "None") lines.push("Occasion: " + occasion);
      if (note) lines.push("Note: " + note);
      var url = waLink(lines.join("\n"));
      form.setAttribute("data-last-wa", url); // for QA
      window.open(url, "_blank", "noopener");
    });
  }
})();
