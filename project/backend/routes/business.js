import express from 'express'
import User from '../src/models/User.js'
import Store from '../src/models/Store.js';
import Product from '../src/models/Product.js';

const routes = express.Router();

routes.get('/',async (req,res)=>{
    try {
        const businesses = await User.findAll({
            where: {kind : 'business'}
        });
        return res.status(200).json(businesses);
    } catch (error) {
          return res.status(500).json({Error: `${error.message}`});
    }
})


routes.get('/owner/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const productsWithStores = await Product.findAll({
    include: [{
        model: Store,
        as: 'storing',
        required: true,
        where: {shop_id : id},
        include: [{
        model: User,
        as: 'shopOwner', // use alias as defined
        attributes: ['id', 'name']
        }],
        attributes: ['price', 'shop_id', 'product_id']
    }],
    attributes: ['id', 'name', 'profile_path', 'measure']
    });

    return res.status(200).json(productsWithStores);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});





export default routes;
