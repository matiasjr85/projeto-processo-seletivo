import moongose from "mongoose"

const conecxaoDB  = async () => {
    try {
        await moongose.connect('mongodb+srv://Edmilson:1234@cluster0.d90pb.mongodb.net/Bancovagas')
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    }
}

export default conecxaoDB;
