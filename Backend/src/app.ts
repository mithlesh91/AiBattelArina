import express from "express";
import rungraph from "./Ai/graph.ai.js";

const app = express();

app.get("/",async(req,res)=>{
    const result = await rungraph("what is xxx")
    res.send(result)

})

export default app;