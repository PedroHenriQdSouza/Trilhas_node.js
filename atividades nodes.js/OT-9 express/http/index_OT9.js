import express from 'express';

const app = express();



app.get('/', (req, res) =>
    res.send('<h3>Rotaaaas no Express</h3><p>rota "/"')
);

app.get('/sobre', (req, res) =>
    res.send('<h1>Rotas no Express</h1><br><p>rota sobre')
);
app.get('/user/:name', (req, res) =>
    res.send('usuário:' + req.params.name)
);

var carros = ['fiesta', 'saveiro'];
app.use(express.urlencoded({ extended: true }));


app.post('/carros/', (req, res) => {
    let name = req.body.name;
    carros[(carros.length)] = name;
    return res.json([carros[(carros.length - 1)]]);
});

app.get('/carros/:id', (req, res) => {
    let id = req.params.id;
    return res.json([carros[id]])
});

app.put('/carros/update/:id', (req,res) =>{
    let name = req.body.name;
    carros[req.params.id] = name;
    return res.json(carros[req.params.id]);
});

app.delete('/carros/delete/:id', (req, res) => {
    let id = req.params.id;
    carros[id] = null;
    return res.json(carros[id]);
}); 

app.listen(3000, () =>
    console.log('Servidor iniciado na porta 3000')
);

