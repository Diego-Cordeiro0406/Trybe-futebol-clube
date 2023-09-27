import { Router } from 'express';
import teamRouter from './team.router';
// import usersRouter from './users.routes';

const router = Router();

router.use('/teams', teamRouter);
// router.use('/users', usersRouter);

export default router;
