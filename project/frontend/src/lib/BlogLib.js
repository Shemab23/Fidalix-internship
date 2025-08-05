const titles = [
  "Reliability & Fast",
  "Safe and Professional Handling",
  "Affordable and Transparent Pricing",
  "Range of Services That Fit Customers",
  "Transparency of Our Delivery",
  "24/7 Active Support Service Line"
];

const descriptions = [
  "Every time, your schedule matters.",
  "Product in safe hands; trained riders handle every order with care.",
  "Clear rates, no surprises – affordable delivery for all your needs.",
  "Same-day, emergency, next-day, scheduled deliveries.",
  "From start till the end, trackable on your personal device.",
  "For any unclarity, our helpline service is always there for you."
];

const imagepaths = [
  "/images/fastReliable.jpg",
  "/images/wellpackaging.jpg",
  "/images/affordable.jpg",
  "/images/sameday.jpg",
  "/images/trackprocess.jpg",
  "/images/helpline.jpg",
];

const blogs = titles.map((title, index) => ({
  title,
  description: descriptions[index],
  image: imagepaths[index]
}));


export default blogs;
