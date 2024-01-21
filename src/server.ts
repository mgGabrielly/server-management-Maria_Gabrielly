import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import customerRouter from './routes/customer.routes';
import tagRouter from './routes/tag.routes';
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocs from './swagger.json';

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// Helmet to configure security headers
app.use(helmet());

// Allow all origins (development only)
app.use(cors());

// // Swagger
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api', customerRouter);
app.use('/api', tagRouter);

app.get('/', (req, res) => {
    res.send('Hello guys!');
});

// Default response to other requests
app.use((req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.status(200).send({
      message: "Connected"
    });
});

// Listen to the App
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

export default app;