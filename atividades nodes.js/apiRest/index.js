import express from 'express';
import colecaoUf from './dados/dados.js';

const app = express ();

app.get('/ufs', (req, res) => {
    res.json(colecaoUf);
});

app.get('/ufs/:iduf', (req, res) =>{
    const iduf = parseInt(req.params.iduf);
    const uf = colecaoUf.find((uf) => uf.id === iduf);
    
    if (uf){
        res.json(uf);       
    }else{
        res.status(404).send();
    }

    res.json(uf)
});
app.listen(8000, () => {
    console.log('Servidor rodando na porta 8000');
});
