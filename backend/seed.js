import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";

dotenv.config();

const USERS = [
  {
    name: "Anna Kovács",
    email: "anna@example.com",
    phone: "+421 901 111 222",
    password: "password123",
    passwordConfirm: "password123",
  },
  {
    name: "Márk Tóth",
    email: "mark@example.com",
    phone: "+421 902 333 444",
    password: "password123",
    passwordConfirm: "password123",
  },
  {
    name: "Petra Nagy",
    email: "petra@example.com",
    phone: "+421 903 555 666",
    password: "password123",
    passwordConfirm: "password123",
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Connected to MongoDB...");

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.create(USERS);
    const [anna, mark, petra] = createdUsers;

    const products = [
      {
        title: "Classic Beige Cotton Trench Coat",
        description:
          "Timeless double-breasted trench coat in warm beige. Lightly worn, freshly cleaned, no stains or missing buttons.",
        price: 45,
        size: "M",
        condition: "very_good",
        category: "women",
        images: ["/images/beige-trench-coat.jpg"],
        seller: anna._id,
      },
      {
        title: "Chunky Sage Green Wool Sweater",
        description:
          "Soft knitted wool-blend pullover in muted sage green. Relaxed Scandinavian fit, ideal for autumn and winter.",
        price: 32,
        size: "S",
        condition: "new_without_tags",
        category: "women",
        images: ["/images/emerald-knit-sweater.jpg"],
        seller: petra._id,
        status: "sold",
      },
      {
        title: "Vintage Medium-Wash Denim Jacket",
        description:
          "Sturdy 100% cotton denim jacket with classic button closure and chest pockets. Nice natural fade.",
        price: 38,
        size: "L",
        condition: "good",
        category: "men",
        images: ["/images/denim-jacket.jpg"],
        seller: mark._id,
      },
      {
        title: "Minimalist White Leather Sneakers",
        description:
          "Clean low-top white leather sneakers. Worn twice indoors, soles are practically untouched.",
        price: 50,
        size: "43",
        condition: "new_without_tags",
        category: "men",
        images: ["/images/white-sneakers.jpg"],
        seller: mark._id,
      },
      {
        title: "Mustard Yellow Waterproof Raincoat",
        description:
          "Wind- and waterproof hooded kids raincoat with soft cotton lining. Keeps dry even in heavy rain.",
        price: 24,
        size: "4-5Y",
        condition: "very_good",
        category: "kids",
        images: ["/images/kids-yellow-raincoat.jpg"],
        seller: anna._id,
      },
      {
        title: "Organic Cotton Striped Overalls",
        description:
          "Breathable beige-and-white striped dungarees with adjustable shoulder straps and snap buttons.",
        price: 18,
        size: "2-3Y",
        condition: "new_with_tags",
        category: "kids",
        images: ["/images/kids-striped-overalls.jpg"],
        seller: petra._id,
      },
      {
        title: "Cognac Pebbled Leather Crossbody Bag",
        description:
          "Compact everyday shoulder bag made from genuine pebbled leather with adjustable strap and brass hardware.",
        price: 55,
        size: "One Size",
        condition: "very_good",
        category: "accessories",
        images: ["/images/leather-crossbody-bag.jpg"],
        seller: anna._id,
      },
      {
        title: "Soft Oatmeal Merino Wool Scarf",
        description:
          "Lightweight yet warm 100% merino wool scarf in neutral oatmeal shade. Non-itchy and generously sized.",
        price: 22,
        size: "One Size",
        condition: "new_without_tags",
        category: "accessories",
        images: ["/images/wool-scarf.jpg"],
        seller: petra._id,
      },
      {
        title: "Handmade Speckled Ceramic Coffee Mug",
        description:
          "Wheel-thrown stoneware mug with natural speckled glaze. Holds approx. 300 ml, dishwasher safe.",
        price: 14,
        size: "300 ml",
        condition: "new_with_tags",
        category: "other",
        images: ["/images/ceramic-coffee-mug.jpg"],
        seller: mark._id,
        status: "sold",
      },
      {
        title: "Minimalist Olive Canvas Daypack",
        description:
          "Durable waxed canvas backpack with padded 15-inch laptop sleeve and front zip pocket.",
        price: 40,
        size: "18L",
        condition: "good",
        category: "other",
        images: ["/images/canvas-backpack.jpg"],
        seller: anna._id,
        status: "sold",
      },
    ];

    const createdProducts = await Product.create(products);

    const orders = [
      {
        product: createdProducts[1]._id,
        buyer: anna._id,
        seller: petra._id,
        price: createdProducts[1].price,
        status: "completed",
      },
      {
        product: createdProducts[8]._id,
        buyer: anna._id,
        seller: mark._id,
        price: createdProducts[8].price,
        status: "pending",
      },
      {
        product: createdProducts[9]._id,
        buyer: mark._id,
        seller: anna._id,
        price: createdProducts[9].price,
        status: "completed",
      },
    ];

    await Order.create(orders);
    console.log("Seed completed: 3 users, 10 products, and 3 orders created!");
  } catch (err) {
    console.error("Seed failed:", err);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
