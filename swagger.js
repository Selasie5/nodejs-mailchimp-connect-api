const swaggerJsdoc= require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition:{
        openapi: "3.0.0",
        servers:[
            {
                url: "http://localhost:4000/"
            },
        ],
        info:
        {
            title: 'Afrovivo API',
            version: "1.0.0",
        },
    },
    apis: ['./*.js']
};

const specs = swaggerJsdoc(options);
module.exports = (app)=>
    {
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
    }