// ─────────────────────────────────────────────────────────────
// Single place to edit business details and content.
// Contact details, hours, categories, testimonials and photos are taken from the live site
// https://www.nalukandathilgold.in (collected Nov 2026).
// ─────────────────────────────────────────────────────────────
export const site = {
  name: "Nalukandathil",
  fullName: "Nalukandathil Gold & Diamonds",
  since: 1979,
  tagline: "Make your every moment into a timeless memory.",
  website: "www.nalukandathilgold.in",

  phone: "+91 94965 25494",
  whatsapp: "919496525494", // country code + number, no "+" or spaces
  email: "", // not listed on the current site – add one to show it in the header/footer/contact
  instagram: "https://www.instagram.com/nalukandathilgoldanddiamonds",
  facebook: "https://www.facebook.com/share/1ATfXaEXgv/",

  // Not on the live site – carried over from the earlier project; verify before launch.
  stats: {
    instagramFollowers: "5,556",
    googleRating: "4.0",
    googleReviews: 54,
  },

  showrooms: [
    {
      name: "Edakkara",
      region: "Edakkara, Keralam",
      address: "CNG Road, Edakkara, Keralam",
      hours: "Mon – Sat · 10 AM – 8 PM · Sun closed",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Nalukandathil+Jewellers+Edakkara",
    },
  ],

  // Full weekly timetable (from the live site).
  hoursList: [
    { day: "Monday", time: "10:00 AM – 8:00 PM" },
    { day: "Tuesday", time: "10:00 AM – 8:00 PM" },
    { day: "Wednesday", time: "10:00 AM – 6:00 PM" },
    { day: "Thursday", time: "10:00 AM – 8:00 PM" },
    { day: "Friday", time: "10:00 AM – 8:00 PM" },
    { day: "Saturday", time: "10:00 AM – 8:00 PM" },
    { day: "Sunday", time: "Closed", closed: true },
  ],

  // Campaign photos used in the hero.
  looks: [
    { src: "/images/look-ivory.png", title: "The Ivory Edit" },
    { src: "/images/look-noir.png", title: "Noir & Gold" },
    { src: "/images/look-emerald.png", title: "Emerald Velvet" },
  ],

  // The six "Gold Items" categories of the live site, with its photos and descriptions.
  collections: [
    { title: "Rings", tag: "Rings", blurb: "Elegant pieces for the fingers — love, style and timeless beauty in designs for every occasion.", image: "/site/rings.webp" },
    { title: "Necklace", tag: "Necklaces", blurb: "Beautiful necklaces designed to enhance elegance and add a touch of charm to any outfit.", image: "/site/necklace.webp" },
    { title: "Chain", tag: "Chains", blurb: "Classic chains, known for their simple elegance and versatile style for any occasion.", image: "/site/chain.webp" },
    { title: "Bracelet", tag: "Bracelets", blurb: "Stylish wrist pieces that add grace and charm with designs for every look.", image: "/site/bracelet.webp" },
    { title: "Anklets", tag: "Anklets", blurb: "Delicate pieces worn around the ankle, adding charm with graceful designs.", image: "/site/anklets.webp", focus: "50% 45%" },
    { title: "Lockets", tag: "Lockets", blurb: "Timeless lockets that hold cherished memories, keeping sentiments close to the heart.", image: "/site/lockets.webp" },
  ],

  // `image` (+ optional `focus` "x% y%" and `zoom`) – swap in your own photos any time.
  products: [
    { name: "Antique Temple Necklace Set", category: "Necklace", purity: "Gold · Ruby", image: "/site/banner-3.webp" },
    { name: "Diamond Bangles", category: "Bracelet", purity: "Gold & Diamond", image: "/site/banner-2.webp" },
    { name: "Diamond Necklace", category: "Necklace", purity: "Gold & Diamond", image: "/site/banner-4.webp" },
    { name: "Studded Gold Ring", category: "Rings", purity: "Gold & Stones", image: "/site/rings.webp" },
    { name: "Heart Pendant Chain", category: "Chain", purity: "Gold", image: "/site/chain.webp" },
    { name: "Ruby & Diamond Choker Set", category: "Necklace", purity: "Gold · Ruby · Diamond", image: "/site/banner-5.webp", focus: "50% 42%" },
    { name: "Diamond Bracelet", category: "Bracelet", purity: "Gold & Diamond", image: "/site/bracelet.webp" },
    { name: "Stone-set Anklets", category: "Anklets", purity: "Gold & Stones", image: "/site/anklets.webp", focus: "50% 40%" },
    { name: "Lotus Diamond Pendant", category: "Lockets", purity: "Gold & Diamond", image: "/site/lockets.webp" },
    { name: "Gold Jhumka Earrings", category: "Earrings", purity: "Gold", image: "/site/gallery-2.webp" },
  ],

  // Photo gallery (from the live site).
  gallery: [
    { image: "/site/banner-1.webp", title: "Celebrate in gold", focus: "40% 40%", tall: true },
    { image: "/site/gallery-1.webp", title: "Gold necklace" },
    { image: "/site/gallery-2.webp", title: "Gold jhumkas" },
    { image: "/site/gallery-3.webp", title: "Ruby & diamond set" },
  ],

  // Customer testimonials (from the live site).
  testimonials: [
    { quote: "Amazing experience! The jewellery is authentic, stylish, and makes me feel so confident.", name: "Mujeeb Rahuman", place: "Edakkara" },
    { quote: "Beautiful collection! The designs are unique, and the finishing is perfect. I love my new necklace.", name: "Anil", place: "Edakkara" },
  ],

  values: [
    {
      title: "Trusted since 1979",
      text: "Over four decades of serving families with honest pricing and purity you can rely on.",
    },
    {
      title: "BIS hallmarked purity",
      text: "Every piece is tested and hallmarked, with transparent making charges on your bill.",
    },
    {
      title: "Craft & modern design",
      text: "Temple-inspired heritage patterns alongside light, contemporary everyday jewellery.",
    },
    {
      title: "Lifetime relationship",
      text: "Exchange, buy-back and servicing support long after the celebration is over.",
    },
  ],
};
