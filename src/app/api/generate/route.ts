import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Tu es un expert en copywriting marketing. Tu génères des titres percutants pour des landing pages. Réponds UNIQUEMENT en JSON avec les clés 'title' et 'subtitle'."
        },
        {
          role: "user",
          content: `Génère un titre et un sous-titre pour ce business : ${prompt}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const responseContent = completion.choices[0].message.content;
    return NextResponse.json(JSON.parse(responseContent || "{}"));
    
  } catch (error: any) {
    console.error("Erreur Groq:", error.message);
    return NextResponse.json({ 
      title: "Erreur de génération", 
      subtitle: "Vérifiez votre clé API Groq." 
    }, { status: 500 });
  }
}