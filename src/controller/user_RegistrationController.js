const userModel = require("../models/user.registration.model");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const http = require('../services/app.http.service');
const jwt = require("jsonwebtoken");

module.exports.addUser = async (req, res) => {
    // Joi validation

    // check user validation 
    const { error, value } = userModel.userRegistrationJoiSchema.validate(req.body);
    if (error) return res.status(200).send({ status: 200, message: error.details });

    // check user already exist or not
    let _user = await userModel.userResitrationDBSchema.findOne(_.pick(req.body, ["email"]));
    if (_user) return res.status(400).send({ status: 200, message: "User  already registered." });

    const user = new userModel.userResitrationDBSchema(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // if we need to send back token use this funtion
    // const token = user.generateAuthToken();
    // console.log(token)
    
    const result = await user.save().then(() => {
        return res.status(200).send(
            {
                status: 200,
                message: "User Registered Sucessfully.",
            }
        );
    }).catch((err) => {
        return res.status(400).send(
            {
                status: 400,
                message: err.toString(),
            }
        );
    });
};


// View All Property functiom
module.exports.authUser = async(req, res) => {

    http.getByEmail(userModel.userResitrationDBSchema, req, res).then(async (result) => {
        returnObj = {
            status: '',
            token: '',
            message: '',
            data:''
        }
        if (result !== null) {
            // const passwordMatch = req.body.password.localeCompare(result.password)
            const validUser=await bcrypt.compare(req.body.password,result.password);
            if (validUser) {
                  // Generate a JSON Web Token (JWT) for authentication
                  const token = jwt.sign({ userId: result._id, email: result.email }, 'secret_key', { expiresIn: '1h' });
                  returnObj.status = "200";
                  returnObj.token = token;
                  returnObj.message="Login",
                  returnObj.data=result
               
            } else {
                returnObj.status = "401";
                returnObj.message = "Invalid password";
            }
        } else {
            returnObj.status = "401";
            returnObj.message = "Invalid credentials.";
        }
        return res.status(200).send({ data: returnObj });
    });
}

