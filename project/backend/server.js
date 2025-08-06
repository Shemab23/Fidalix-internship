import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './src/database/connection.js';
import multer from 'multer';
import fs from 'fs'
import path from 'path';

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
      const imageDir = path.join('public', 'images');
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

  app.post('/register/product', upload.single('profile_path'), async (req, res) => {// name measure profile_path
    try {
      const {name,measure} = req.body;

      // Create partner with blank image path
      const result = await Product.create({ name,measure, profile_path: '' });
      const id = result.id;

      // Get file extension and final filename
      const extension = path.extname(req.file.originalname);
      const Filename = `${id}-${name}${extension}`;

      // Ensure the public/images directory exists
      const imageDir = path.join('public', 'images');

      if (!fs.existsSync(imageDir)) {
        fs.mkdirSync(imageDir, { recursive: true });
      }

      // Write image to disk
      const fullPath = path.join(imageDir, Filename);
      fs.writeFileSync(fullPath, req.file.buffer);

      // Update image path in the DB
      const imagePath = `/images/${Filename}`;
      const [updated] = await Product.update({ profile_path: imagePath }, { where: { id } });

      const msg = updated === 1 ? 'Uploaded successfully' : 'Failed to update image path';
      res.status(201).json({ msg:msg });

    } catch (error) {
      res.status(500).json({ Error: `${error.message}` });
    }
  });


    app.post('/user', async (req, res) => {
      try {
        const { name, location, kind, phone, profile_path, password } = req.body;
        const user = await User.create({ name, location, kind, phone, profile_path, password });
        res.status(201).json(user);
      } catch (error) {
        res.status(500).json({ error: `${error.message}` });
      }
    });

    app.post('/product', async (req, res) => {
      try {
        const { name, profile_path, measure } = req.body;
        const product = await Product.create({ name, profile_path, measure });
        res.status(201).json(product);
      } catch (error) {
        res.status(500).json({ error: `${error.message}` });
      }
    });

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

    app.delete('/user/delete', async (req, res) => {
      try {
        const { id } = req.body;
        const deleted = await User.destroy({ where: { id } });
        res.status(200).json(deleted);
      } catch (err) {
        res.status(500).json({ Error: `${err.message}` });
      }
    });

    app.get('/user', async (req, res) => {
      try {
        const users = await User.findAll();
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json({ Error: `${err.message}` });
      }
    });

    app.get('/login', async (req, res) => {
      try {
        const { user_name, password } = req.body;
        const user = await User.findOne({ where: { name: user_name } });
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
