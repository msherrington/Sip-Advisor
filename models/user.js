const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  profileImage: { type: String },
  bio: { type: String },
  githubId: { type: String }
});

userSchema.virtual('profileImageSRC')
  .get(function getProfileImageSRC(){
    if(!this.profileImage) return null;
    if(this.profileImage.match(/^http/)) return this.profileImage;
    return `https://s3-eu-west-1.amazonaws.com/wdi25-london-project2/${this.profileImage}`;
  });

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

// lifecycle hook - mongoose middleware
userSchema.pre('validate', function checkPassword(next) {
  if(!this.password && !this.githubId) {
    this.invalidate('password', 'required');
  }
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
