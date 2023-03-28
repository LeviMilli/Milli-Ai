import type { NextApiRequest, NextApiResponse } from "next";
import Search from "../../models/Search";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // CHAT GENERATION AND INFO ALSO SENDS TO DATABASE
  if (req.method === "POST") {
    const { text } = req.body;
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "8784912ff7msh059048cc966813ap157d9fjsnfd45ffdcab31",
        "X-RapidAPI-Host": "you-chat-gpt.p.rapidapi.com",
      },
      body: JSON.stringify({ question: text, max_response_time: 30 }),
    };

    try {
      const response = await fetch("https://you-chat-gpt.p.rapidapi.com/", options);
      const data = await response.json();
      res.status(200).json(data);
      

      const search = new Search({
        text,
        answer: data.answer,
        likes: 0,
      });

      await search.save();
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Post was not used for query" });
  }

  

//UPDATE LIKES FOR AN ENTRY
if (req.method === "PUT") {
  const { id } = req.body;
  // Check if `id` field exists in request body
  if (!id) {
    return res.status(400).json({ message: "Missing id field in request body" });
  }

  try {
    const search = await Search.findById(id);
    
    if (!search) {
      return res.status(404).json({ message: "Search not found" });
    }
    
    search.likes += 1;
    await search.save();
    
    res.status(200).json(search);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
} else {
  res.status(405).json({ message: "PUT WAS NOT USED FOR THIS QUERY" });
}

}

