// const mongoose = require('mongoose');
//
// const drinkSchema = new mongoose.Schema({
//   filename: { type: String },
//   caption: { type: String }
// });
//
// drinkSchema.virtual('src')
//   .get(function getImageSRC(){
//     if(!this.filename) return null;
//     return `https://s3-eu-west-1.amazonaws.com/wdi25-london-project2/${this.filename}`;
//   });
//
// module.exports = mongoose.model('Drink', drinkSchema);
