const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Router = require("./routers");
dotenv.config({ path: ".env" });
const app = express();

const dbURI = process.env.DATABASE;
const port = process.env.PORT || 5000;

// Allow requests from your frontend (Netlify domain)
app.use(cors({
  origin: 'https://lively-crostata-4c97cc.netlify.app', // replace this with your Netlify URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable if you need to send cookies with requests
}));

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(Router);
mongoose
  .connect(dbURI,{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then((result) => {
    app.listen(port);
    console.log("connected to mongodb and listening at port 5000");
  })
  .catch((err) => console.error(err));






if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
