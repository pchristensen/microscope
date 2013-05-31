Template.postItem.helpers({
    ownPost: function() {
        // alert(this.userId);
        // alert(Meteor.userId());
        return this.userId == Meteor.userId();
    },
    domain: function() {
        var a = document.createElement('a');
        a.href = this.url;
        return a.hostname;
    }
});