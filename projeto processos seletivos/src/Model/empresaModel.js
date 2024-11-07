import mongoose from "mongoose";


const empresaSchema = new mongoose.Schema({
    nomeDaempresa: { type: String, required: true },
    cnpj: { type: String, required: true },
    cep: { type: String, required: true }
});


export default mongoose.model('Empresa', empresaSchema);