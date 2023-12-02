const mongoose = require('mongoose');
const schema = mongoose.Schema;

const crypto = require("crypto");
const debug = require("debug")("app:user-model");

const UserSchema = new schema({
    name: {
        type: String,
        trim: true, 
        required: true
    },
    lastName: {
        type: String, 
        trim: true, 
        required: true
    }, 
    email: {
        type: String, 
        trim: true, 
        required: true,
        unique: true,
        lowercase: true
    },
    image: {
        type: String, 
        required: true
    },
    stars: {
        type: Number, 
        trim: true, 
        default: 0.0
    },
    hashPassword: {
        type: String, 
        trim: true, 
        required: true,
    },
    salt: {
        type: String
    },
    tokens: {
       type: [String],
       default: []
    }
}, { timestamps: true });

UserSchema.methods = {
    encryptPassword: function (password) {
        if(!password) {
            return "";
        } 

        try {
            //Encriptacion de contrasena
            const _password = crypto.pbkdf2Sync(
                password,
                this.salt,
                1000, 64,
                `sha512`
            ).toString("hex");

            return _password;
        } catch (error) {
            debug({error});
            return "";
        }
    },

    makeSalt: function() {
        return crypto.randomBytes(16).toString("hex");
    },

    comparePassword: function(password) {
        return this.hashPassword === this.encryptPassword(password);
    }
}

UserSchema
    .virtual("password")
    .set(function(password = crypto.randomBytes(16).toString()) {
        this.salt = this.makeSalt();
        this.hashPassword = this.encryptPassword(password);
    });

module.exports = mongoose.model("User", UserSchema);