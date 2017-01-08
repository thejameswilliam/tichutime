import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

  Meteor.publish("rounds", function() {
    return TichuRound.find();
  })

  Meteor.publish("games", function() {
    return TichuGame.find();
  })

Meteor.startup(() => {
  // code to run on server at startup
});
