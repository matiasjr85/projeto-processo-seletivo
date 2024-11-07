import express from 'express';
import Vaga from '../Model/cadastroDeVagasModel.js'; 
import Empresa from '../Model/empresaModel.js'; 

const router = express.Router();

router.get('/vagas', async (req, res) => {
    try {
        const vagas = await Vaga.find().populate('empresa');

        const vagaData = vagas.map((vaga) => ({
            id: vaga._id,
            nomeDaVaga: vaga.nomeDaVaga,
            modalidadeDeTrabalho: vaga.modalidadeDeTrabalho,
            empresa: {
                nomeDaempresa: vaga.empresa.nomeDaempresa || 'Nome não disponível',
                cnpj: vaga.empresa.cnpj,
                cep: vaga.empresa.cep
            }
        }));

        res.json(vagaData);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao recuperar vagas', error });
    }
});


router.post('/vagas', async (req, res) => {
    const { nomeVaga, modalidade, nomeEmpresa, cnpj, cep } = req.body;

    try {
        
        const empresa = new Empresa({ nomeDaempresa: nomeEmpresa, cnpj, cep });
        await empresa.save();  

        
        const vaga = new Vaga({
            nomeDaVaga: nomeVaga,
            modalidadeDeTrabalho: modalidade,
            empresa: empresa._id  
        });
        await vaga.save();  
        res.status(201).json({
            mensagem: 'Vaga criada com sucesso',
            vaga: {
                nomeDaVaga: vaga.nomeDaVaga,
                modalidadeDeTrabalho: vaga.modalidadeDeTrabalho,
                empresa: vaga.empresa  
            }
        });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao criar vaga', error });
    }
});


router.put('/vagas/:id', async (req, res) => {
    const { id } = req.params;
    const { nomeVaga, modalidade } = req.body;

    try {
        
        const vaga = await Vaga.findById(id);

        if (vaga) {
            
            vaga.nomeDaVaga = nomeVaga || vaga.nomeDaVaga;
            vaga.modalidadeDeTrabalho = modalidade || vaga.modalidadeDeTrabalho;

            await vaga.save();  
            res.json({ mensagem: 'Vaga atualizada com sucesso', vaga });
        } else {
            res.status(404).json({ mensagem: 'Vaga não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao atualizar vaga', error });
    }
});


router.delete('/vagas/:id', async (req, res) => {
    const { id } = req.params;

    try {
        
        const vaga = await Vaga.findById(id);

        if (vaga) {
            await vaga.remove();  

            res.json({ mensagem: 'Vaga removida com sucesso' });
        } else {
            res.status(404).json({ mensagem: 'Vaga não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao remover vaga', error });
    }
});

export default router;
