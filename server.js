const express = require("express");
const sql = require("./app/models/db");
const app = express();

//parser request content-type : application/json
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
    response.json({"message" : "welcome to Bezkoder Application"})
});

const customerRoute = require("./app/routes/customer.routes")(app);

process.once('SIGTERM', () => {
  console.log('Received SIGTERM');
  shutdown();
});

process.once('SIGINT', () => {
  console.log('Received SIGINT');
  shutdown();
});

process.once('uncaughtException', err => {
  console.log('Uncaught exception');
  console.error(err);
  shutdown(err);
});

async function shutdown(e) {
  let err = e;
  console.log('Shutting down application');
  app.close;
  try {
    console.log('Closing database module');
    sql.end();
  } catch (e) {
    console.error(e);
    err = err || e;
  }
  console.log('Exiting process');
  process.exit();
}

app.listen(3000, () => {
    console.log("Server is running on port 3000.")
})