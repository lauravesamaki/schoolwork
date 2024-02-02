const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [5, 'Password must be at least 5 characters long'],
    },
});

userSchema.pre('save', async function(next) {
    const saltRounds = parseInt(process.env.SALT);
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});

userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({username});

    if (user) {
        const auth = await bcrypt.compare(password, user.password);

        if (auth) {
            return user;
        }
        else {
            throw new Error('Incorrect password or username');
        }
    }
    else {
        throw new Error('Incorrect password or username');
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;