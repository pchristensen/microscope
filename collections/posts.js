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
            commentsCount: 0,
            upvoters: [],
            votes: 0
        });

        var postId = Posts.insert(post);
        return postId;
    },

    upvote: function(postId) {
        var user = Meteor.user();
        if (!user)
            Meteor.Errors.throw("You need to login to upvote", 401);

        var post = Posts.findOne(postId);
        if (!post)
            Meteor.Errors.throw("Post not found", 422);

        if (_.include(post.upvoters, user._id))
            Meteor.Errors.throw("Already upvoted this post", 422);

        Posts.update({
            _id: postId,
            upvoters: { $ne: user._id }
        }, {
            $addToSet: { upvoters: user._id },
            $inc: { votes: 1 }
        });
    }
});