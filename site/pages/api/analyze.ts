// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const huggingfaceToken = process.env.HUGGINGFACE_TOKEN;

type Data = {
    generatedProbability?: number;
    error?: string;
};

async function callInferenceApi(query: string) {
  const url = "https://api-inference.huggingface.co/models/roberta-base-openai-detector";
  const headers = { Authorization: `Bearer ${huggingfaceToken}` };

  try {
      const response = await axios.post(url, { inputs: query }, { headers });
      const data = response.data[0];

      for (let i = 0; i < data.length; i++) {
          if (data[i].label === "Fake") {
              return data[i].score;
          }
      }
      
  } catch (error) {
      return error;
  }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const query = req.body.query;

    const generatedProbability = await callInferenceApi(query);

    if (typeof generatedProbability === "number") {
        res.status(200).json({ generatedProbability });
    } else {
        res.status(500).json({ error: "Something went wrong" });
    }
}
