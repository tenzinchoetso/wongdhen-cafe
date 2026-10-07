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
  // safety net for the loading screen: never keep the page waiting
  if (document.documentElement.classList.contains("is-intro")) setTimeout(function () { document.documentElement.classList.add("intro-done"); }, 9000);

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

  /* ---------- mobile nav ---------- */
  var burger = $("[data-burger]"), mnav = $("[data-mnav]");
  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (burger) { burger.setAttribute("aria-expanded", open ? "true" : "false"); burger.setAttribute("aria-label", open ? "Close menu" : "Open menu"); }
    if (mnav) mnav.setAttribute("aria-hidden", open ? "false" : "true");
  }
  if (burger) burger.addEventListener("click", function () { setMenu(!document.body.classList.contains("menu-open")); });
  window.addEventListener("resize", function () { if (window.innerWidth > 1080 && document.body.classList.contains("menu-open")) setMenu(false); }); // e.g. an iPad turned sideways
  if (mnav) $$("a", mnav).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---------- reveal on scroll (once; starts just before the element enters the screen) ---------- */
  var revealIO = ("IntersectionObserver" in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); revealIO.unobserve(e.target); } });
  }, { rootMargin: "0px 0px 6% 0px" }) : null;
  observeReveal(document);

  /* ---------- reviews (before strips so they can be measured) ---------- */
  var revWrap = $("[data-reviews]");
  if (revWrap && window.WONGDHEN_REVIEWS) {
    var star = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z"/></svg>';
    var count = parseInt(revWrap.getAttribute("data-count") || "3", 10);
    revWrap.innerHTML = window.WONGDHEN_REVIEWS.slice(0, count).map(function (r, i) {
      return '<figure class="quote"><blockquote>' + esc(r.text) + "</blockquote>" +
        '<figcaption><span class="stars" aria-label="5 out of 5 stars">' + star + star + star + star + star + "</span><strong>" + esc(r.name) + "</strong> · Google review · " + esc(r.date) + "</figcaption></figure>";
    }).join(""); // shown as is (no fade): the section may already be on screen when this runs
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
    var firstCopy = strip.children[items.length];
    var loopW = function () { return firstCopy.offsetLeft - items[0].offsetLeft; }; // one full set of items
    var pos = 0, paused = false, resumeAt = 0, inView = false, running = false, last = 0;
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
    function frame(t) {
      if (!inView) { running = false; last = 0; return; } // stops off screen; restarts when seen
      var dt = last ? Math.min(64, t - last) : 16; last = t;
      if (paused && t > resumeAt && !dragging) { paused = false; pos = strip.scrollLeft; }
      if (!paused) {
        pos += speed * dt / 1000;
        var w = loopW();
        if (pos >= w) pos -= w;
        strip.scrollLeft = pos;
      }
      requestAnimationFrame(frame);
    }
    if ("IntersectionObserver" in window && !reduce) {
      new IntersectionObserver(function (en) {
        inView = en[0].isIntersecting;
        if (inView && !running) { running = true; pos = strip.scrollLeft; requestAnimationFrame(frame); }
      }).observe(strip);
    }
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
    var pio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        if (e.target.dataset.poster) e.target.poster = e.target.dataset.poster;
        pio.unobserve(e.target);
      });
    }, { rootMargin: "600px" });
    $$("video[data-autoplay]").forEach(function (v) { v.muted = true; v.playsInline = true; vio.observe(v); pio.observe(v); });
  } else $$("video[data-poster]").forEach(function (v) { v.poster = v.dataset.poster; });

  /* ---------- menu page ---------- */
  var menuRoot = $("[data-menu]");
  if (menuRoot && window.WONGDHEN_MENU) {
    var MENU = window.WONGDHEN_MENU;
    var tabsEl = $("[data-menu-tabs]"), chipsEl = $("[data-menu-chips]"), dietEl = $("[data-menu-diet]");
    var current = MENU[0].id;
    var diet = ""; // Veg / Non-veg filter: "", "veg" or "nonveg"
    var DIET = { veg: { only: "Veg only", word: "veg", mark: "Vegetarian" }, nonveg: { only: "Non-veg only", word: "non-veg", mark: "Non-vegetarian" } };
    var optDiet = function (o) { // an option's kind from its name: "Chicken" → nonveg, "Mixed Veg" → veg, "8 pc" → ""
      if (/\b(non-veg|chicken|buff|pork|prawns?|lamb|fish|salmon|tuna|seafood|crab|duck|ham|bacon)\b/i.test(o)) return "nonveg";
      if (/\b(veg|vegetables?|tofu|paneer|cottage cheese|edamame|corn|eggs?)\b/i.test(o)) return "veg"; // egg counts as veg
      return "";
    };
    var dishDiet = function (it) { // "veg", "nonveg", "both" (options of each kind) or "" (not marked)
      if (it.veg === true) return "veg";
      if (it.veg === false) return "nonveg";
      var kinds = (it.prices || []).map(function (p) { return p[0]; }).concat(it.options || []).map(optDiet);
      var v = kinds.indexOf("veg") > -1, n = kinds.indexOf("nonveg") > -1;
      return v && n ? "both" : v ? "veg" : n ? "nonveg" : "";
    };
    var mark = function (d) {
      return DIET[d] ? '<i class="mark mark--' + d + '" title="' + DIET[d].mark + '" aria-label="' + DIET[d].mark + '"></i>' : "";
    };
    var itemHTML = function (it) {
      var right = "", under = "", d = dishDiet(it);
      var keep = function () { return true; };
      if (d === "both" && diet) { // filtered: show only the matching options
        keep = function (o) { var k = optDiet(o); return !k || k === diet; };
        d = diet;
      }
      if (it.prices) {
        under = it.prices.filter(function (p) { return keep(p[0]); }).map(function (p) { return "<span>" + esc(p[0]) + (p[1] != null ? " <b>" + rupees(p[1]) + "</b>" : "") + "</span>"; }).join("");
      } else {
        if (it.price != null) right = (it.from ? '<small>from</small> ' : "") + rupees(it.price);
        if (it.options) under = it.options.filter(keep).map(function (o) { return "<span>" + esc(o) + "</span>"; }).join('<span aria-hidden="true">·</span>');
      }
      return '<div class="menu-item"><div class="menu-item__name">' + mark(d) + "<span>" + esc(it.name) + "</span>" + (it.spl ? '<span class="spl">Chef\'s special</span>' : "") + "</div>" +
        '<div class="menu-item__price">' + right + "</div>" +
        (it.desc ? '<p class="menu-item__desc">' + esc(it.desc) + "</p>" : "") +
        (under ? '<div class="menu-item__variants">' + under + "</div>" : "") + "</div>";
    };
    var filterNote = function (sec, empty) {
      var f = DIET[diet];
      var text = sec.unfiltered ? esc(sec.label) + " aren't filtered, so everything is shown." :
        empty ? "Nothing in " + esc(sec.label) + " is marked " + f.word + "." :
        "Dishes that come both ways show their " + f.word + " options. Dishes we haven't marked, like pancakes and most cakes, are hidden.";
      return '<div class="menu-filter"><p>' + mark(diet) + "<b>" + f.only + ".</b> " + text + '</p><button type="button" data-diet-clear>Show the full menu</button></div>';
    };
    var renderMenu = function () {
      menuRoot.innerHTML = MENU.map(function (sec) {
        var filtered = diet && !sec.unfiltered;
        var groups = sec.groups.map(function (g) {
          var subs = g.sub.map(function (s) {
            var items = filtered ? s.items.filter(function (it) { var d = dishDiet(it); return d === diet || d === "both"; }) : s.items;
            return items.length ? '<div class="menu-sub"><h3 class="menu-sub__label">' + esc(s.label) + "</h3>" + items.map(itemHTML).join("") + "</div>" : "";
          }).join("");
          if (!subs) return "";
          var note = g.note || "";
          return '<section class="menu-group" id="' + g.id + '" data-group><div class="menu-group__aside"><div class="menu-group__sticky">' +
            '<h2 class="h2">' + esc(g.label) + "</h2>" + (note ? '<p class="note">' + esc(note) + "</p>" : "") +
            (g.image ? '<div class="menu-group__img"><img src="' + g.image + '" alt="" loading="lazy" width="900" height="1035"></div>' : "") +
            '</div></div><div class="menu-group__list">' + subs + "</div></section>";
        }).join("");
        return '<div class="menu-panel" id="panel-' + sec.id + '" role="tabpanel" aria-labelledby="tab-' + sec.id + '"' + (sec.id === current ? "" : " hidden") + ">" +
          (diet ? filterNote(sec, !groups) : "") + groups + "</div>";
      }).join("");
    };
    renderMenu();
    menuRoot.classList.add("is-ready"); // releases the height reserved in CSS (keeps a reload mid-menu in place)

    // the bar's real height (tabs + chips), so sticky headings and jump links land below it
    var bar = $(".menu-bar");
    var setBarH = function () { if (bar) document.documentElement.style.setProperty("--menubar-h", bar.offsetHeight + "px"); };
    if (bar && "ResizeObserver" in window) new ResizeObserver(setBarH).observe(bar);
    window.addEventListener("resize", setBarH);
    var renderChips = function () {
      var sec = MENU.filter(function (s) { return s.id === current; })[0];
      chipsEl.innerHTML = sec.groups.filter(function (g) { return document.getElementById(g.id); }).map(function (g, i) {
        return '<a class="chip" href="#' + g.id + '"' + (i === 0 ? ' aria-current="true"' : "") + ">" + esc(g.label) + "</a>";
      }).join("");
    };
    // Where the page sits when the menu starts right under the stuck bar. Content above the
    // menu never changes, so this can be measured before a tab swap or a filter re-draw.
    var menuStart = function () {
      var headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 0;
      return Math.max(0, Math.round(menuRoot.getBoundingClientRect().top + window.scrollY - headerH - bar.offsetHeight));
    };
    // After swapping what the menu shows: if the visitor was already inside the menu, put the new
    // content's start right under the bar in the same frame (no smooth scroll, so nothing flashes past).
    var settle = function (target, wasInside, smoothFromAbove) {
      if (wasInside) window.scrollTo(0, target);
      else if (smoothFromAbove) window.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
    };
    var selectTab = function (id, scroll) {
      var target = menuStart(), inside = window.scrollY > target + 1;
      current = id;
      $$(".tab", tabsEl).forEach(function (t) { t.setAttribute("aria-selected", t.getAttribute("data-tab") === id ? "true" : "false"); });
      moveThumb();
      var sel = $('.tab[aria-selected="true"]', tabsEl); // keep the chosen tab in view on narrow screens
      if (sel) tabsEl.scrollTo({ left: Math.max(0, sel.offsetLeft - 16), behavior: scroll && !reduce ? "smooth" : "auto" });
      $$(".menu-panel", menuRoot).forEach(function (p) { p.hidden = p.id !== "panel-" + id; });
      renderChips();
      if (scroll) settle(target, inside, true);
    };
    tabsEl.innerHTML = MENU.map(function (s, i) {
      return '<button class="tab" role="tab" id="tab-' + s.id + '" data-tab="' + s.id + '" aria-controls="panel-' + s.id + '" aria-selected="' + (i ? "false" : "true") + '"><span>' + esc(s.label) + "</span></button>";
    }).join("");
    $$(".tab", tabsEl).forEach(function (t) { t.addEventListener("click", function () { selectTab(t.getAttribute("data-tab"), true); }); });
    // the dark pill slides to the selected tab
    var thumb = document.createElement("span");
    thumb.className = "tabs__thumb"; thumb.setAttribute("aria-hidden", "true");
    tabsEl.appendChild(thumb); tabsEl.classList.add("has-thumb");
    function moveThumb() {
      var t = $('.tab[aria-selected="true"]', tabsEl);
      if (t) { thumb.style.width = t.offsetWidth + "px"; thumb.style.transform = "translateX(" + t.offsetLeft + "px)"; }
    }
    // first placement without the slide (a deep link to Drinks shouldn't show it travelling from Breakfast)
    thumb.classList.add("no-anim"); moveThumb();
    requestAnimationFrame(function () { requestAnimationFrame(function () { thumb.classList.remove("no-anim"); }); });
    window.addEventListener("resize", moveThumb);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveThumb);
    renderChips();
    setBarH();
    var gio = ("IntersectionObserver" in window) ? new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        $$(".chip", chipsEl).forEach(function (c) {
          var on = c.getAttribute("href") === "#" + e.target.id;
          c.setAttribute("aria-current", on ? "true" : "false");
          if (on) chipsEl.scrollTo({ left: c.offsetLeft - 24, behavior: reduce ? "auto" : "smooth" });
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" }) : null;
    var observeGroups = function () {
      if (!gio) return;
      gio.disconnect();
      $$("[data-group]", menuRoot).forEach(function (g) { gio.observe(g); });
    };
    observeGroups();

    // Veg / Non-veg: tap one to filter, tap it again for the full menu
    var setDiet = function (d) {
      diet = d;
      $$("[data-diet]", dietEl).forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-diet") === d ? "true" : "false"); });
      var target = menuStart(), inside = window.scrollY > target + 1;
      renderMenu(); renderChips(); observeGroups();
      settle(target, inside, false); // was partway down the menu: the filtered list starts under the bar
    };
    if (dietEl) $$("[data-diet]", dietEl).forEach(function (b) {
      b.addEventListener("click", function () { var d = b.getAttribute("data-diet"); setDiet(diet === d ? "" : d); });
    });
    menuRoot.addEventListener("click", function (e) { if (e.target.closest("[data-diet-clear]")) setDiet(""); });
    // deep links: menu.html#drinks (a tab) or menu.html#pizza (a group)
    var hash = location.hash.slice(1);
    if (hash) {
      var sec = MENU.filter(function (s) { return s.id === hash || s.groups.some(function (g) { return g.id === hash; }); })[0];
      if (sec) { // jump straight away, before the first paint where possible
        selectTab(sec.id, false);
        setBarH();
        if (sec.id === hash) window.scrollTo(0, menuStart());
        else { var g = document.getElementById(hash); if (g) g.scrollIntoView({ behavior: "auto" }); }
      }
    }
  }

  /* ---------- booking form → WhatsApp ---------- */
  var form = $("[data-book]");
  if (form) {
    var dateIn = $("#b-date", form), timeSel = $("#b-time", form), err = $("[data-form-error]", form);
    var now = nowIST();
    dateIn.min = now.iso;
    var tomorrowIso = (function () { var t = new Date(now.iso + "T12:00:00"); t.setDate(t.getDate() + 1); return t.getFullYear() + "-" + String(t.getMonth() + 1).padStart(2, "0") + "-" + String(t.getDate()).padStart(2, "0"); })();
    var today = HOURS.days[now.day];
    // too late for any slot today (last booking is 30 min before closing): start on tomorrow
    if (!dateIn.value) dateIn.value = today && now.mins + 30 > toMins(today.close) - 30 ? tomorrowIso : now.iso;
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
      if (dateIn.value < now.iso) { err.textContent = "That date has passed. Please pick today or a later date."; dateIn.focus(); return; }
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
