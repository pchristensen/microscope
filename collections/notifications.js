Notifications = new Meteor.Collection("notifications");

Notifications.allow({
    update: ownsDocument
});

createCommentNotification = function(comment) {
    var post = Post.findOne(comment.postId);
    Notifications.insert({
        userId: post.userId,
        postId: post._id,
        commentId: comment_.id,
        commenterName: comment.author,
        read: false
    });
};