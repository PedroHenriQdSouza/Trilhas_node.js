const express = require('express');
const path = require('path');
const app = express();

app.engine('html', require ('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public',express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname,'/views'));

let tasks = ['Sair de casa','Comprar pão','Estudar Node.js'];

app.get('/', (req,res)=>{
    res.render('index',{taskList: tasks});
});

app.listen(3306,()=>{
    console.log('Servidor rodando em http://localhost:3306');
})