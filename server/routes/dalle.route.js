import express from "express";
import * as dotenv from "dotenv";

import { Configuration,OpenAIApi } from "openai";

dotenv.config();

const Router = express.Router();

const config = new Configuration({
    apiKey : process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(config);

Router.route("/").get((req,res)=>{
    res.status(200).json({
        message : "Hello from DALL.E ROUTES"
    })
});

Router.route("/").post(async (req,res)=>{
    try {
        const {prompt} = req.body;

        const response = await openai.createImage({
            prompt,
            n : 1,
            size: "1024x1024",
            response_format : "b64_json"
        });

        const image = response.data.date[0].b64_json;

        res.status(200).json({
            photo : image
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Something went wrong."
        })
    }
})
export default Router; 