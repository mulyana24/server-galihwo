const isSignIn = (req, res, next) => {
  if (req.session.user == null || req.session.user == undefined) {
    req.flash("alertMessage", "Session is expired !!");
    req.flash("alertStatus", "danger");
    res.redirect("/admin/login");
  } else {
    next();
  }
};

module.exports = isSignIn;
