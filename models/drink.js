const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
},{
  timestamps: true
});

commentSchema.methods.ownedBy = function ownedBy(user) {
  return this.createdBy.id === user.id;
};

const drinkSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  // location: { type: String, required: true },
  location: { type: String, required: true  },
  longitude: { type: Number },
  latitude: { type: Number },
  otherInfo: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [ commentSchema ]
});

drinkSchema.virtual('imageSRC')
  .get(function getImageSRC(){
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/wdi25-london-project2/${this.image}`;
  });

drinkSchema.methods.ownedBy = function ownedBy(user) {
  return this.createdBy.id === user.id;
};


module.exports = mongoose.model('Drink', drinkSchema);
