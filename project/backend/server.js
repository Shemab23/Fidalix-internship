import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './src/database/connection.js';
import multer from 'multer';
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

// get __filename and __dirname equivalents
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import customer from './routes/customer.js';
import business from './routes/business.js';
import delivery from './routes/delivery.js';
import temporary from './routes/temporary.js';

import User from './src/models/User.js';
import Product from './src/models/Product.js';
import Cart from './src/models/Cart.js';
import Order from './src/models/Order.js';
import Store from './src/models/Store.js';
import Partner from './src/models/Partner.js';
import Deliveries from './src/models/Delivery.js';
import './src/models/index.js';
import { profile } from 'console';

dotenv.config();

const port = process.env.SERVER_PORT;

const app = express();

app.use(cors());
app.use(express.static(path.join(process.cwd(),'.','public')));// where to save images
app.use(express.urlencoded({extended: true}));// extnsion should be included; png , jpg
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({storage});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log(` Database connected successfully`);

    await sequelize.sync({ alter: true });
    console.log(` All models synchronized with DB`);

    // Mount routes
    app.use('/user/customer', customer);
    app.use('/user/business', business);
    app.use('/user/delivery', delivery);
    app.use('/temp', temporary);

  app.post('/register/partner', upload.single('profile_path'), async (req, res) => {// !the incoming file should be called  profile_path and name
    try {
      const name = req.body.name;

      // Create partner with blank image path
      const result = await Partner.create({ name, path: '' });
      const id = result.id;

      // Get file extension and final filename
      const extension = path.extname(req.file.originalname);
      const Filename = `${id}-${name}${extension}`;

      // Ensure the public/images directory exists
      const imageDir = path.join(__dirname, '..', 'frontend', 'public', 'images');
          if (!fs.existsSync(imageDir)) {
            fs.mkdirSync(imageDir, { recursive: true });
      }

      // Write image to disk
      const fullPath = path.join(imageDir, Filename);
      fs.writeFileSync(fullPath, req.file.buffer);

      // Update image path in the DB
      const imagePath = `/images/${Filename}`;
      const [updated] = await Partner.update({ path: imagePath }, { where: { id } });

      const msg = updated === 1 ? 'Uploaded successfully' : 'Failed to update image path';
      res.status(201).json({ msg:msg });

    } catch (error) {
      res.status(500).json({ Error: `${error.message}` });
    }
  });

