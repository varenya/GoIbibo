Template.dashboard.helpers({

  userName: function() {
    return Meteor.user().profile.name;
  }
});
