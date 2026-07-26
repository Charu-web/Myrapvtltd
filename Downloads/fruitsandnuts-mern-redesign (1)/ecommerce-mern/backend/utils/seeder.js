// Run: npm run seed          -> creates admin user + Fruits & Nuts categories/products
// Run: npm run seed:destroy  -> wipes Users, Products, Categories
//
// Product photos and descriptions here are the real, currently-sold
// dry-fruits & nuts line (sourced from the fruitsandnuts.co.in asset export)
// served from this backend's own /uploads static folder — see server.js.
// The Chocolates category is seeded as a structure only (subcategories, no
// products yet) because no real chocolate product photography was supplied;
// add products under it once photos exist rather than shipping placeholders.
require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000';
const img = (file) => `${SERVER_URL}/uploads/products/${file}`;

const run = async () => {
  await connectDB();

  if (process.argv.includes('-d')) {
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    console.log('Data destroyed.');
    process.exit();
  }

  // --- Admin user ---
  const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (!adminExists) {
    await User.create({
      name: process.env.ADMIN_NAME || 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: process.env.ADMIN_PASSWORD || 'ChangeMe123!',
      role: 'admin',
    });
    console.log(`Admin created: ${process.env.ADMIN_EMAIL}`);
  } else {
    console.log('Admin already exists, skipping.');
  }

  // --- Categories ---
  const upsertCategory = async (name, description, parent = null, image = '') => {
    let cat = await Category.findOne({ name });
    if (!cat) {
      cat = await Category.create({ name, description, parent, image });
      console.log(`Category created: ${name}`);
    }
    return cat;
  };

  const dryFruitsNuts = await upsertCategory(
    'Dry Fruits & Nuts',
    'Premium roasted nuts and naturally sweet dried fruits, packed fresh in resealable pouches.'
  );
  const nutsSub = await upsertCategory('Nuts', 'Roasted and raw whole nuts.', dryFruitsNuts._id);
  const driedFruitSub = await upsertCategory('Dried Fruits', 'Naturally sweet dried and dehydrated fruit.', dryFruitsNuts._id);

  const chocolates = await upsertCategory(
    'Chocolates',
    'Dark, milk and fruit-and-nut chocolate collections. Product photography coming soon.'
  );
  await upsertCategory('Dark Chocolate', 'High-cocoa bars and bites.', chocolates._id);
  await upsertCategory('Milk & Praline', 'Silky milk chocolate and creamy pralines.', chocolates._id);
  await upsertCategory('Fruit & Nut Chocolate', 'Classic fruit-and-nut combinations.', chocolates._id);

  // --- Products (real catalog, real photos) ---
  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    await Product.insertMany([
      {
        name: 'Premium Nuts Mix',
        description:
          'A hand-blended assortment of premium roasted nuts — almonds, cashews and pistachios — for a rich, satisfying crunch. Lightly salted and roasted in small batches to lock in freshness. No added preservatives.',
        shortDescription: 'Assorted premium roasted nuts for a rich crunch.',
        brand: 'Fruits & Nuts',
        category: nutsSub._id,
        images: [{ url: img('premium-nuts-mix.jpeg'), alt: 'Premium Nuts Mix' }],
        price: 799,
        discountPrice: 699,
        stock: 60,
        sku: 'FN-NUT-MIX-001',
        variants: [
          { size: '250g', stock: 20, sku: 'FN-NUT-MIX-001-250', priceModifier: 0 },
          { size: '500g', stock: 25, sku: 'FN-NUT-MIX-001-500', priceModifier: 550 },
          { size: '1kg', stock: 15, sku: 'FN-NUT-MIX-001-1000', priceModifier: 1150 },
        ],
        tags: ['nut', 'bestseller', 'roasted'],
        isFeatured: true,
      },
      {
        name: 'Cashew Classic',
        description:
          'Whole, buttery cashews roasted to a light golden crunch and lightly salted. A clean, simple snack — no added sugar, no artificial flavoring.',
        shortDescription: 'Buttery whole cashews, perfect for snacking.',
        brand: 'Fruits & Nuts',
        category: nutsSub._id,
        images: [{ url: img('cashew-classic.jpeg'), alt: 'Cashew Classic' }],
        price: 649,
        discountPrice: 0,
        stock: 80,
        sku: 'FN-NUT-CASH-002',
        variants: [
          { size: '250g', stock: 30, sku: 'FN-NUT-CASH-002-250', priceModifier: 0 },
          { size: '500g', stock: 30, sku: 'FN-NUT-CASH-002-500', priceModifier: 470 },
          { size: '1kg', stock: 20, sku: 'FN-NUT-CASH-002-1000', priceModifier: 980 },
        ],
        tags: ['nut', 'cashew'],
        isFeatured: true,
      },
      {
        name: 'Pistachio Supreme',
        description:
          'Roasted in-shell pistachios with a natural, savory flavor. Sourced from select harvests and roasted without added oil.',
        shortDescription: 'Roasted pistachios with natural flavor.',
        brand: 'Fruits & Nuts',
        category: nutsSub._id,
        images: [{ url: img('pistachio-supreme.jpeg'), alt: 'Pistachio Supreme' }],
        price: 899,
        discountPrice: 799,
        stock: 45,
        sku: 'FN-NUT-PIST-003',
        variants: [
          { size: '250g', stock: 20, sku: 'FN-NUT-PIST-003-250', priceModifier: 0 },
          { size: '500g', stock: 15, sku: 'FN-NUT-PIST-003-500', priceModifier: 620 },
        ],
        tags: ['nut', 'pistachio', 'premium'],
        isFeatured: true,
      },
      {
        name: 'Medjool Dates',
        description:
          "Soft, caramel-sweet Medjool dates — nature's candy. Rich in fiber and a natural source of energy, perfect on their own or stuffed with nuts.",
        shortDescription: "Soft, sweet dates — nature's candy.",
        brand: 'Fruits & Nuts',
        category: driedFruitSub._id,
        images: [{ url: img('medjool-dates.jpeg'), alt: 'Medjool Dates' }],
        price: 549,
        discountPrice: 0,
        stock: 70,
        sku: 'FN-DRY-DATE-004',
        variants: [
          { size: '250g', stock: 30, sku: 'FN-DRY-DATE-004-250', priceModifier: 0 },
          { size: '500g', stock: 25, sku: 'FN-DRY-DATE-004-500', priceModifier: 400 },
          { size: '1kg', stock: 15, sku: 'FN-DRY-DATE-004-1000', priceModifier: 850 },
        ],
        tags: ['fruit', 'dates', 'bestseller'],
        isFeatured: true,
      },
      {
        name: 'Almond Crunch',
        description:
          'Crunchy roasted almonds with a clean, nutty finish. A high-protein snack roasted fresh with a touch of sea salt.',
        shortDescription: 'Crunchy roasted almonds with a clean finish.',
        brand: 'Fruits & Nuts',
        category: nutsSub._id,
        images: [{ url: img('almond-crunch.jpeg'), alt: 'Almond Crunch' }],
        price: 599,
        discountPrice: 549,
        stock: 65,
        sku: 'FN-NUT-ALMD-005',
        variants: [
          { size: '250g', stock: 25, sku: 'FN-NUT-ALMD-005-250', priceModifier: 0 },
          { size: '500g', stock: 25, sku: 'FN-NUT-ALMD-005-500', priceModifier: 430 },
          { size: '1kg', stock: 15, sku: 'FN-NUT-ALMD-005-1000', priceModifier: 900 },
        ],
        tags: ['nut', 'almond'],
        isFeatured: false,
      },
      {
        name: 'Granola Bites',
        description:
          'Wholesome granola clusters made with oats, nuts and a hint of honey — a light, crunchy bite for snacking on the go or topping your morning yogurt.',
        shortDescription: 'Wholesome granola clusters for light munching.',
        brand: 'Fruits & Nuts',
        category: nutsSub._id,
        images: [{ url: img('granola-bites.jpeg'), alt: 'Granola Bites' }],
        price: 449,
        discountPrice: 0,
        stock: 90,
        sku: 'FN-NUT-GRAN-006',
        variants: [
          { size: '250g', stock: 40, sku: 'FN-NUT-GRAN-006-250', priceModifier: 0 },
          { size: '500g', stock: 30, sku: 'FN-NUT-GRAN-006-500', priceModifier: 320 },
        ],
        tags: ['nut', 'granola', 'snack'],
        isFeatured: false,
      },
    ]);
    console.log('Fruits & Nuts categories and products created.');
  } else {
    console.log('Products already exist, skipping sample data.');
  }

  console.log('Seeding complete.');
  process.exit();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
