require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const indexRoutes = require('./routes/index.routes')
const userRoute = require('./routes/user.routes');
const dogRoute = require('./routes/dog.routes');
const eventRoute = require('./routes/event.routes');
const authRoute = require("./routes/auth.routes");

require('./config')(app)
app.use(cors());
app.use('/api', indexRoutes)
app.use("/api/users", userRoute);
app.use("/api/dogs", dogRoute);
app.use("/api/events", eventRoute);
app.use("/auth", authRoute);

require('./error-handling')(app)

module.exports = app
