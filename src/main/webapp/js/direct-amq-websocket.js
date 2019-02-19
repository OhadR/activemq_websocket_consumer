var counter = 0;
var destination;
var client;
var log;

function connect() 
{
	client = Stomp.client( "ws://localhost:61614/stomp", "v11.stomp" );
	client.connect( "", "",
	 function() {
	     client.subscribe(destination,
	      function( message ) 
	      {
//	    	 	alert( event );
				console.log('received message from ' + destination + '. ' + message.body);
				log.innerHTML += message.body + "\n";
			}, 
	   { priority: 9 } 
	     );
	 }
	);
}

$(document).ready(function() {

	$('#queue_name').val('ohadr-test-websocket');
	destination = $('#queue_name').val();
	log = document.getElementById("log");

	$("#submit").click(function(){
		

	});
});

function sendMessage()
{
	console.log('sending message to ' + destination);
	++counter;
	client.send(destination, { priority: 9 }, "Pub/Sub over STOMP! " + counter);
}

function registerListener()
{
	connect();
}

function disconnect()
{
	console.log('disconnecting...');
	client.disconnect( disconnectCallback );
}

function disconnectCallback()
{
	console.log('disconnected.');
	log.innerHTML += 'disconnected.\n';
}