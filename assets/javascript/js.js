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

var definedplayer1;

let player1 = {
  name: "",
  wins: 0,
  losses: 0,
  ties: 0,
  pick: ""
};
database.ref().child("/players/player1").set(player1);

let player2 = {
  name: "",
  wins: 0,
  losses: 0,
  ties: 0,
  pick: ""
};
database.ref().child("/players/player2").set(player2);

var clickCounter = 0;
// =====================NAME BUTTON================================
database.ref("count").on("value", function(snapshot){
  clickCounter = snapshot.val().clickCount;
})
$("#nameButton").on("click", function(event) {
  event.preventDefault();
  clickCounter++;
  console.log(clickCounter)
  // database.ref("/players").on("value", function(snapshot) {
  //   console.log(snapshot.val());
  //   console.log(snapshot.val().player1);
  //   // debugger;
  // if(snapshot.val().player1.name == ""){//this has to come from firebase, not local
  database.ref().child("count").set({
    clickCount: clickCounter
  });
  database.ref("count").on("value", function(snapshot){
    if (snapshot.val().clickCount == 1){
    console.log("if condition fired")
    yourPlayerName = $("#player-name").val().trim();
    definedplayer1 = {
      name: yourPlayerName,
      wins: 0,
      losses: 0,
      ties: 0,
      pick: ""
    };
    
    database.ref().child("/players/player1").set(definedplayer1);
    $("#enter-name").empty();
    
    database.ref("count").onDisconnect().remove();
    database.ref("/players/player1").onDisconnect().remove();
    // Though it makes no sense to me removing the ! from player1.name !== "" actually prevents the else if function from firing
  } else if(snapshot.val().clickCount == 2){
    console.log("if Else function fired")
    yourPlayerName = $("#player-name").val().trim();
    $("#p2Name").text(yourPlayerName)
    player2 = {
      name: yourPlayerName,
      wins: 0,
      losses: 0,
      ties: 0,
      pick: ""
    };
    database.ref().child("/players/player2").set(player2);
    $("#enter-name").empty();
    database.ref("/players/player2").onDisconnect().remove();
  }//else, 2 people playing already, have to wait. or just chat.
})});

// ========================Display Players From Firebase======================
database.ref("/players/player1").on("value", function(snapshot){
  console.log(snapshot.val());
  
  $("#p1Name").text(snapshot.val().name)
})


database.ref("/players/player2").on("value", function(snapshot){
  console.log(snapshot.val());
  
  $("#p2Name").text(snapshot.val().name)
})




//   ============================== Comment Button===================================

$("#commentButton").on("click", function(event) {
  event.preventDefault();
  if ( (yourPlayerName !== "") && ($("#chatInput").val() !== "") ) {
    var chat = yourPlayerName + ": " + $("#chatInput").val();
    $("#chatInput").val("");
    // console.log(chat)
    // var comment = {
      //     comment: chat,
      // }
      // console.log(comment)
      
      database.ref("chat").push(chat);
      
      // database.ref().addchild("chat").push(comment);//each message in array has content and sender
      //db.on("child-added")
      
      database.ref("/chat/").on("child_added", function(snapshot){
        //    console.log(snapshot.val())
        console.log(snapshot.val())
        
        //  $("#chatDisplay").html(`<p>${snapshot.val()}`)
        var post = snapshot.val();
        var chatDiv = $("<div>").html(post);
        $("#chatDisplay").append(chatDiv);
  $("#chatDisplay").scrollTop($("#chatDisplay")[0].scrollHeight);
})
}
})
//db.on("value")
});