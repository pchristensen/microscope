Meteor.errors = new Meteor.Collection(null);

Meteor.Errors = {
    throw: function(message, code) {
        Meteor.errors.insert({ message: message, code: code, seen: false });
    },
    clear: function() {
        Meteor.errors.remove({ seen: true });
    }
};