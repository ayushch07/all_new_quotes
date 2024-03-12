const mongoose = require('mongoose');
const Quote=require('./models/Quotes');
const data = [
    {name: 'Alan Kay',
     quote: 'The best way to predict the future is to invent it.' },
    {name: 'Leonardo da Vinci' , quote: 'Simplicity is the ultimate sophistication.',},
    {name: 'Leonardo da Vinci' ,
    quote: 'Simplicity is the ultimate sophistication.'}
  ];
  const seedData = async () =>{
    await Quote.insertMany(data);
    console.log("Data seeded successfully");
  } 
  module.exports =seedData;
