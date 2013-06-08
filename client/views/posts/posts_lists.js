Template.newPosts.helpers({
    options: function() {
        return {
            sort: { submitted: -1 },
            handle: newPostsHandle
        };
    }
});

Template.bestPosts.helpers({
    options: function() {
        return {
            sort: { votes: -1, submitted: -1 },
            handle: bestPostsHandle
        };
    }
});

Template.postsList.helpers({
    postsWithRank: function() {
        var i = 0, options = { sort: this.sort, limit: this.handle.limit() };
        return Posts.find({}, options).map(function(post) {
            post._rank = i;
            i += 1;
            return post;
        });
    },
    postsReady: function() {
        return ! this.handle.loading();
    },
    allPostsLoaded: function() {
        return ! this.handle.loading() &&
            Posts.find().count() < this.handle.loaded();
    }
});

Template.postItem.rendered = function() {
    var instance = this,
        rank = instance.data._rank,
        $this = $(this.firstNode),
        postHeight = 80,
        newPosition = rank * postHeight;

    if (typeof(instance.currentPosition) != "undefined") {
        var previousPosition = instance.currentPosition,
            delta = previousPosition - newPosition;
        $this.css("top", delta + "px");
    }

    Meteor.defer(function() {
        instance.currentPosition = newPosition;
        $this.css("top", "0px");
    });
};

Template.postsList.events({
    "click .load-more": function(event) {
        event.preventDefault();
        this.handle.loadNextPage();
    }
});