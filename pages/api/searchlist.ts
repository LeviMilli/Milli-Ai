import Search from "../../models/Search";

export default async function handler(req, res) {
  try {
    const data = await Search.find({}).lean();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
}
