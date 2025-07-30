import express from 'express'
import User from '../src/models/User.js'

const routes  = express.Router();


routes.get('/',async (req,res) =>{//// change here
    try{
        const customers = await User.findAll({
            where: {kind: 'customer'}
        });
        return res.status(200).json(customers);
    }catch(err){
        return res.status(500).json({Error: `failed to fetch all customers; Error ${err.message}`});
    }
});


routes.get('/:id',async (req,res) =>{//// change here
    try{
        const customer = await User.findByPk(req.params.id);
        if(!customer || customer.kind !== 'customer'){
            return res.status(404).json({Error:`customer of ${req.params.id} was not found`});
        }
        return res.status(200).json(customer);
    }catch(err){
        return res.status(500).json({Error: `failed to fetch a customer of id=${req.params.id}; Error ${err.message}`});
    }
});

export default routes;
