import express from "express"
import { engine } from "express-handlebars"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import { pool } from './src/config/db.config'
import router from "./src/routes/users"

dotenv.config()
pool

const app = express()
const port = 5000

// Parsing middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

// Templating engines
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(router)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})





