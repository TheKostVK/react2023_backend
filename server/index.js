import express from "express"
import mainRoute from "./routes/mainRoute.js";


const app = express();
const PORT = 3900;

app.use(mainRoute)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

