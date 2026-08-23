import jwt from "jsonwebtoken"

const generateAccessToken = (payload) =>{
    return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET,{
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES
    })
}

const generateRefreshToken = (payload) =>{
    return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET,{
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES
    })
}

const verifyAccessToken = (token) =>{
    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)
}

const verifyRefreshToken = (token) =>{
    return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET)
}

export {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}