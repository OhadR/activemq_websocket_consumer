var counter = 0;
var destination;
var client;
var log;

function connect() 
{
	client = Stomp.client( "ws://localhost:61614/stomp", "v11.stomp" );
	client.connect( "", "", connectionCallback );
}

$(document).ready(function() {

	$('#queue_name').val('ohadr-test-websocket');
	destination = $('#queue_name').val();
	log = $('#log');

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
	log.append( 'disconnected.\n' );
}

function connectionCallback() 
{
	console.log('connected to ActiveMQ STOMP.');
	log.append( 'connected to ActiveMQ STOMP.\n' );
    client.subscribe(destination,
     function( message ) 
     {
//   	 	alert( event );
			console.log('received message from ' + destination + '. ' + message.body);
			log.append( message.body + "\n" );
		}, 
  { priority: 9 } 
    );
}
