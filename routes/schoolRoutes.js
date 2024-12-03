import express from 'express';
import { addSchoolHandler, listSchoolsHandler } from '../controllers/schoolController.js';
import { validateSchoolData } from '../middlewares/validation.js';

const router = express.Router();

router.post('/addSchool', validateSchoolData, addSchoolHandler);
router.get('/listSchools', listSchoolsHandler);

export default router;
