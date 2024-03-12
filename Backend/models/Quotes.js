const mongoose = require('mongoose');
const QuoteSchema=new mongoose.Schema({
     name:{
        type: 'string',
        trim:'true',
        required: true
     },
     quote:{
        type: 'string',
        trim:'true',
        required: true
     }
});
let Quote=mongoose.model('Quote',QuoteSchema);
module.exports = Quote;