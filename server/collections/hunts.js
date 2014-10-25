// SCHEMA

Schema.phUsers = new SimpleSchema({
  id: {
    type: Number,
    defaultValue: 0
  },
  name: {
    type: String,
    defaultValue: 'Unknown'
  },
  headline: {
    type: String,
    optional: true,
    defaultValue: ""
  },
  'created_at': {
    type: Date,
    optional: true
  },
  username: {
    type: String,
    defaultValue: "unknown"
  },
  'image_url': {
    type: Object,
    blackbox: true,
    optional: true
  },
  'profile_url': {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  }
});

Schema.phScreenShots = new SimpleSchema({
  '300px': {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  },
  '850px': {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  }
});

Schema.Hunts = new SimpleSchema({
  added_at: {
    type: Date
  },
  id: {
    type: Number
  },
  buyers: {
    type: Number,
    defaultValue: 0
  },
  name: {
    type: String,
    defaultValue: ''
  },
  tagline: {
    type: String,
    defaultValue: ''
  },
  'created_at': {
    type: Date,
    optional: true
  },
  day: {
    type: String,
    optional: true
  },
  'comments_count': {
    type: Number,
    defaultValue: 0
  },
  'votes_count': {
    type: Number,
    defaultValue: 0
  },
  points: {
    type: Number,
    defaultValue: App.purchaseFee
  },
  'discussion_url': {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  },
  'redirect_url': {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  },
  'screenshot_url': {
    type: Object,
    blackbox: true,
    optional: true
  },
/*  'screenshot_url': {
    type: Schema.phScreenShots,
    optional: true
  },*/
  'current_user': {
    type: Object,
    optional: true,
    blackbox: true
  },
  'maker_inside': {
    type: Boolean,
    optional: true
  },
/*  user: {
    type: Object,
    blackbox: true,
    optional: true
  }*/
  user: {
    type: Schema.phUsers,
    optional: true
  },
  available: {
    type: Boolean,
    defaultValue: true
  }
});

Hunts.attachSchema(Schema.Hunts);

// ALLOW/DENY RULES

Hunts.allow({
  insert: function (userId, doc) {
    return false;
  },

  update: function (userId, doc, fieldNames, modifier) {
    return false;
  },

  remove: function (userId, doc) {
    return false;
  }
});

Hunts.deny({
  insert: function (userId, doc) {
    return false;
  },

  update: function (userId, doc, fieldNames, modifier) {
    return false;
  },

  remove: function (userId, doc) {
    return false;
  }
});
