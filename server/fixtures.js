if (Posts.find().count() === 0) {
    var now = new Date().getTime();

    var billId = Meteor.users.insert({
        profile: { name: "Bill S. Preseton, Esq" }
    });
    var bill = Meteor.users.findOne(billId);

    var tedId = Meteor.users.insert({
        profile: { name: "Ted Theodore Logan" }
    });
    var ted = Meteor.users.findOne(tedId);

    var telescopeId = Posts.insert({
        title : "Introducing Telescope",
        userId: bill._id,
        author: bill.profile.name,
        url   : "http://sachagreif.com/introducing-telescope/",
        commentsCount: 2
    });

    Comments.insert({
        postId: telescopeId,
        userId: ted._id,
        author: ted.profile.name,
        submitted: now - 5 * 3600 * 1000,
        body: "Intereting project Bill, can I get involved?"
    });

    Comments.insert({
        postId: telescopeId,
        userId: bill._id,
        author: bill.profile.name,
        submitted: now - 3 * 3600 * 1000,
        body: "You sure can Ted. Excellent!"
    });

    Posts.insert({
        title : "Meteor",
        userId: ted._id,
        author: ted.profile.name,
        url   : "http://meteor.com",
        submitted: now - 10 * 3600 * 1000,
        commentsCount: 0
    });

    Posts.insert({
        title : "The Meteor Book",
        userId: ted._id,
        author: ted.profile.name,
        url   : "http://themeteorbook.com",
        submited: now - 12 * 3600 * 1000,
        commentsCount: 0
    });
}