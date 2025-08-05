import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './src/database/connection.js';

// Import routes
import customer from './routes/customer.js';
import business from './routes/business.js';
import delivery from './routes/delivery.js';
import temporary from './routes/temporary.js';

// Import models (for sync)
import User from './src/models/User.js';
import Product from './src/models/Product.js';
import Cart from './src/models/Cart.js';
import Order from './src/models/Order.js';
import Store from './src/models/Store.js';
import './src/models/index.js'; // ✅ This defines associations!

dotenv.config();
const port = process.env.SERVER_PORT;

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Wrap everything in one async IIFE
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Database connected successfully`);

    await sequelize.sync({ alter: true }); // ✅ Only one sync — with alter
    console.log(`✅ All models synchronized with DB`);

    // Mount routes
    app.use('/user/customer', customer);
    app.use('/user/business', business);
    app.use('/user/delivery', delivery);
    app.use('/temp', temporary);

    // Your existing endpoints...
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
        res.status(400).json({ Error: `${err.message}` });
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

    // ✅ Start server AFTER all setup is done
    app.listen(port, () => console.log(`🚀 Server is running at http://localhost:${port}`));

  } catch (err) {
    console.error(`❌ Could not start server. Error: ${err.message}`);
  }
};

startServer();
