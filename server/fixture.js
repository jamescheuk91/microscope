if (Posts.find().count() === 0) {
  Posts.insert({
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/',
    sbmmitted: new Date()
  });

  Posts.insert({
    title: 'Meteor',
    url: 'http://meteor.com',
    sbmmitted: new Date()
  });

  Posts.insert({
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com',
    sbmmitted: new Date()
  });
}