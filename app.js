const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const User = require("./models/user");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5fd77d1ed162570684472480")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://zake:Mu0QRhZn4yV5CJwN@cluster0.ecnox.mongodb.net/store?retryWrites=true&w=majority"
  )
  .then((res) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Zahid",
          email: "zahid.khan846@hotmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    console.log("[CONNECTED*] Listning at http://localhost:3000/");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
