const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const bodyParser = require("body-parser");

const midtransPayment = require("./routes/paymentRouters");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/v1/", midtransPayment);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
