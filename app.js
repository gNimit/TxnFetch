const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');
const {getEthPrice} = require('./services/services');

const PORT = config.get('app.port') || 4001;
const DB_USER = config.get('db.user');
const DB_PASSWORD = config.get('db.password');
const DB_HOST = config.get('db.host')

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
