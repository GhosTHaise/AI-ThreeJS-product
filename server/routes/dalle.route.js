import express from "express";
import * as dotenv from "dotenv";

import { Configuration,OpenAIApi } from "openai";

dotenv.config();

const Router = express.Router();

Router.route("/").get((req,res)=>{
    res.status(200).json({
        message : "Hello from DALL.E ROUTES"
    })
});

export default Router; 