import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'College Management API',
        version: '1.0.0',
        description: 'API documentation for the College Management System',
      },
      servers: [
        {
          url: 'http://localhost:5000', // Change this to your server's URL if deployed
        },
      ],
    },
    // Path to the API specs
    apis: ['./routes/*.js'], // You can specify your routes directory here
  };
  
  // Initialize Swagger
  const swaggerDocs = swaggerJSDoc(swaggerOptions);
  
 export { swaggerDocs, swaggerUi };