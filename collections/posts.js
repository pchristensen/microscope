Posts = new Meteor.Collection('posts');

Posts.allow({
    update: ownsDocument,
    remove: ownsDocument
});

Posts.deny({
    update: function(userId, post, fieldNames) {
        // may only edit the following three fields
        return (_.without(fiendNames,  "url", "title").length > 0);
    }
});

Meteor.methods({
    post: function(postAttributes) {
        var user = Meteor.user(),
            postWithSameLink = Posts.findOne({url: postAttributes.url});

        if (!user)
            Meteor.Errors.throw("You need to login to post new stories", 401);

        if (!postAttributes.title)
            Meteor.Errors.throw("Please fill in a headine", 422);

        if (postAttributes.url && postWithSameLink)
            Meteor.Errors.throw("This link has already been posted", postWithSameLink._id, 302);

        var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
            userId: user._id,
            author: user.username,
            submitted: new Date().getTime(),
            commentsCount: 0
        });

        var postId = Posts.insert(post);
        return postId;
    }
});