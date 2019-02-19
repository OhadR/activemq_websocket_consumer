var intervalObj;
var ws;

var counter = 0;
var destination;
var client;

function connect() 
{
	client = Stomp.client( "ws://localhost:61614/stomp", "v11.stomp" );
	client.connect( "", "",
	 function() {
	     client.subscribe(destination,
	      function( message ) 
	      {
//	    	 	alert( event );
				var log = document.getElementById("log");
				console.log('received message from ' + destination + '. ' + message.body);
				log.innerHTML += message.body + "\n";
			}, 
	   { priority: 9 } 
	     );
	 }
	);

	
/*    var host = document.location.host;
    var pathname = document.location.pathname;
    
    ws = new WebSocket("ws://" +host  + pathname + "amq/" + destination);

    ws.onmessage = function(event) {
    	var log = document.getElementById("log");
    	console.log('received message from ' + destination + '. ' + event.data);
        var message = JSON.parse(event.data);
        log.innerHTML += message + "\n";
    };*/
}

$(document).ready(function() {

	$('#queue_name').val('ohadr-test-websocket');
	destination = $('#queue_name').val();

	$("#submit").click(function(){
		

	});
});

function sendMessage()
{
	console.log('sending message to ' + destination);
	++counter;
	client.send(destination, { priority: 9 }, "Pub/Sub over STOMP! " + counter);
}

function getServerAddress()
{
	var serverAddress;
	var isSecured = $('#server_secured').is(":checked");		//is https (o/w http)
	if(isSecured)
		serverAddress = "https://";
	else
		serverAddress = "http://";
	
	var serverName = $('#server_name').val();
	var serverPort = $('#server_port').val();
	serverAddress += serverName;
//	if(!serverPort)		//checks null, undefuned and empty string (tnx @Slava!)
	serverAddress += ':' + serverPort;		//if 'port' is empty it does not harm (http://host:/rest.. is OK
	return serverAddress;
}


function registerListener()
{
	connect();
}

function unregisterListener()
{
	disconnect();
}

