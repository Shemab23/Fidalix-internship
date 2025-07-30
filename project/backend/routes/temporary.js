import express from 'express'
import Blog from '../src/models/Blog.js'
import Step from '../src/models/Step.js'


const routes = express.Router();

routes.get('/blog',async (req,res) =>{
    try{
        const blogs = await Blog.findAll({raw: true});
        console.log(blogs);
        return res.status(200).json(blogs);
    }catch(err){
        return res.status(500).json({Error:`${err.message}`});
    }

});


routes.get('/step',async (req,res) =>{
    try{
        const steps = await Step.findAll({raw:true});
        console.log(steps);
        return res.status(200).json(steps);
    }catch(err){
        return res.status(500).json({Error:`${err.message}`});
    }
});

export default routes;
