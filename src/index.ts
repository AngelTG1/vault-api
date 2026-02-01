import express from 'express';
import cors from 'cors';
import authRouter from './feature/auth/infrastructure/router/auth_router';
import userRouter from './feature/users/infrastructure/router/users_router';
import pginaLogRouter from './feature/pginalog/infrastructure/router/pginalog_router';
import './core/config';
import { connect, startBackgroundReconnect } from './core/db';
import healthRouter from './core/health_route';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/pginalog', pginaLogRouter);
app.use('/', healthRouter);

const port = process.env.PORT || 3000;

(async () => {
  try {
    await connect();
    console.log('Conectado a la base de datos');
  } catch (err: any) {
    console.error('Error al conectar a la base de datos:', err && err.message ? err.message : err);
    console.log('Iniciando reintentos en background, la aplicación permanecerá arriba y devolverá 503 en endpoints que requieran DB');
    startBackgroundReconnect();
  }

  app.listen(port, () => console.log(`Server listening on port ${port}`));
})();
