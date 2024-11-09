import express, { Request, Response } from "express";
import serverless from "serverless-http";
import { appendToGoogleSheet } from "./sheetHandler";

const app = express();
const router = express.Router();
app.use(express.json());

router.post("/sendData", async (req: Request, res: Response) => {
  const { nome, email, telefone } = req.body;
  try {
    await appendToGoogleSheet([nome, email, telefone]);
    res.status(200).send('Dados adicionados com sucesso!');
  } catch (error){
    res.status(500).json({ error });
    console.log(error, 'error')
  }
  
});

app.use("/.netlify/functions/api", router);

app.listen(5000, () => {
  console.log("Server listening on Port", 5000);
})

export const handler = serverless(app);
