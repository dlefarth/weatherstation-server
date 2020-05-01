import { Router } from 'express';
import { StationRoutes } from './StationRoutes';
import { MeasurementRoutes } from './MeasurementRoutes';

const router: Router = Router();

router.use('/stations', StationRoutes);
router.use('/measurements', MeasurementRoutes);

export const MainRouter: Router = router;