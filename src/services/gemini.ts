import { GoogleGenAI } from "@google/genai";
import { env } from "../env.ts";

const gemini = new GoogleGenAI({
  apiKey: env.GOOGLE_GENAI_KEY,
});

const model = "gemini-2.5-flash";

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: "Transcreva o audio para o português do Brazil. Seja preciso e naturalna transcrição. Mantenha a pontuação adequada e divida o texto em paragráfos quando for apropriado.",
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        },
      },
    ],
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    },
  });

  if (!response.text) {
    throw new Error("Não foi possível converter o áudio.");
  }

  return response.text;
}

export async function generateEmbeddings(text: string) {
  const response = await gemini.models.embedContent({
    model: "text-embedding-004",
    contents: [{ text }],
    config: {
      taskType: "RETRIEVAL_DOCUMENT",
    },
  });

  if (!response.embeddings?.[0].values) {
    throw new Error("Não foi possivel gerar os embeddings.");
  }

  return response.embeddings[0].values;
}

export async function generateAnswer(
  question: string,
  transcriptions: string[]
) {
  const context = transcriptions.join("\n\n");

  const prompt = `
    Com base no texto fornecido abaixo como texto, responda a pergunta de forma clara e precisa em português do brasil.

    CONTEXTO:
    ${context}

    PERGUNTA:
    ${question}

    INSTRUÇÕES:
    - Use apenas informações contidas no contexto enviado;
    - se a resposta não for encontrada no contexto apenas responda que não possui informações suficiente para responder;
    - seja objetivo;
    - mantenha um tom educativo e profissional;
    - cite trechos relevantes do contexto se apropriado;
    - se for citar o contexto, utilizar o termo "conteúdo da aula";
  `.trim();

  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
    ],
  });

  const result = response.text;

  if (!result) {
    throw new Error("Falha ao gerar resposta pele Gemini");
  }

  return result;
}
