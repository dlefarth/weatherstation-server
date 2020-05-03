import { Router } from 'express';
import { StationRoutes } from './StationRoutes';
import { MeasurementRoutes } from './MeasurementRoutes';
import { LoginRoutes } from './LoginRoutes';

const router: Router = Router();

router.use('/stations', StationRoutes);
router.use('/measurements', MeasurementRoutes);
router.use('/login', LoginRoutes);

export const MainRouter: Router = router;