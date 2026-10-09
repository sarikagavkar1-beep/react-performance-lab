const names = [
  "Wireless Headphones", "Desk Lamp", "Travel Backpack", "Water Bottle",
  "Mechanical Keyboard", "Running Shoes", "Coffee Maker", "Notebook Set",
  "Bluetooth Speaker", "Phone Stand", "Yoga Mat", "Laptop Sleeve"
];
const categories = ["Electronics", "Home", "Accessories", "Fitness"];
const descriptions = [
  "Designed for everyday comfort and reliable performance.",
  "A simple, durable choice for your daily routine.",
  "Thoughtful details with a clean, modern finish.",
  "A practical favorite for work, study, and travel."
];

export const products = Array.from({ length: 1200 }, (_, i) => ({
  id: i + 1,
  name: `${names[i % names.length]} ${Math.floor(i / names.length) + 1}`,
  category: categories[i % categories.length],
  price: [799, 1299, 1599, 499, 2499, 1999, 3299, 299][i % 8],
  rating: (4 + ((i % 10) / 10)).toFixed(1),
  description: descriptions[i % descriptions.length]
}));