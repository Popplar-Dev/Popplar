var stompClient = null;

function setConnected(connected) {
  $("#connect").prop("disabled", connected);
  $("#disconnect").prop("disabled", !connected);
  if (connected) {
    $("#conversation").show();
  }
  else {
    $("#conversation").hide();
  }
  $("#greetings").html("");
}

function connect() {
  var socket = new SockJS('/gs-guide-websocket');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe('/room/21414107', function (greeting) {
      showGreeting(JSON.parse(greeting.body));
    });
  });
}

function disconnect() {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
  setConnected(false);
  console.log("Disconnected");
}

function sendName() {
  let test = Math.floor(Math.random()*10)
  stompClient.send(`/live-chat/chat/21414107`, {}, JSON.stringify({'memberId': 446164955855, 'chattingContent' : $("#name").val()}));
}

function showGreeting(message) {
  $("#greetings").append("<tr><td>" + message.memberName + " :        " + message.chattingContent + "         " + message.chattingCreatedAt + "</td></tr>");

}

$(function () {
  $("form").on('submit', function (e) {
    e.preventDefault();
  });
  $( "#connect" ).click(function() { connect(); });
  $( "#disconnect" ).click(function() { disconnect(); });
  $( "#send" ).click(function() { sendName(); });
});
