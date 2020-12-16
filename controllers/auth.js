exports.getLogin = (req, res, next) => {
  const isAuthenticated = req.get("Cookie").split("=")[1] === "true";
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login Page",
    isAuthenticated: isAuthenticated,
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "isAuthenticated=true");
  res.redirect("/");
};
