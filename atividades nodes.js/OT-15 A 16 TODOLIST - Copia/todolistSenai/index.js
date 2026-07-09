const express = require('express');
var bodyParser = require('body-parser')
const path = require('path');
const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

let tasks = ['Sair de casa', 'Comprar pão', 'Estudar Node.js'];

app.post('/', (req, res) => {
    tasks.push(req.body.task);
    res.redirect('/');
});
app.get('/', (req, res) => {
    res.render('index', { taskList: tasks });
});

app.get('/deletar/:id', (req, res) => {
    tasks = tasks.filter((_, index) => index != req.params.id);
    res.redirect('/');
});
app.listen(3306, () => {
    console.log('Servidor rodando em http://localhost:3306');
})