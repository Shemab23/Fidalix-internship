import express from 'express'
import dotenv from 'dotenv'
import sequelize from './src/database/connection.js'
import customer from './routes/customer.js'
import business from './routes/business.js'
import delivery from './routes/delivery.js'
import temporary from './routes/temporary.js'
import User from './src/models/User.js'
import Product from './src/models/Product.js'
import Cart from './src/models/Cart.js'
import Order from './src/models/Order.js'
import Store from './src/models/Store.js'

dotenv.config();
const port = process.env.SERVER_PORT;

const app = express();
app.use(express.json());

(async () =>{
    try{
        await sequelize.authenticate();
        console.log(`Database connect successfully`);

        await sequelize.sync();// removes the enums ??
        console.log(`All models synchronized; alter:true was applied`);
    }catch(err){
        console.error(` could not connect to the database . Error: ${err.message}`);
    }
})();


// Routes
app.use('/user/customer',customer);
app.use('/user/business',business);
app.use('/user/delivery',delivery);
app.use('/temp',temporary);// blog and step


app.post('/user', async (req,res) =>{ // after registering
    try {
        const {name,location,kind,phone ,profile_path ,password} = req.body;
        const user = await User.create({name,location,kind,phone ,profile_path ,password});

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({error: `${error.message}`});
    }
});

app.post('/product', async (req,res) =>{ // product insertion - stage 1 for updating store
    try {
        const { name, profile_path,measure} = req.body;
        const product = await Product.create({ name, profile_path,measure});

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({error: `${error.message}`});
    }
});

app.post('/order', async (req,res) =>{ // pressing an order
    try {
        const {owner_id,payment,bank, bank_card, product_id,amount} = req.body;
        const cart = await Cart.create({product_id,amount});
        const cart_id = cart.id;
        const order = await Order.create({owner_id,cart_id,payment,bank, bank_card});
        res.status(201).json(order); // owner_id 1-4;   cart_id  payment bank bank_card   |  product_id 1-5   amount
    } catch (error) {
        res.status(500).json({error: `${error.message}`});
    }
});

app.put('/store/price',async( req, res) =>{  // change prices in the inventory
    try{
        const {shop_id, product_id, price} = req.body
        const [updated] = await Store.update({price},{
            where: {shop_id, product_id}
        });
        const ans = updated === 1? 'value updated successfully ':"failed to update the value"

        res.status(200).json({answer:ans});
    }catch(err){
        res.status(400).json({Error:`${err.message}`});
    }
});

app.get('/store',async( req, res) =>{  //  display all shops
    try{
        const items = await Store.findAll();
        res.status(200).json(items);
    }catch(err){
        res.status(400).json({Error:`${err.message}`});
    }
});

app.get('/store/:id',async( req, res) =>{  // search a business with product, desired
    try{
        const id = req.params.id
        const items = await Store.findAll({
            where: { product_id: id }
        });
        res.status(200).json(items);
    }catch(err){
        res.status(400).json({Error:`${err.message}`});
    }
});

app.delete('/user/delete',async (req,res) =>{ // delete user
    try {
        const {id} = req.body;
        const deleted = await User.destroy({
            where: {id}
        });
        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).json({Error:`${err.message}`});
    }
})
app.get('/user',async (req,res) =>{// get all users
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({Error:`${err.message}`});
    }
})


app.get('/login',async(req,res) =>{
    try {
        const {user_name,password} = req.body;
        const user = await User.findOne({where: {name: user_name}});
        if(!user){
           return  res.status(404).json({Error:`no user called ${user_name}, recorded`})
        }
        const ans = password === user.password ? true : false;
        if(ans){
            res.status(200).json({msg:"logged in successfully", user});
        }else{

            res.status(200).json({msg:"Wrong password"});
        }
    } catch (error) {
        res.status(500).json({Error:` ${error.message}`});
    }
})

app.listen(port, () => console.log(`server is running at  http://localhost:${port}`)) ;
