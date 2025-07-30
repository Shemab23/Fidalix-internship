import express from 'express'
import User from '../src/models/User.js'

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




export default routes;
