const Transaction = require('../models/Transaction');

// @desc    Get all transactions for logged in user
// @route   GET /api/transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json({ success: true, count: transactions.length, data: transactions });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Add transaction
// @route   POST /api/transactions
exports.addTransaction = async (req, res) => {
  try {
    const { text, amount, type, category, date } = req.body;
    const transaction = await Transaction.create({
      user: req.user.id,
      text,
      amount: Number(amount),
      type,
      category,
      date
    });
    res.status(201).json({ success: true, data: transaction });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      res.status(400).json({ success: false, message: messages });
    } else {
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ success: false, message: 'No transaction found' });
    }

    // Check if user owns the transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not Authorized' });
    }

    await transaction.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};