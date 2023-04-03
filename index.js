const express = require('express');
const connectDB = require('./db/db')

connectDB();
const app = express();
app.use(express.json())

app.use('/api/user/', require('./routes/userRouter'))
app.use('/api/notes/', require('./routes/notesRouter'))

app.listen(8000, () => {
    console.log('Listening to port 8000');
})