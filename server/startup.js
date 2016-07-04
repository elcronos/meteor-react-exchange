import { Meteor } from 'meteor/meteor';
import { Countries } from '/models/collections.js'

Meteor.startup(() => {
  if (Countries.find().count() === 0) {
      var countries = {};
      countries = JSON.parse(Assets.getText("countries.json"));

      for (var i = 0; i < countries.length; i++) {
        Countries.insert(countries[i]);
      }
  }
});
