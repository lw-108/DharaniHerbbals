// generateData.js - creates data.json with 263 product entries
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.json');
let products = [];
if (fs.existsSync(dataPath)) {
  try {
    products = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  } catch (e) {
    console.error('Failed to parse existing data.json:', e);
  }
}

const categories = [
  "Hair Care",
  "Skin Care",
  "Baby Care",
  "Beverages",
  "Body",
  "Food",
  "Health & Wellness",
  "Poojas"
];
const brands = [
  "MAKIL",
  "RAMCARE",
  "DIVYAM",
  "VANA ARASI",
  "VEDAN AMUTHU",
  "VEDAN",
  "ATHIYAMAN",
  "NIRAI HOMAM"
];
const productTypes = [
  "New Launch",
  "Best Selling",
  "deals",
  "trending",
  "hot",
  "popular"
];

for (let i = products.length + 1; i <= 263; i++) {
  const category = categories[(i - 1) % categories.length];
  const brand = brands[(i - 1) % brands.length];
  const productType = productTypes[(i - 1) % productTypes.length];
  products.push({
    id: i.toString(),
    name: `Placeholder Product ${i}`,
    category,
    brand,
    productType,
    imageUrl: "https://via.placeholder.com/300"
  });
}

fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
console.log(`Generated ${products.length} products at ${dataPath}`);
