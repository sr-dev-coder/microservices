import "dotenv/config"
import app from "./src/app.js"

const PORT = process.env.PORT || 4000

const start = async () =>{
    await connectdb();

    app.listen(PORT, () =>{
        console.log(`Server is running on the port: ${PORT} in dev envirnmonet`)
    })
}

start().catch((err) =>{
    console.error(`Failed to connect Server the error is: ${err}`)
    process.exit(1)
})