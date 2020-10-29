const Card = require('../models/card');

const createCard = async (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  try {
    const newCard = await Card.create({ _id, name, link });
    return res.status(200).send(newCard);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send(error.message);
    }
    return res.status(500).send(error);
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);
    if (!card) {
      res.status(404).send(`Карточка для удаления ${req.params.cardId} не найдена`);
    }
    res.status(200).send(`Карточка "${card.name}" была удалена вами`);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { createCard, deleteCard, getCards };
