const express = require("express");
const router = express.Router();
const { createPaymentIntent } = require("../controllers/paymentController");

router.route("/payment").post(createPaymentIntent);

module.exports = router;
