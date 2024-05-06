const express = require("express");
const imageApp = express();
const multer = require("multer");
const path = require("path");
const propertyModel = require("../models/property.model");
const _ = require("lodash");
const http = require('../services/app.http.service');
const fs = require("fs");
module.exports.addProperty = async (req, res) => {
    if (!req.body) {
        return res.status(200).send(
            {
                status: 200,
                message: "Empty Resquest Please Send Data.",
            }
        );
    }

    // check user validation 
    // const { error, value } = userModel.userRegistrationJoiSchema.validate(req.body);
    // if (error) return res.status(200).send({ status: 200, message: error.details });



    const storage = multer.diskStorage({
        destination: './upload/property',
        filename: (req, file, cb) => {
            return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        }
    })

    const upload = multer({
        storage: storage,
        // limits: {
        //     fileSize: 500000
        // },
        // fileFilter:fileFilter
    }).fields([{ name: 'propertyImgage' }]);
    const imageUploaded = upload(req, res, async function (err) {


        if (err) {
            // fs.unlinkSync(`./upload/profile/${req.files.image[0].filename}`);
            console.log(err);
            return res.status(400).send(
                {
                    status: 400,
                    message: "Image Uploading!",
                }
            );
        } else {



            // console.log(docCheck.imageFront)




            const arraydata = req.body;
            if (req.files.propertyImgage) {
                const len = req.files.propertyImgage.length
                console.log(len)
                const imageArray = [len]

                for (let i = 0; i < len; i++) {
                    imageArray[i] = req.files.propertyImgage[i].filename;
                }

                arraydata.propertyImgage = imageArray;
            }
            console.log(arraydata)
            const newDoc = new propertyModel.propertyDBSchema(arraydata)
            const data = await newDoc.save().then((result) => {
                return res.status(200).send(
                    {
                        status: 200,
                        message: "Porperty Upload Sucessfully",
                        data: result
                    }
                );

            }).catch((err) => {
                return res.status(200).send(
                    {
                        status: 200,
                        message: "Uploading Property issue",
                        error: err
                    }
                );
                console.log(err);
            });



            // console.log(req.body)

        }



    })

    // console.log(imageUploaded)

    function errHandler(err, req, res, next) {
        if (err instanceof multer.MulterError) {
            res.json({
                success: 0,
                message: err.message
            })
        }
    }
    imageApp.use(errHandler);
}

// Edit Function
module.exports.updateProperty = async (req, res) => {

    if (!req.body) {
        return res.status(200).send(
            {
                status: 200,
                message: "Empty Resquest Please Send Data.",
            }
        );
    }

    // check user validation 
    // const { error, value } = userModel.userRegistrationJoiSchema.validate(req.body);
    // if (error) return res.status(200).send({ status: 200, message: error.details });



    const storage = multer.diskStorage({
        destination: './upload/property',
        filename: (req, file, cb) => {
            return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        }
    })

    const upload = multer({
        storage: storage,
        // limits: {
        //     fileSize: 500000
        // },
        // fileFilter:fileFilter
    }).fields([{ name: 'propertyImgage' }]);
    const imageUploaded = upload(req, res, async function (err) {


        if (err) {
            // fs.unlinkSync(`./upload/profile/${req.files.image[0].filename}`);
            console.log(err);
            return res.status(400).send(
                {
                    status: 400,
                    message: "Image Uploading!",
                }
            );
        } else {



            // console.log(docCheck.imageFront)

            const userCheck = await propertyModel.propertyDBSchema.find({
                _id: req.body._id
            });
            // console.log(docCheck.imageFront)

            if (userCheck.length != 0) {


                const arraydata = req.body;
                if (req.files.propertyImgage) {
                    const len = req.files.propertyImgage.length
                    console.log(len)
                    const imageArray = [len]

                    for (let i = 0; i < len; i++) {
                        imageArray[i] = req.files.propertyImgage[i].filename;
                    }

                    arraydata.propertyImgage = imageArray;
                }

                const data = await propertyModel.propertyDBSchema.findByIdAndUpdate({
                    _id: req.body._id
                }, {
                    $set:
                        arraydata

                }, {
                    new: true
                }).then((result) => {
                    return res.status(200).send(
                        {
                            status: 200,
                            message: "Porperty update Sucessfully",
                           
                        }
                    );

                }).catch((err) => {
                    return res.status(200).send(
                        {
                            status: 200,
                            message: "Uploading Property issue",
                            error: err
                        }
                    );
                    console.log(err);
                });
            } else {
                // fs.unlinkSync(`./upload/profile/${req.files.image[0].filename}`);
                return res.status(400).send(
                    {
                        status: 400,
                        message: "Profile Document Not Found Record!",
                    }
                );
            }


            // console.log(req.body)

        }



    })

    // console.log(imageUploaded)

    function errHandler(err, req, res, next) {
        if (err instanceof multer.MulterError) {
            res.json({
                success: 0,
                message: err.message
            })
        }
    }
    imageApp.use(errHandler);
}

// View All Property functiom
module.exports.getAllProperties = (req, res) => {

    http.get(propertyModel.propertyDBSchema, res).then(result => {
        if (result)
            return res.status(200).send({ status: 200, message: "List of Properties.", data: result });
    });
}

// Delete Property fnction
module.exports.deleteProperty = async (req, res) => {
    console.log(req.params.id)
    const _id = req.params.id;
    const result = await propertyModel.propertyDBSchema.findByIdAndDelete(_id);
    console.log(result)
    if (result.length != 0) {
        return res.send({ status: 200, message: "Property Deleted Sucessfully.", id: req.params.id });
    } else {
        return res.status(404).send({ status: 404, message: "Record not found.", d: req.params.id });
    }
    // http.remove(propertyModel.propertyDBSchema, req, res).then(result => {
    //     if (result)
    //         return res.status(200).send({ status: 200, message: "Property Deleted Sucessfully.", resData: result });
    // });

}

// get property by id fnction
module.exports.getPropertyByID = async (req, res) => {
    const result = await propertyModel.propertyDBSchema.find({ _id: req.body._id }).populate([
        { path: "userID", select: ['name', 'about', 'image'] }]);
    if (result) {
        return res.status(200).send({ status: 200, data: result });
    } else {
        return res.status(404).send({ status: 404, message: "Record not found." });
    }
}
// get property by userid fnction
module.exports.getPropertyByUserID = async (req, res) => {
    const result = await propertyModel.propertyDBSchema.find({ userID: req.body.userID });
    console.log(result)
    if (result) {
        return res.status(200).send({ status: 200, data: result });
    } else {
        return res.status(404).send({ status: 404, message: "Record not found." });
    }
}

// random get record for home 
module.exports.getAllPropertiesRandom = async (req, res) => {


    const result = await propertyModel.propertyDBSchema.aggregate([{ $sample: { size: 3 } }])
    console.log(result)
    if (result) {
        return res.status(200).send({ status: 200, message: "List of Properties.", data: result });
    } else {
        return res.status(404).send({ status: 404, message: "Record not found." });
    }


}


//  get record for filter 
module.exports.getAllPropertiesFilter = async (req, res) => {

    console.log(req.query)
    const result = await propertyModel.propertyDBSchema.find(req.query)
    console.log(result)
    if (result) {
        return res.status(200).send({ status: 200, message: "List of Properties.", data: result });
    } else {
        return res.status(404).send({ status: 404, message: "Record not found." });
    }


}





