import express from 'express';
import routes from './routes';
import routesProduct from './routes/product.routes'
import cors from 'cors'
const app = express();
app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use('/api', routesProduct);

export default app;
