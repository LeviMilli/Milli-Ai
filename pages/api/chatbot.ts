import type { NextApiRequest, NextApiResponse } from "next";
import Search from "../../models/Search";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { text } = req.body; // retrieve the text from the form data
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "8784912ff7msh059048cc966813ap157d9fjsnfd45ffdcab31",
        "X-RapidAPI-Host": "you-chat-gpt.p.rapidapi.com",
      },
      body: JSON.stringify({ question: text, max_response_time: 30 }), // include the text in the body
    };

    try {
      const response = await fetch("https://you-chat-gpt.p.rapidapi.com/", options);
      const data = await response.json();
      res.status(200).json(data);
      console.log(typeof data.answer)

      const result = new Search({
        text,
        answer: data.answer,
      });

      await result.save();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
