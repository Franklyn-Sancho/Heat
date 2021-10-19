import {Router} from "express"
import { AuthenticateUserController } from "./controller/authenticateUserController";

const router = Router();

router.post('/authenticate', new AuthenticateUserController().handle);

export {router}