var intervalObj;
var ws;

var counter = 0;
var destination;

function connect() 
{
    var host = document.location.host;
    var pathname = document.location.pathname;
    
    ws = new WebSocket("ws://" +host  + pathname + "amq/" + destination);

    ws.onmessage = function(event) {
    	var log = document.getElementById("log");
    	console.log('received message from ' + destination + '. ' + event.data);
        var message = JSON.parse(event.data);
        log.innerHTML += message + "\n";
    };
}

$(document).ready(function() {

	destination = $('#queue_name').val();

	$("#submit").click(function(){
		
		intervalObj = setInterval(sendMessage, (5 * 1000));
	});
});

function sendMessage()
{
	console.log('sending message to ' + destination);
	++counter;
	amq.sendMessage(destination,"myMessage-" + counter);
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


function stopInterval()
{
	console.log('* stopping sending messages to ' + destination);
	window.clearInterval( intervalObj );
}

function registerListener()
{
	connect();
}

function unregisterListener()
{
	disconnect();
}

