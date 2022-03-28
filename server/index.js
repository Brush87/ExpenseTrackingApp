import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
// TIL, when using the ESM loader you need to add the file type others ERR_MODULE_NOT_FOUND
import expenseRoutes from './routes/expenses.js'

const app = express()

app.use(bodyParser.json({ limit: '1mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }))
app.use(cors())

app.use('/expense', expenseRoutes)

// Did not secure credientials -- This would not occur in live in Prod app
const CONN_URL = 'mongodb+srv://huotdyanmicly:BKNTEcRTXcugZixr@huotdynamiclycluster.3dlzi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.port || 5000

mongoose.connect(CONN_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.error(err.message))