/* Atividade
Criar seu Array de lista de carros personalizados com no
mínimo 6 modelos com nome, preço e marca e depois
adicionar mais 3 modelos diferentes dos que já existem e
realizar edição em 2 modelos e exclusão de pelo menos 2
modelos. */

import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Array inicial com 6 carros
let carros = [
    { nome: "Fiesta", preco: 129000, marca: "Ford" },
    { nome: "Gol", preco: 29000, marca: "Vokwagem" },
    { nome: "Civic", preco: 229000, marca: "Ronda" },
    { nome: "Corolla", preco: 196000, marca: "Totoya" },
    { nome: "Onix", preco: 49000, marca: "Chevrolet" },
    { nome: "HB20", preco: 12500, marca: "Hyundai" }
];

// Rota inicial
app.get('/', (req, res) => {
    res.send('<h3>Rotas no Express</h3><p>Rota "/"</p>');
});

// Sobre
app.get('/sobre', (req, res) => {
    res.send('<h1>Rotas no Express</h1><p>Rota /sobre</p>');
});

// Usuário
app.get('/user/:name', (req, res) => {
    res.send(`Usuário: ${req.params.name}`);
});

// Listar todos os carros
app.get('/carros', (req, res) => {
    res.json(carros);
});

// Buscar carro por índice
app.get('/carros/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (id < 0 || id >= carros.length) {
        return res.status(404).json({ mensagem: "Carro não encontrado" });
    }

    res.json(carros[id]);
});

// Adicionar carro
app.post('/carros', (req, res) => {
    const { nome, preco, marca } = req.body;

    const novoCarro = { nome, preco, marca };

    carros.push(novoCarro);

    res.status(201).json(novoCarro);
});

// Editar carro
app.put('/carros/update/:index', (req, res) => {
    const index = parseInt(req.params.index);

    if (index < 0 || index >= carros.length) {
        return res.status(404).json({ mensagem: "Carro não encontrado" });
    }

    const { nome, preco, marca } = req.body;

    carros[index] = { nome, preco, marca };

    res.json(carros[index]);
});

// Excluir carro
app.delete('/carros/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (id < 0 || id >= carros.length) {
        return res.status(404).json({ mensagem: "Carro não encontrado" });
    }

    const removido = carros.splice(id, 1);

    res.json({
        mensagem: "Carro removido com sucesso",
        carro: removido[0]
    });
});

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});