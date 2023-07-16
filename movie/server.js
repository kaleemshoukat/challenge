const app = require('./app');
const db = require('./config/db');

//DB connection
db.connectDB();

//set listener
const port = process.env.API_PORT;
app.listen(port || 3000, () => { console.log(`App running on port ${port}`) });