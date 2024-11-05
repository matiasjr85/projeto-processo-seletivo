import express from 'express';
import { cadastroDeVagas } from '../Model/cadastroDeVagasModel.js';
import { empresaModel } from '../Model/empresaModel.js';

let lastId = 0;
function generateId() {
    return lastId++;
}


const router = express.Router();

let empresas = [];
let vagas = [];

router.get('/vagas', (req, res) => {
    const vagaData = vagas.map((vaga, index) => ({
        id: index,
        nomeDaVaga: vaga.getNomeVagas(),
        modalidadeDeTrabalho: vaga.getModalidadeDeTrabalho(),
        empresa: vaga.getEmpresa()
    }));

    res.json(vagaData);

})

router.post('/vagas', (req, res) => {
    const { nomeVaga, modalidade, nomeEmpresa, cnpj, cep } = req.body;

    const empresa = new empresaModel(nomeEmpresa, cnpj, cep);
    empresas.push(empresa)
    const vaga = new cadastroDeVagas(nomeVaga, modalidade, empresa);
    vagas.id = generateId();
    vagas.push(vaga);

    res.status(201).json({ mensagem: 'Vaga criada com sucesso', vaga: {
        nomeDaVaga: vaga.getNomeVagas(),
        modalidadeDeTrabalho: vaga.getModalidadeDeTrabalho(),
        empresa: vaga.getEmpresa()
    } });
});

router.put('/vagas/:id', (req, res) => {
   const { id } = req.params;
   const{ nomeVaga, modalidade } = req.body;

   const vaga = vagas[id];

   if (vaga) {
    vaga.setNomeVagas(nomeVaga || vaga.getNomeVagas());
    vaga.setModalidadeDeTrabalho(modalidade || vaga.getModalidadeDeTrabalho());

    res.json({ mensagem: 'Vaga atualizada com sucesso', vaga: {
        nomeDaVaga: vaga.getNomeVagas(),
        modalidadeDeTrabalho: vaga.getModalidadeDeTrabalho(),
        empresa: vaga.getEmpresa()
    } });
} else {
    res.status(404).json({ mensagem: 'Vaga não encontrada' });
}
});

router.delete('/vagas/:id', (req, res) => {
    const { id } = req.params;
    if (vagas[id]) {
        vagas.splice(id, 1);
        res.json({ mensagem: 'Vaga removida com sucesso' });
    } else {
        res.status(404).json({ mensagem: 'Vaga não encontrada' });
    }
});

export default router;