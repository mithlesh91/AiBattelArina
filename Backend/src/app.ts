import express from "express";
import rungraph from "./Ai/graph.ai.js";

const app = express();

app.get("/",async(req,res)=>{
    const result = await rungraph("what is llm")
    res.send(result)

})

export default app;