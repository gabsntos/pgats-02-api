const { transfers } = require('../model/transferModel');
const { users } = require('../model/userModel');

function transfer({ from, to, value }) {
  if (!from || !to || typeof value !== 'number') {
    throw new Error('From, to, and value are required');
  }
  const sender = users.find(u => u.username === from);
  const recipient = users.find(u => u.username === to);
  if (!sender || !recipient) {
    throw new Error('Sender or recipient does not exist');
  }
  if (sender.saldo < value) throw new Error('Saldo insuficiente');
  if (!recipient.favorecido && value >= 5000) {
    throw new Error('Transfer above R$ 5.000,00 only allowed to favorecido recipients');
  }
  const transfer = { from, to, value, date: new Date() };
  transfers.push(transfer);
  return transfer;
}

module.exports = { transfer };
