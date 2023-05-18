const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const reviewRouter = require("./routers/review");

const app = express();
const port = process.env.PORT;

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET requests are disabled");
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   res.status(503).send("Site is undergoing Matenence, please come back later");
// });

app.use(express.json());
app.use(userRouter);
app.use(reviewRouter);

//
// No Middleware:  new request -> handler
//
// Yes Middleware: new request -> do a thing -> handler
//

app.listen(port, () => {
  console.log("server is up on port " + port);
});
