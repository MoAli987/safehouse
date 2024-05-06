const mongoose = require("mongoose");
const Joi = require('joi');
const joigoose = require('joigoose')(mongoose);

// Database schema
const propertyDBSchema = new mongoose.Schema({
    userID: { type: String, required: true, trim: true, ref:'User'},
    ownerName: { type: String, required: true, trim: true },
    ownerEmail: { type: String, required: true, trim: true },
    ownerPhone: { type: String, required: true, trim: true },
    propertyName: { type: String, required: true, trim: true },
    bedRoom: { type: String, required: true, trim: true },
    bathRoom: { type: String, required: true, trim: true },
    areaSquareFeet: { type: String, required: true, trim: true },
    propertyAdditionalInformation: { type: String, required: true, trim: true },
    propertyDescription: { type: String, required: true, trim: true },
    propertyPrice: { type: Number, required: true, trim: true },
    propertyCity: { type: String, required: true, trim: true },
    propertyState: { type: String, required: true, trim: true },
    propertyAddress: { type: String, required: true, trim: true },
    propertyLatitude: { type: String, required: true, trim: true },
    propertyLongitude: { type: String, required: true, trim: true },
    postalCode: { type: Number, required: true, trim: true },
    typefor: { type: String, required: true, trim: true },
    propertyStatus: { type: String, required: true, trim: true, },
    propertyImgage: { type: Array, required: true, trim: true },
    // createdDate: { type: String, required: true, trim: true },
    // updatedDate: { type: String, required: true, trim: true },
}, { timestamps: true });


// check validation of user model using joi
const propertyJoiSchema = Joi.object({
    userID: Joi.string().alphanum(),
    ownerEmail: Joi.string().email({ tlds: { allow: false } }).required(),
    ownerName: Joi.string().required(),
    ownerPhone: Joi.string().required(),
    propertyName: Joi.string().required(),
    bedRoom: Joi.string().required(),
    bathRoom: Joi.string().required(),
    areaSquareFeet: Joi.string().required(),
    propertyAdditionalInformation: Joi.string().required(),
    propertyDescription: Joi.string().required(),
    propertyPrice: Joi.number().required(),
    propertyCity: Joi.string().required(),
    propertyState: Joi.string().required(),
    propertyAddress: Joi.string().required(),
    propertyLatitude: Joi.string().required(),
    propertyLongitude: Joi.string().required(),
    postalCode: Joi.number().required(),
    typefor: Joi.string().required(),
    propertyStatus: Joi.string().required(),
    propertyImgage: Joi.array().required(),
    // typefor: Joi.string().required(),
    // createdDate: Joi.string().required(),
    // uodatedDate: Joi.string().required()
});

const propertyModel = new mongoose.model("Property", propertyDBSchema);
module.exports = { propertyDBSchema: propertyModel, propertyJoiSchema: propertyJoiSchema}