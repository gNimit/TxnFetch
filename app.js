const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');
const {getEthPrice} = require('./services/services');
require('dotenv').config();

const PORT = process.env.PORT || 4001;
const DB_USER = process.env.USER;
const DB_PASSWORD = process.env.PASSWORD;
const DB_HOST = process.env.HOST;

const app = express();
app.use(express.json());
app.use('/api', require('./routes/routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, () => {
    console.log(`Sever started and listening on port ${PORT}`);
})


mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(() => console.log("Connection to MongoDB Atlast successfully created."))
.catch(error => console.log(error))

getEthPrice();
