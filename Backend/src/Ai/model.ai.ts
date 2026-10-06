import {ChatGoogle} from "@langchain/google"
import {ChatMistralAI}from "@langchain/mistralai"
import {ChatCohere}from "@langchain/cohere"
import configs from '../config/config.js'

export const GoogleModel = new ChatGoogle({
    model:"gemini-3.5-flash-lite",
    apiKey: configs.GOOGLE_API_KEY
})

export const MistralModel = new ChatMistralAI({
    model:"mistral-tiny",
    apiKey:configs.MISTRAL_API_KEY
})

export const CohereModel = new ChatCohere ({
    model:"command-a-03-2025",
    apiKey:configs.COHERE_API_KEY
})