Router.route("/", function() {
  this.render('login');
});
Router.route("join");
Router.route("login");
Router.route("discuss");
Router.route("/dashboard", function() {
  this.layout("dashboard");
});
