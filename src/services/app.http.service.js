// get all records
async function get(model, response) {
    try {
        const result = await model.find();
        if (result) {
            return result;
        } else {
            return response.status(404).send({ status: 404, message: "Record not found." });
        }
    } catch (err) {
        return response.status(500).send(
            {
                status: 500,
                message: err.toString(),
            }
        );
    }
}
// save new record
async function save(model, response) {
    try {
        var result = await model.save();
        if (result) {
            return { status: 200, message: "Data saved Sucessfully.", }
        } else {
            return response.status(400).send(
                {
                    status: 400,
                    message: err.toString(),
                }
            );
        }
    } catch (err) {
        return response.status(500).send(
            {
                status: 500,
                message: err.toString(),
            }
        );
    }
}
// update record
async function put(model, req, response) {
    try {
        const result = await model.findByIdAndUpdate(req.body._id, req.body, { new: true })
        if (result) {
            return { status: 200, message: "Record updated.", };
        } else {

            return response.status(404).send({ status: 404, message: "Record not found." });
        }
    } catch (err) {
        return response.status(500).send(
            {
                status: 500,
                message: err.toString(),
            }
        );
    }
}
// delete record
async function remove(model, req, response) {
    try {
        const _id = req.params._id;
        const result = model.findByIdAndDelete(_id);
        if (result) {
            return { status: 200, message: "Record deleted Sucessfully.", id: _id };
        } else {
            return response.status(404).send({ status: 404, message: "Record not found." });
        }
    } catch (err) {
        return response.status(500).send(
            {
                status: 500,
                message: err.toString(),
            }
        );
    }
}
// get by id record
async function getByID(model, req, response) {
    try {
        const _id = req.body._id;
        const result = await model.findById(_id);
        if (result) {
            return { status: 200, data: result, };
        } else {
            return response.status(404).send({ status: 404, message: "Record not found." });
        }
    } catch (err) {
        return response.status(500).send(
            {
                status: 500,
                message: err.toString(),
            }
        );
    }
}

// get records by email
async function getByEmail(model, req, response) {
    try {
        const email = req.body.email;
        const result = await model.findOne({ email });
        //if (result) {
        return result;
        // } else {
        //     return response.status(404).json({ status: 404, message: "Invalid credentials." });
        // }
    } catch (err) {
        return response.status(500).send(
            {
                status: 500,
                message: err.toString(),
            }
        );
    }
}

module.exports = { get, save, put, remove, getByID, getByEmail };