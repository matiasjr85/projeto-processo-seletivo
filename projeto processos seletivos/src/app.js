import express from 'express';
import router from './Controller/controller.js'; // Certifique-se que o caminho está correto

const app = express();
app.use(express.json()); // Usando express.json() no lugar de bodyParser.json()

// Define as rotas da API
app.use('/api', router);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
