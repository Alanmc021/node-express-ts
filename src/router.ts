import { Router } from "express";
import { firstController } from "./app/controller/FirstController";
import { coinApiController } from "./app/controller/CoinApiController";

const router: Router = Router();

//Routes
router.get("/", firstController.home);
router.get("/coin", coinApiController.coin);

export { router };
