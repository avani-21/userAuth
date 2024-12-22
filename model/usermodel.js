const mongoose=require('mongoose');

const user=new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long']
    }
});

const userSchema = mongoose.model('userSchema', user);
module.exports=userSchema
