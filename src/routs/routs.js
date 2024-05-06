const router = require("express").Router();

const { addUser, authUser } = require("../controller/user_RegistrationController");
const { updateProfile, getAllUser, forgotPassword } = require("../controller/userProfileController");
const { addProperty, getAllProperties, updateProperty, getPropertyByID, deleteProperty, getAllPropertiesRandom, getPropertyByUserID, getAllPropertiesFilter } = require("../controller/propertyController");


/***********User Routs*************/
// user authentication api route
router.route('/registration').post(addUser);
router.route('/login').post(authUser);

// user edit profile
router.route('/editprofile').post(updateProfile);
router.route('/forgotPassword').post(forgotPassword);
router.route('/userget').get(getAllUser);
/***********Property Routs*************/

router.route('/addProperty').post(addProperty);
router.route('/editProperty').patch(updateProperty);
router.route('/viewAllProperty').get(getAllProperties);
router.route('/viewPropertyRandom').get(getAllPropertiesRandom);
router.route('/deleteProperty/:id').delete(deleteProperty);
router.route('/getPropertyByID').post(getPropertyByID);
router.route('/getPropertyByUserID').post(getPropertyByUserID);
router.route('/getAllPropertiesFilter').get(getAllPropertiesFilter);

module.exports = router;