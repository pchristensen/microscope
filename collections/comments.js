Comments = new Meteor.Collection("comments");

Meteor.methods({
    comment: function(commentAttributes) {
        var user = Meteor.user();
        var post = Posts.findOne(commentAttributes.postId);

        if (!user)
            Meteor.Errors.throw("You need to login to make comments", 401);

        if (!commentAttributes.body)
            Meteor.Errors.throw("Please write some content", 422);

        if (!commentAttributes.postId)
            Meteor.Errors.throw("You must comment on a post", 422);

        var comment = _.extend(_.pick(commentAttributes, "postId", "body"), {
            userId: user._id,
            author: user.username,
            submitted: new Date().getTime()
        });

        Posts.update(comment.postId, {$inc: {commentsCount: 1}});

        comment._id =  Comments.insert(comment);

        createCommentNotification(comment);

        return comment._id;
    }
});