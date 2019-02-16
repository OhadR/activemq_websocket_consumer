var intervalObj;
var ws;

var counter = 0;
var destination;
var handlerId = '54';

function connect() {
    var username = 'ohadsss';
    
    var host = document.location.host;
    var pathname = document.location.pathname;
    
    ws = new WebSocket("ws://" +host  + pathname + "amq/" + username);

    ws.onmessage = function(event) {
    	var log = document.getElementById("log");
        console.log(event.data);
        var message = JSON.parse(event.data);
        log.innerHTML += message.from + " : " + message.content + "\n";
    };
}

function onReceiveMessage(message)
{
	console.log('received message from ' + destination + '. ' + message.textContent);
//	alert("received "+ message.textContent);
	$("#log").text( message.textContent );
}

$(document).ready(function() {

	destination = $('#queue_name').val();

	$("#submit").click(function(){
		
		intervalObj = setInterval(callBackend, (5 * 1000));
	});
});

function callBackend()
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

function callBackendGetJobProgress()
{
	var requestData = {
		numSamples: 30
	};
	
	var serverAddress = getServerAddress();
	
	$.ajax({
		url: serverAddress + "/rest-api/status/getProgress",
		data: requestData,
		type: 'GET',
		dataType: 'text',
		contentType: 'application/json',
		success: function(response, textStatus, jqXHR){
			var marsStats = JSON.parse(response);
//			drawChart( marsStats );
			counter = 0;
		},
		error: function(jqXHR, textStatus, errorThrown){
			++counter;
			if(counter % 15 == 0)
				alert('error attempting to reach ' + serverAddress + ', counter=' + counter);
		}
	});
}


function stopInterval()
{
	console.log('* stopping sending messages to ' + destination);
	window.clearInterval( intervalObj );
}

function registerListener()
{
	amq.addListener(handlerId, destination, onReceiveMessage);
}

function unregisterListener()
{
	amq.removeListener(handlerId, destination);
}

