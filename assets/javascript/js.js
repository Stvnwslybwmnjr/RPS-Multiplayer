$(document).ready(function(){

var firebaseConfig = {
    apiKey: "AIzaSyDwb36Q-AASMGfyanjKuzUMdyJCJBYSR7w",
    authDomain: "rock-paper-scissors-7b8ea.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-7b8ea.firebaseio.com",
    projectId: "rock-paper-scissors-7b8ea",
    storageBucket: "",
    messagingSenderId: "97172019306",
    appId: "1:97172019306:web:b081e5afc6c542bd4ed213"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

var yourPlayerName = "";
var player1 = null;
var player2 = null;


  $("#name-box").on("click", function(event) {
    event.preventDefault();
    if(player1 === null){
    yourPlayerName = $("#player-name").val().trim();
    $("#p1Name").text(yourPlayerName)
    player1 = {
        name: yourPlayerName,
        wins: 0,
        losses: 0,
        ties: 0,
        pick: ""
    };
    console.log(player1);
    } else if (player2 === null){
        yourPlayerName = $("#player-name").val().trim();
        $("#p2Name").text(yourPlayerName)
        player2 = {
            name: yourPlayerName,
            wins: 0,
            losses: 0,
            ties: 0,
            pick: ""
        };
        console.log(player2);
    }
  });

});