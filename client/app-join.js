var ERRORS_KEY = 'joinErrors';

Template.join.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});

Template.join.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.join.events({
  'submit': function(event, template) {
    event.preventDefault();
    var email = template.$('[name=email]').val();
    var password = template.$('[name=password]').val();
    var confirm = template.$('[name=confirm]').val();
    var name = template.$('[name=user_name]').val();

    var errors = {};
    var profile = {};

    if (!email) {
      errors.email = 'Email required';
    }

    if (!password) {
      errors.password = 'Password required';
    }
    if (!name) {
      errors.password = 'Name required';
    }

    if (confirm !== password) {
      errors.confirm = 'Please confirm your password';
    }

    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }

    profile.name = name;

    Accounts.createUser({
      email: email,
      password: password,
      profile: profile
    }, function(error) {
      if (error) {
        return Session.set(ERRORS_KEY, {
          'none': error.reason
        });
      } else {
        Router.go('dashboard');
      }

    });
  }
});
