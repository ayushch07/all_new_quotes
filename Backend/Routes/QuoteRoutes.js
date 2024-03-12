const express = require('express');
const Quote = require('../models/Quotes');
const router = express.Router();

router.get('/quotes', async (req, res) => {
  try {
    const quotes = await Quote.find({});
    res.status(200).json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedQuote = await Quote.findByIdAndDelete(id);

    if (!deletedQuote) {
      return res.status(404).json({ error: 'Quote not found' });
    }

    res.status(200).json({ message: 'Quote deleted' });
  } catch (error) {
    console.error('Error deleting quote:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.patch('/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { quote } = req.body;
      // Assuming the quote object contains the updated data
      // Update the document with the new quote data
      console.log(quote);
      await Quote.findByIdAndUpdate(id, {quote});
      // Respond with the updated quote
      res.status(200).json({ message: 'Quote is updated'});
    } catch (error) {
      console.error('Error updating quote:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.post('/new', async (req, res) => {
    try {
      const {name, quote } = req.body;
      // Assuming your Quote model has a schema with 'author' and 'quote' fields
      const newQuote = await Quote.create({name, quote });
  
      res.status(200).json({ message: 'New Quote Created', newQuote });
    } catch (error) {
      console.error('Error creating quote:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router;
