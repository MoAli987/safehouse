const express = require("express");
const imageApp = express();
const multer = require("multer");
const path = require("path");
const userModel = require("../models/user.registration.model");
const fs = require("fs");
const bcrypt = require("bcrypt");
module.exports.updateProfile = async (req, res) => {
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
        destination: './upload/profile',
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
    }).fields([{ name: 'image' }]);
    const imageUploaded = upload(req, res, async function (err) {


        if (err) {
            // fs.unlinkSync(`./upload/profile/${req.files.image[0].filename}`);
            console.log(err);
        } else {


            const userCheck = await userModel.userResitrationDBSchema.find({
                _id: req.body.user_id
            });
            // console.log(docCheck.imageFront)

            if (userCheck.length != 0) {

                console.log("test case 1")
                // if (userCheck[0].image != "-") {
                //     fs.unlinkSync(`./upload/profile/${userCheck[0].image}`);
                // }

                const arraydata = req.body;
              if(req.files.image){
                arraydata.image = req.files.image[0].filename;
              }
                console.log(arraydata)
                const data = await userModel.userResitrationDBSchema.findByIdAndUpdate({
                    _id: req.body.user_id
                }, {
                    $set:
                        arraydata

                }, {
                    new: true
                }).then((result) => {
                    return res.status(200).send(
                        {
                            status: 200,
                            message: "Update Profile Sucessfully",
                            data:result
                        }
                    );

                }).catch((err) => {
                    return res.status(200).send(
                        {
                            status: 200,
                            message: "Update Profile issue",
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


module.exports.getAllUser = async (req, res) => {
    try {
        const data = await userModel.userResitrationDBSchema.find();
        return res.status(200).send(
            {
                status: 200,
                message: "User list Data.",
                data: data
            }
        );
    } catch (err) {
        console.log(err)
    }
}



// forgotPassword Function 

module.exports.forgotPassword = async (req, res) => {
    if (!req.body) {
        return res.status(200).send(
            {
                status: 200,
                message: "Empty Resquest Please Send Data.",
            }
        );
    }
    const userCheck = await userModel.userResitrationDBSchema.find({
        _id: req.body._id
    });

    if (userCheck.length != 0) {
        const salt = await bcrypt.genSalt(10);
        const passwordUpdate = await bcrypt.hash(req.body.userPassword, salt);

        const data = await userModel.userResitrationDBSchema.updateOne({
            _id: req.body._id
        }, {
            $set: {
                password: passwordUpdate
            }
        }, {
            new: true
        }).then(() => {
            return res.status(200).send(
                {
                    status: 200,
                    message: "Password Change Sucessfully",
                }
            );

        }).catch((err) => {
            console.log(err);
        });


        // console.log(data)

    } else {
        return res.status(400).send(
            {
                status: 400,
                message: "User Email Incorrect!",
            }
        );
    }


}
