// Importar a biblioteca SQLite
const sqlite3 = require('sqlite3').verbose();

// Criar o banco de dados
const db = new sqlite3.Database(':memory:');

// Criar tabela 'moves' para armazenar as jogadas
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS moves (id INTEGER PRIMARY KEY, row INTEGER, col INTEGER, player TEXT)');
});

// Variáveis globais
let currentPlayer = 'X';
let gameEnded = false;

// Função chamada quando uma jogada é feita
function makeMove(row, col) {
  if (gameEnded) {
    alert('O jogo já terminou! Por favor, recarregue a página para jogar novamente.');
    return;
  }

  // Verificar se a célula já está ocupada
  const cell = document.getElementById(`cell-${row}-${col}`);
  if (cell.textContent !== '') {
    alert('Essa célula já está ocupada! Por favor, escolha outra.');
    return;
  }

  // Atualizar a tabela HTML
  cell.textContent = currentPlayer;

  // Salvar a jogada no banco de dados
  const stmt = db.prepare('INSERT INTO moves (row, col, player) VALUES (?, ?, ?)');
  stmt.run(row, col, currentPlayer);
  stmt.finalize();

  // Verificar se houve um vencedor
  if (checkWinner(currentPlayer)) {
    alert(`O jogador ${currentPlayer} venceu!`);
    gameEnded = true;
    return;
  }

  // Trocar o jogador atual
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Função para verificar se há um vencedor
function checkWinner(player) {
  // Lógica para verificar as combinações vencedoras
  // ...

  return false;
}
