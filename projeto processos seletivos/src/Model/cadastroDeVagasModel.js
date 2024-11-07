import mongoose from "mongoose";


const vagaSchema = new mongoose.Schema({
    nomeDaVaga: { type: String, required: true },
    modalidadeDeTrabalho: { type: String, required: true },
    empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true }  // Referência para o modelo Empresa
});

export default mongoose.model('Vaga', vagaSchema);
