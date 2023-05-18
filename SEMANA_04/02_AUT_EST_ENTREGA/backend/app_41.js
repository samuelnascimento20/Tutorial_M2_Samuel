const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const DBPATH = '../data/Ponderada02.db';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

/* Colocar toda a parte estática no frontend */
app.use(express.static("../frontend/"));

/* Definição dos endpoints */
/******** CRUD ************/
app.use(express.json());

// Retorna todos registros (é o R do CRUD - Read)
app.get('/usuarios', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT * FROM pessoa ORDER BY id_pessoa COLLATE NOCASE';
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
        db.close(); // Fecha o banco
});

// Insere um registro (é o C do CRUD - Create)
app.post('/insereUsuario', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    sql = "INSERT INTO pessoa (primeiro_nome, número, telefone) VALUES ('" + req.body.primeiro_nome + "', '" + req.body.número + "', " + req.body.telefone + ")";
    console.log(sql);
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }	
    });
    res.write('<p>USUARIO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
    db.close(); // Fecha o banco
    res.end();
});

// Monta o formulário para o update (é o U do CRUD - Update)
app.get('/atualizaUsuario', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    sql = "SELECT * FROM pessoa WHERE id_pessoa="+ req.query.id_pessoa;
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

// Atualiza um registro (é o U do CRUD - Update)
app.post('/atualizaUsuario', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    sql = "UPDATE pessoa SET pessoa='" + req.body.nome + "', número = '" + req.body.número + "' , telefone='" + req.body.telefone + "' WHERE userId='" + req.body.userId + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    res.write('<p>USUARIO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
    db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
app.get('/removeUsuario', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    sql = "DELETE FROM pessoa WHERE id_pessoa='" + req.query.id_pessoa + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
        res.write('<p>USUARIO REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
        res.end();
    });
    db.close(); // Fecha o banco
});

app.listen(port, hostname, () => {
console.log(`Servidor rodando em http://${hostname}:${port}/`);
});
