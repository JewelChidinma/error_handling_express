const express = require("express")
const fsPromises = require("fs").promises

const app = express()
const PORT = 5000

app.use(express.static("public"))
app.use(express.json())

app.get("/", (req, res) => {
    throw new Error("This is an error message")
})

app.get("/file", async (req, res, next) => {
    try {
        const file = await fsPromises.readFile("./no-such-file.txt")
        res.sendFile(file)
    } catch (error) {
        error.type = "Redirect"
        next(error)
    }
})

app.get("/text", async (req, res, next) => {
    try {
        const file = await fsPromises.readFile("./no-such-file.txt")
        res.sendFile(file)
    } catch (error) {
        error.type = "Not Found"
        next(error)
    }
})

app.get("/user", async (req, res, next) => {
    try {
        const file = await fsPromises.readFile("./no-such-file.txt")
        res.sendFile(file)
    } catch (error) {
        error.type = "Redirect"
        next(error)
    }
})

app.use((error, req, res, next) => {
    console.log("Error-handling middleware called")
    console.log("Path:", req.path)
    console.error("Error:", error)

    if (error.type = "Redirect")
        res.redirect("error.html")
    else if (error.type == "Not Found")
        res.status(404).send("error")
    else {
        res.status(500).send("error")
    }
    next()
})


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})