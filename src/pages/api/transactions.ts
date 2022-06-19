// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../utils/data.json";


type Data = {
  id: string | number;
  name: string;
  price: number;
  type: string;
  category: string;
};



export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(data.transactions);
}
