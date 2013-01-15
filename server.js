var nodeStatic = require('node-static'),
	fserver = new nodeStatic.Server('./public'),
	exec = require('child_process').exec;

require('http').createServer(function (request, response) {
	if(request.url == "/api"){
		var ips = {
			ip: ["192.168.1.18", "192.168.1.20"],
			name:["Romain", "Eric"],
			result:[]
		};
		console.log(request.url);

		request.addListener('end', function () {
			setTimeout(function(){
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write("time out");
			response.end();
		  }, 5500);
				
		var message = '';
		response.writeHead(200, {'Content-Type': 'text/plain'});
		pingNextPerson(ips, 0, response);
		});
	}else if(request.url == "/design.css"){
			fserver.serveFile('/design.css',200,{},request,response);
	}else if(request.url == "/script_client.js"){
			fserver.serveFile('/script_client.js',200,{},request,response);
	}else if(request.url == "/jquery-1.6.4.min.js"){
			fserver.serveFile('/jquery-1.6.4.min.js',200,{},request,response);
	}else if(request.url == "/ajax-loader.gif"){
			fserver.serveFile('/ajax-loader.gif',200,{},request,response);
	}else{
			fserver.serveFile('/index.html',200,{},request,response);
	}

}).listen(8888);

function pingNextPerson(ips, id, response){
	if(id <= ips.ip.length-1){
	exec("ping "+ips.ip[id]+" -c 1", function(error, stdout, stderr) {

				var name = ips.name[id];
				console.log('exec' + name);
				var the6thElementOf2ndeLineOfTheResultOfPing = stdout.split('\n')[1].split(' ')[5];
				
				if(the6thElementOf2ndeLineOfTheResultOfPing == "ttl=64"){
					message = "Present";
				} else if (the6thElementOf2ndeLineOfTheResultOfPing == "Unreachable"){
					message = "Absent";
				} else {
				  message = "Perdu";
				}
				ips.result[id] = message;
				pingNextPerson(ips, ++id, response);
	});
	} else{
		response.write(JSON.stringify(ips));
		response.end();
		console.log('terminé');
	}	
}
