import express, { Request, Response } from "express";
import { createSlide } from "./utils";

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my server!');
});

app.post('/lyrics', async (req: Request, res: Response) => {
  const { lyrics, title, band } = req.body

  if (!lyrics || !title || !band) {
    return res.status(422).send({ error: 'Params missing' })
  }

  const { filename } = createSlide({ title, lyrics, band })
  return res.json({ success: true, filename });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});