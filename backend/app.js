const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path'); 
const cors = require('cors')
// config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({path: 'backend/config/config.env'});
}

const errorMiddleware = require('./middleware/error');

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
const corsOptions = {
  origin: 'https://velvety-alpaca-1ae9db.netlify.app',
  // Additional options if needed
};
app.use(cors(corsOptions));


// route imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');


app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// changed for production level integration
app.use(express.static(path.join(__dirname, "../frontend/build")));
// commented for testing purposes
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "https://adorable-nasturtium-445742.netlify.app/"));
// });
// commented for testing purposes
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });
// middleware for error
app.use(errorMiddleware);




module.exports = app;