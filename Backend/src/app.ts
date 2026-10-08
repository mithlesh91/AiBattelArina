import express from "express";
import rungraph from "./Ai/graph.ai.js";
import cors from "cors"

const app = express();

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5175"],
    methods: ["GET", "POST"],
    credentials: true,
}));

app.get("/",async(req,res)=>{
    const result = await rungraph("what is xxx")
    res.send(result)

})

app.post("/ask", async (req, res) => {
    const { question } = req.body;
    const result = await rungraph(question);

    res.status(200).json({
        message: "Graph executed successfully",
        success: true,
        answer: result,
        result
    });
});

export default app;