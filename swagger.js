import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Stamina API',
      description: "API documentation for the backend infrastructure of Stamina",
      contact: {
        name: "Stamina",
        email: "desmond@mystamina.co",
        url: "https://api.mystamina.co"
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:5000/",
        description: "Local server"
      },
      {
        url: "https://api.stamina.com/",
        description: "Live server"
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      bearerAuth: []
    }],
  },
  // looks for configuration in specified directories
  apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)

function swaggerDocs(app, port) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}

export default swaggerDocs