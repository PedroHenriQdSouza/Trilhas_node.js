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
]

app.listen(3000, () => {
    console.log("Servidor rodando!");
})
app.get("/", (req, res) => {
    res.json(games);
})
app.post("/novogame", (req, res) => {
    let title = req.body.title;
    let studio = req.body.studio;
    let price = req.body.price;


    console.log(title);
    console.log(studio);
    console.log(price);

    let newGame = {title, studio, price };

    games.push(newGame);

    res.send("OK");
});
app.put('/novogame/:index',(req,res) =>{
    const {index} =req.params;
    let title = req.body.title;
    let studio = req.body.studio;
    let price = req.body.price;

    games[index] = { title, studio, price};

    return res.json (games);
})
app.delete("/:index", (req, res)=>{
    const {index} = req.params;
    games.splice(index, 1);
    return res.json({message: "O jogo foi deletado"});
})
