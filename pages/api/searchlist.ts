import type { NextApiRequest, NextApiResponse } from 'next';
import Search from "../../models/Search";

type Data = {
  data: {
    _id: string;
    text: string;
    answer: string;
    likes: number;
  }[];
} | {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const data = await Search.find({}).lean();

    res.status(200).json({ data });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
}
