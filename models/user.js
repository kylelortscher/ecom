var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    email: {type: String, unique: true, lowercase: true},
    password: String,

    profile: {
        name: { type: String, default: '' },
        picture: { type: String, default: '' }
    },

    address: String,

    history: [{
        date: Date,
        paid: { type: Number, default: 0}
    }]
});


//Hashing The Password Before We Save It To The Database
userSchema.pre('save', function(next){
    //this is referring to the UserSchema
    var user = this;

    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, sale){
        if(err) return next(err);
        bcrypt.hash(user.password, salt, null, function(err, hash){
           if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

//Comparing Password In The Database, and The One That Users Type In
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);