import express from "express";
import routes from "./routes/index.js";
import loggerMiddleware from './middlewares/logger.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

app.use('/api', routes);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
