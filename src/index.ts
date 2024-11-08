import express, { Request, Response } from 'express';
import { appendToGoogleSheet } from './sheetHandler';

const app = express();
app.use(express.json());

app.post('/api/sendData', async (req: Request, res: Response) => {
  const { nome, email, telefone } = req.body;
  
  try {
    await appendToGoogleSheet([nome, email, telefone]);
    res.status(200).send('Dados adicionados com sucesso!');
  } catch (err) {
    console.error('Erro ao enviar os dados:', err);
    res.status(500).send('Erro ao enviar os dados');
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
