import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import markersRouter from "./api/v1/markersRouter.js"
import userMarkersRouter from "./api/v1/userMarkersRouter.js"
import markerLikesRouter from "./api/v1/markerLikesRouter.js"

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter); 
rootRouter.use("/api/v1/markers", markersRouter);
rootRouter.use("/api/v1/user-markers", userMarkersRouter);
rootRouter.use("/api/v1/markers/likes", markerLikesRouter);

export default rootRouter;
