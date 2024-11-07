import express from 'express';
import cors from 'cors'; 
import router from './Controller/controller.js'; 
import conecxaoDB from './DataBase/dataBaseMoongose.js';

const app = express();
app.use(cors()); 
app.use(express.json());
conecxaoDB();


app.use('/api', router);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
