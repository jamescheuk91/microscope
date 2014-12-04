Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) { return canDeletePost(userId, post); },
  remove: function(userId, post) { return canDeletePost(userId, post); }
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Meteor.methods({
  postInsert: function(postAttributes) {
    console.log("inside postInsert");
    check(this.userId, String);
    check(postAttributes, {
      title: String,
      url: String
    });

    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    console.log(postWithSameLink);
    if (postWithSameLink) {
      console.log("HI");
      return {
        postExists: true,
        _id: postWithSameLink._id
      };
    }

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    var postId = Posts.insert(post);

    return {
      _id: postId
    };
  }
});
