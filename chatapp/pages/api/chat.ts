import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await fetch(
    `https://api.runpod.ai/v2/${process.env.RUNPOD_ID}/runsync`,
    {
      method: "POST",
      headers: {
        Authorization: process.env.RUNPOD_KEY as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: {
          prompt: req.body.prompt,
        },
      }),
    }
  );

  const data = await response.json();
  const output = data.output.output;

  console.log("Success:", JSON.stringify(data));

  res.status(200).json({ data: output });
}
