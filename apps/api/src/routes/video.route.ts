import { Router } from "express";
import { uploadVideoController, getVideoStatusController, listVideosController } from "../controllers/video.controller";
import { uploadMiddleware } from "../middlewares/upload.middleware";
const videoRouter = Router();

videoRouter.post('/upload', uploadMiddleware.single('video'), uploadVideoController );
videoRouter.get('/status/:videoId', getVideoStatusController);
videoRouter.get('/list', listVideosController);

export default videoRouter;