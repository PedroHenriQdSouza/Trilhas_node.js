const express = require("express");
const app = express();

app.use(express.json());

let games = [
    { title: "Monster Hunter World", studio: "Capcom", price: 30 },
    { title: "Monster Hunter Wilds", studio: "Capcom", price: 70 },
    { title: "Helldivers 2", studio: "Arrowhead Game Studios", price: 60 },
    { title: "Subnautica 2", studio: "Unknown Worlds Entertainment", price: 81 },
    { title: "Hollow Knight Silksong", studio: "Team Cherry", price: 20 },
    { title: "Terraria", studio: "Re-Logic", price: 40 },
];

/* Pesquisa */ 
const buscarGamesPorNome = (nomeGame) => {
    return games.filter(game =>
        game.title.toLowerCase().includes(nomeGame.toLowerCase())
    );
};

/* Listar ou pesquisar http://localhost:3000/?busca= */
app.get("/", (req, res) => {
    const nomeGame = req.query.busca;

    const resultado = nomeGame
        ? buscarGamesPorNome(nomeGame)
        : games;

    if (resultado.length > 0) {
        res.json(resultado);
    } else {
        res.status(404).json({ erro: "Jogo não encontrado." });
    }
});

/* Adicionar */
app.post("/novogame", (req, res) => {
    const { title, studio, price } = req.body;

    if (!title || !studio || price == null) {
        return res.status(400).json({
            erro: "Preencha os campos title, studio e price."
        });
    }

    games.push({ title, studio, price });

    res.status(201).json({
        mensagem: "Jogo cadastrado com sucesso!"
    });
});

/* Atualizar */
app.put("/novogame/:index", (req, res) => {
    const index = parseInt(req.params.index);

    if (isNaN(index) || index < 0 || index >= games.length) {
        return res.status(404).json({
            erro: "Índice inválido."
        });
    }

    const { title, studio, price } = req.body;

    if (!title || !studio || price == null) {
        return res.status(400).json({
            erro: "Preencha os campos title, studio e price."
        });
    }

    games[index] = { title, studio, price };

    res.json(games[index]);
});

/* Excluir */
app.delete("/:index", (req, res) => {
    const index = parseInt(req.params.index);

    if (isNaN(index) || index < 0 || index >= games.length) {
        return res.status(404).json({
            erro: "Índice inválido."
        });
    }

    games.splice(index, 1);

    res.json({
        mensagem: "Jogo removido com sucesso."
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");
});