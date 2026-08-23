import { Router } from "./auth.controller.js"
import validate from "../../common/middelware/validate.middelware.js"
import RegisterDto from "./dto/register.dto.js"
import * as authController from "./auth.controller.js"

const router = Router()

router("/register", validate(RegisterDto), authController.register)

export default router