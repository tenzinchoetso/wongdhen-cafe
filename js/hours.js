/* ==========================================================================
   Wongdhen Cafe — hours & contact (one file feeds every page)
   --------------------------------------------------------------------------
   Sources, checked 7 Oct 2026 (see brief/BRIEF.md):
   • Phone +91 81301 33279: Google Business Profile, Zomato and District agree.
   • WhatsApp: no WhatsApp number was given, so we use the Google number.
     The owner's Google replies are signed +91 98101 21535; the owner still
     has to say which number takes WhatsApp (brief §8, Q1).
   • Address & map pin: Google Business Profile; Instagram and Facebook
     also say "40, New Aruna Colony". Zomato says "15 A" (brief §4).
   • Hours: Google and Zomato agree: Mon–Fri 8 am – 10 pm,
     Sat–Sun 8 am – 10:30 pm. The Instagram bio says 8 am – 10 pm.
   • Live music 7–10 pm every day: Instagram bio (@wongdhencafe).
   • Breakfast 8 am – 12 noon: the café's own breakfast posts (Sep–Oct 2026).

   To change hours: edit the open/close times below (24-hour "HH:MM").
   ========================================================================== */

window.WONGDHEN = {
  name: "Wongdhen Cafe",
  phone: "+918130133279",
  phoneDisplay: "+91 81301 33279",
  whatsapp: "918130133279",
  email: "wongdhencafe@gmail.com",
  address: [
    "40, Central, New Aruna Colony",
    "Majnu-ka-Tilla, New Aruna Nagar",
    "New Delhi, Delhi 110054"
  ],
  mapsUrl: "https://www.google.com/maps?cid=10082333097336077118",
  mapsEmbed: "https://maps.google.com/maps?q=Wongdhen%20Cafe%2C%2040%20New%20Aruna%20Colony%2C%20Majnu%20ka%20Tilla%2C%20Delhi%20110054&z=17&output=embed",
  googleReviews: "https://www.google.com/maps?cid=10082333097336077118",
  instagram: "https://www.instagram.com/wongdhencafe/",
  instagramRinchen: "https://www.instagram.com/rinchenwongdhen/",
  instagramGelato: "https://www.instagram.com/wongdhengelato/",
  zomato: "https://www.zomato.com/ncr/wongdhen-cafe-majnu-ka-tila-new-delhi/order",
  swiggy: "https://www.swiggy.com/city/delhi/wongdhen-cafe-new-aruna-nagar-gtb-nagar-rest686396",
  rating: { value: "4.4", count: 2319, seen: "7 Oct 2026" },
  liveMusic: { from: "19:00", to: "22:00" },
  breakfast: { from: "08:00", to: "12:00" }
};

window.WONGDHEN_HOURS = {
  timezone: "Asia/Kolkata",
  days: [
    { day: "Monday",    open: "08:00", close: "22:00" },
    { day: "Tuesday",   open: "08:00", close: "22:00" },
    { day: "Wednesday", open: "08:00", close: "22:00" },
    { day: "Thursday",  open: "08:00", close: "22:00" },
    { day: "Friday",    open: "08:00", close: "22:00" },
    { day: "Saturday",  open: "08:00", close: "22:30" },
    { day: "Sunday",    open: "08:00", close: "22:30" }
  ]
};