// server.js
app.post('/register/product', upload.single('profile_path'), async (req, res) => {
  try {
    const { name, measure } = req.body;

    // Create product with blank image path
    const result = await Product.create({ name, measure, profile_path: '' });
    const id = result.id;

    // Get file extension and final filename
    const extension = path.extname(req.file.originalname);
    const Filename = `${id}-${name}${extension}`;

    const imageDir = path.join(__dirname, '..', 'frontend', 'public', 'images');
    if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });

    // Write image to disk
    const fullPath = path.join(imageDir, Filename);
    fs.writeFileSync(fullPath, req.file.buffer);

    // Update image path in DB
    const imagePath = `/images/${Filename}`;
    await Product.update({ profile_path: imagePath }, { where: { id } });

    // ✅ Return the product ID so frontend can use it
    res.status(201).json({ id, msg: 'Product uploaded successfully' });

  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

  app.post('/user', upload.single('profile_path'), async (req, res) => {// name, location, kind, phone, profile_path, password
    try {
      const { name, location, phone, password, kind } = req.body;
      const result = await User.create({ name, location, kind , phone,password, profile_path: '' });
      const id = result.id;

      const extension = path.extname(req.file.originalname);
      const Filename = `${id}-${name}${extension}`;


      const imageDir = path.join(__dirname, '..', 'frontend', 'public', 'images');
          if (!fs.existsSync(imageDir)) {
            fs.mkdirSync(imageDir, { recursive: true });
      }

      const fullPath = path.join(imageDir, Filename);
      fs.writeFileSync(fullPath, req.file.buffer);

      const imagePath = `/images/${Filename}`;
      const [updated] = await User.update({ profile_path: imagePath }, { where: { id } });

      const msg = updated === 1 ? 'Uploaded successfully' : 'Failed to update image path';
      res.status(201).json({ msg:msg });

    } catch (error) {
      res.status(500).json({ Error: `${error.message}` });
    }
  });

  // app.get('/user',async (req,res)=>{
  //   try {
  //     const {Username,password} =
  //   } catch (err) {
  //     res.status(500).json({Error: `${err.message}`})
  //   }
  // })


    app.post('/product', async (req, res) => {
      try {
        const { name, profile_path, measure } = req.body;
        const product = await Product.create({ name, profile_path, measure });
        res.status(201).json(product);
      } catch (error) {
        res.status(500).json({ error: `${error.message}` });
      }
    });

    // history
    app.get('/history',async (req,res) =>{
      try {
        const history = await Order.findAll({
        attributes: ['payment', 'bank', 'bank_card'],
        include: [
          {
            model: User,
            as: 'ordered', // order.owner_id
            attributes: [
              ['name', 'ownerName'],
              ['location', 'ownerLocation'],
              ['phone', 'ownerPhone'],
              ['profile_path', 'ownerProfile']
            ]
          },
          {
            model: Cart,
            as: 'orderCost',
            attributes: ['amount'],
            include: [
              {
                model: Product,
                as: 'ordeCart',
                attributes: [
                  ['profile_path', 'productImage'],
                  ['name', 'Product']
                ],
                include: [
                  {
                    model: Store,
                    as: 'storing',
                    attributes: [['price', 'unitPrice']],
                    include: [
                      {
                        model: User,
                        as: 'shopOwner',
                        attributes: [
                          ['name', 'shopName'],
                          ['location', 'shopLocation'],
                          ['phone', 'shopPhone'],
                          ['profile_path', 'shopProfile']
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            model: Deliveries,
            as: 'orderDelivery', // order.id = deliveries.order_id
            attributes: [['status', 'deliveryStatus'], ['price', 'totalCost']],
            include: [
              {
                model: User,
                as: 'ordersDestination', // delivery_man_id
                attributes: [
                  ['name', 'deliveryName'],
                  ['location', 'deliveryLocation'],
                  ['phone', 'deliveryPhone'],
                  ['profile_path', 'deliveryProfile']
                ]
              }
            ]
          }
        ]
      });
        res.status(200).json(history);
      } catch (err) {
        res.status(500).json({ msg: `${err.message}` });
      }
    })

    //  all partners
    app.get('/partner', async (req, res) => {
      try {
        const items = await Partner.findAll({
          attributes: ["name","path"]
      });
        res.status(200).json(items);
      } catch (err) {
        res.status(400).json({ Error: `${err.message}` });
      }
    });

    app.get('/order',async (req,res)=>{
      try {
        const items = await Order.findAll({
        attributes: ["payment", "createdAt"],
        where: { payment: true },
        include: [
          {
            model: User,
            as: "ordered",
            attributes: ["phone", "location"],
          },
          {
            model: Cart,
            as: "orderCost",
            attributes: ["amount"],
            include: {
              model: Product,
              as: "ordeCart",
              attributes: ["name"],
            },
          },
        ],
      });

      res.json(items);
      } catch (err) {
        console.error(error);
        res.status(500).json({ error: err.message });
      }
    })


    app.get('/products',async(req,res)=>{
      try {
          const products = await Product.findAll({
            attributes: ["id","name","measure",["profile_path","path"]],
          });
          res.status(200).json(products);
      } catch (error) {
        res.status(500).json({msg:`${error.message}`});
      }
    })



    app.post('/order', async (req, res) => {
      try {
        const { owner_id, payment, bank, bank_card, product_id, amount } = req.body;
        const cart = await Cart.create({ product_id, amount });
        const cart_id = cart.id;
        const order = await Order.create({ owner_id, cart_id, payment, bank, bank_card });
        res.status(201).json(order);
      } catch (error) {
        res.status(500).json({ error: `${error.message}` });
      }
    });

    app.put('/store/price', async (req, res) => {
      try {
        const { shop_id, product_id, price } = req.body;
        const [updated] = await Store.update({ price }, { where: { shop_id, product_id } });
        const ans = updated === 1 ? 'Value updated successfully' : 'Failed to update the value';
        res.status(200).json({ answer: ans });
      } catch (err) {
        res.status(500).json({ Error: `${err.message}` });
      }
    });

    app.get('/store', async (req, res) => {
      try {
        const items = await Store.findAll();
        res.status(200).json(items);
      } catch (err) {
        res.status(400).json({ Error: `${err.message}` });
      }
    });

    app.get('/store/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const items = await Store.findAll({ where: { product_id: id } });
        res.status(200).json(items);
      } catch (err) {
        res.status(400).json({ Error: `${err.message}` });
      }
    });

    app.delete('/user/delete/:id', async (req, res) => {//// delete
      try {
        const id  = req.params.id;
        const deleted = await User.destroy({ where: { id } });
        res.status(200).json(deleted);
      } catch (err) {
        res.status(500).json({ Error: `${err.message}` });
      }
    });

    app.get('/user', async (req, res) => {
      try {
        const users = await User.findAll({
          attributes: {exclude: ["createdAt","updatedAt"]} // id","kind","name","location","phone","profile_path","password"
        });
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json({ Error: `${err.message}` });
      }
    });

    app.post('/login', async (req, res) => {
      try {
        const { name, password } = req.body;
        const user = await User.findOne({ where: { name: name } });
        if (!user) {
          return res.status(404).json({ Error: `No user called ${user_name}, recorded` });
        }
        const ans = password === user.password;
        if (ans) {
          res.status(200).json({ msg: "Logged in successfully", user });
        } else {
          res.status(200).json({ msg: "Wrong password" });
        }
      } catch (error) {
        res.status(500).json({ Error: `${error.message}` });
      }
    });


    app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));

  } catch (err) {
    console.error(`Could not start server. Error: ${err.message}`);
  }
};

startServer();
