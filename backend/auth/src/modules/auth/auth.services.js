import bcrypt from "bcryptjs"
import ApiError from "../../common/utils/api-error.js"
import User from "./auth.model.js"
import { generateAccessToken, generateRefreshToken } from "../../common/utils/jwt.utils.js"
 
const register = async ({ name, email, password }) =>{
    const existing = await User.findOne({ email })

    if(existing){
        throw ApiError.conflict("User already exists with the same email address")
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        email,
        password: passwordHash
    })

    const userObj = user.toObject()
    delete userObj.password

    return userObj
} 

const login = async ({ email, password }) =>{
    const user = await User.findOne({ email }).select("+password")

    if(!user){
        throw ApiError.notFound("User email and password are invalid.")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
         throw ApiError.notFound("User email and password are invalid.")
    }

    const accessToken = generateAccessToken({ sub: user._id.toString() })
    const refreshToken = generateRefreshToken({ sub: user._id.toString() })

    user.refreshToken = refreshToken

    await user.save({ validateBeforeSave: false })

    const userObj = user.toObject()
    delete userObj.password
    delete userObj.refreshToken

    return {
    user: userObj,
    accessToken,
    refreshToken
};
}

export {
    register,
    login
}