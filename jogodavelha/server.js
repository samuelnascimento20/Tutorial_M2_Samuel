const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

// Criar o banco de dados e estabelecer a conexão
const db = new sqlite3.Database(':memory:'); // Use ':memory:' para criar um banco de dados em memória

// Criar tabela 'moves' para armazenar as jogadas
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS moves (id INTEGER PRIMARY KEY, row INTEGER, col INTEGER, player TEXT)');
});

// Configurar rota para obter as jogadas
app.get('/moves', (req, res) => {
  db.all('SELECT * FROM moves', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao obter as jogadas');
    } else {
      res.json(rows);
    }
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
