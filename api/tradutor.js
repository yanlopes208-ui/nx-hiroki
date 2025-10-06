import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyC1kHoO-udo69HP-FzrsEiv40M6ikiBCRU");

export default async function handler(req, res) {
const { text, to } = req.query;

if (!text || !to) {
return res.status(400).json({
error: "Use os parâmetros 'text' (texto a traduzir) e 'to' (idioma de destino, ex: en, es, fr)."
});
}

try {
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = `Traduza o seguinte texto para ${to} e responda apenas com a tradução pura, sem explicações:\n\n"${text}"`;  

const result = await model.generateContent(prompt);  
const translated = result.response.text().trim();  

res.status(200).json({  
  original: text,  
  translated,  
  to  
});

} catch (error) {
res.status(500).json({ error: error.message });
}
}
