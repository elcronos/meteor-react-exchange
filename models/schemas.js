Schema = {}

Schema.profile = new SimpleSchema({
  name: {
    type: String
  },
  surname: {
    type:String
  },
  birthday: {
    type: Date
  },
  country: {
    type: String
  },
  city: {
    type: String
  },
  gender: {
    type: String,
    allowedValues: ['Male', 'Female']
  },
  mylanguagesknown:{
    type: Array
  },
  "mylanguagesknown.$":{
    type: Object
  },
  "mylanguagesknown.$.id":{
    type: String
  },
  "mylanguagesknown.$.language":{
    type: String
  },
  "mylanguagesknown.$.level":{
    type: String
  },
  mylanguagespractice:{
    type: Array
  },
  "mylanguagespractice.$":{
    type: Object
  },
  "mylanguagespractice.$.id":{
    type: String
  },
  "mylanguagespractice.$.language":{
    type: String
  }
})

Schema.User = new SimpleSchema({
    username: {
        type: String,
        min: 4,
        max: 16
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    },
    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    // Use this registered_emails field if you are using splendido:meteor-accounts-emails-field / splendido:meteor-accounts-meld
    registered_emails: {
        type: [Object],
        optional: true,
        blackbox: true
    },
    createdAt: {
      type: Date,
      autoValue: function() {
        if (this.isInsert) {
            return new Date();
        }
        else if (this.isUpsert) {
            return {$setOnInsert: new Date()};
        } else {
            this.unset();  // Prevent user from supplying their own value
        }
      }
    },
    profile: {
        type: Schema.profile,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true
    }
});

Meteor.users.attachSchema(Schema.User)
