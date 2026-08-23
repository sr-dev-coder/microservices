import * as authService from "./auth.services.js"
import ApiResponse from "../../common/utils/api-response.js"

const register = async (req, res) =>{
    const user = await authService.register(req.body)
    ApiResponse.ok(res, "User has been created Successfully.", user)
}   

export {
    register
}