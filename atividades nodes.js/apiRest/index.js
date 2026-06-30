import express from 'express';
import colecaoUf from './dados/dados.js';

const app = express();

app.get('/ufs', (req, res) => {
    res.json(colecaoUf);
});

app.get('/ufs/:iduf', (req, res) => {
    const idUF = parseInt(req.params.iduf);
    let mensagemErro = '';
    let uf;

    if (!(isNaN(idUF))) {
        uf = colecaoUf.find((uf) => uf.id === idUF)
        if (!uf) {
            mensagemErro = 'UF não encontrada';
        }
    } else {
        mensagemErro = 'requisição inválida';
    }

    if (uf) {
        res.json(uf);
    } else {
        res.status(404).send({"erro": mensagemErro});
    }
});
app.listen(8000, () => {
    console.log('Servidor rodando na porta 8000');
});
