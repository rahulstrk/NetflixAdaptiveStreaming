import { Router } from "express";
import videoRouter from "./video.route";

const apiRouter = Router();

apiRouter.use('/v1/video', videoRouter);

export default apiRouter;
