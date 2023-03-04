import type { NextApiRequest, NextApiResponse } from "next";
import ImageGen from "../../models/ImageGen";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { text } = req.body;
    const encodedParams = new URLSearchParams();
    encodedParams.append("prompt", text);
    encodedParams.append("guidance", "7");
    encodedParams.append("steps", "30");
    encodedParams.append("sampler", "euler_a");
    encodedParams.append("upscale", "1");
    encodedParams.append("negative_prompt", "ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, extra limbs, disfigured, deformed, body out of frame, blurry, bad anatomy, blurred, watermark, grainy, signature, cut off, draft");
    encodedParams.append("model", "epic_diffusion_1_1");

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '8784912ff7msh059048cc966813ap157d9fjsnfd45ffdcab31',
        'X-RapidAPI-Host': 'dezgo.p.rapidapi.com'
      },
      body: encodedParams
    };

    try {
      const response = await fetch('https://dezgo.p.rapidapi.com/text2image', options);
      const data = await response.json();
      res.status(200).json(data);
     

      // const result = new ImageGen({
      //   text,
      //   answer: data.answer,
      // });
      // await result.save();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
