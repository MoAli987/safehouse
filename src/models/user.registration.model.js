// const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Joi = require('joi');
const joigoose = require('joigoose')(mongoose);

// Database schema
const userRegistrationDBSchema = new mongoose.Schema({
    serviceType: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        // trim: true
    },
    statusProfile: {
        type: String,
        default: 0
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        default: "-"
        // trim: true
    },
    phone: {
        type: String,
        trim: true,
        default: "-"
    },
    about: {
        type: String,
        default: "-"
        // trim:true
    },
    image: {
        type: String,
        default: "-"
        // trim:true
    }

}, { timestamps: true });

// check validation of user model using joi
const userRegistrationJoiSchema = Joi.object({
    serviceType: Joi.string()
        .alphanum(),
    email: Joi.string().email({ tlds: { allow: false } }),
    name: Joi.string(),
    phone: Joi.string(),
    password: Joi.string()
        .alphanum()
        .min(8)
});

const userResitrationModel = new mongoose.model("User", userRegistrationDBSchema);
module.exports = { userResitrationDBSchema: userResitrationModel, userRegistrationJoiSchema: userRegistrationJoiSchema }