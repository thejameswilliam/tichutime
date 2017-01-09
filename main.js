TichuGame = new Meteor.Collection("tichuGame");
TichuRound = new Meteor.Collection("tichuRound");

if (Meteor.isClient) {
    Meteor.subscribe("rounds");
    Meteor.subscribe("games");

    Template.tichuScore.tichuRound = function() {
      return TichuRound.find();
    }

    Template.currentRound.tichuGame = function() {
      return TichuGame.find();
    }

    Template.body.events({
      'click .newGame'(event) {
        TichuGame.insert({
          status: 'inProgress',
          teamOne:{
            score: 0,
            personOne: {
              name: 'James',
              tichuCalls: 0,
              grandCalls: 0
            },
            personTwo: {
              name: 'Heather',
              tichuCalls: 0,
              grandCalls: 0
            },
          },
          teamTwo:{
            score: 0,
            personOne: {
              name: 'Rigby',
              tichuCalls: 0,
              grandCalls: 0
            },
            personTwo: {
              name: 'Sima',
              tichuCalls: 0,
              grandCalls: 0
            },
          },
        })
      }
    })
    Template.body.helpers({
      buttonText: 'New Round'
    })

    Template.currentRound.events({
      'click .submitScore'(event) {
        event.preventDefault();
        if(this.status == 'inProgress') {
          tichuGameID = this._id
          var teamOneScore = Number(event.target.form.tichuScoreTeamOne.value);
          var teamTwoScore = Number(event.target.form.tichuScoreTeamTwo.value);
          var totalScore = teamOneScore+teamTwoScore;


          var called_ele = document.getElementsByClassName('active');


          if(called_ele.length > 0) {


            peopleWhoCalled = document.getElementById('peopleWhoCalled').innerHTML;

            for (var i = 0; i < called_ele.length; ++i) {
                var item = called_ele[i];
                var personWhoCalled = $('.active:eq('+i+')').parent().attr('id');
                var theCall = item.innerHTML;
                //console.log(personWhoCalled,'called',theCall);
                $("#peopleWhoCalled").append( personWhoCalled );
                
            }

            //$("#peopleWhoCalled").html(personWhoCalled);
            $('#whoCalled').modal('show');
          }

          if(totalScore == 100) {
            TichuGame.update( this._id, {
              $inc: {'teamOne.score': teamOneScore},
            });
            TichuGame.update( this._id, {
              $inc: {'teamTwo.score': teamTwoScore},
            });
            TichuRound.insert({
              teamOneScore:teamOneScore,
              teamTwoScore:teamTwoScore,
              tichuGame:this._id
            })
            event.target.form.tichuScoreTeamTwo.value = '';
            event.target.form.tichuScoreTeamOne.value = '';
          } else {

          }
          event.target.form.tichuScoreTeamTwo.value = '';
          event.target.form.tichuScoreTeamOne.value = '';

        }
      }
    })

    Template.pastRound.events({
      'click .remove': function () {

        var gameId = this.tichuGame;
        var currentTeamOneScore = TichuGame.find({_id:gameId}).teamOne;
        var currentTeamTwoScore = TichuGame.find({_id:gameId}).teamOne;
        //console.log(this);

        TichuGame.update( gameId, {
          $inc: {'teamOne.score': -this.teamOneScore},

        });
        TichuGame.update( gameId, {
          $inc: {'teamTwo.score': -this.teamTwoScore},
        });

        TichuRound.remove(this._id);

      }
    });

    Template.currentRound.events({
      'click .delete': function () {
        event.preventDefault();
        TichuGame.remove(this._id);
      }
    });


}
if(Meteor.isServer) {

}
