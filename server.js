var nodeStatic = require('node-static'),
fserver = new nodeStatic.Server('./public'),
exec = require('child_process').exec;

var ips = {
    ip: ["192.168.1.18", "192.168.1.20"],
    name:["Romain", "Eric"],
    email:["romain.bouye@gmail.com","eric.allard0104@gmail.com"]
};

require('http').createServer(function (request, response) {
    var req = request.url.split("/");
    req.shift();
    if(req[0] == "api"){
        var name = req[1];
        request.addListener('end', function () {
            setTimeout(function(){
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.write("time out");
                response.end();
            }, 5500);
            response.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            pingAPerson(name,response);
        });
    }else if(req[0] == "design.css"){
        fserver.serveFile('/design.css',200,{},request,response);
    }else if(req[0] == "script_client.js"){
        fserver.serveFile('/script_client.js',200,{},request,response);
    }else if(req[0] == "jquery-1.6.4.min.js"){
        fserver.serveFile('/jquery-1.6.4.min.js',200,{},request,response);
    }else if(req[0] == "ajax-loader.gif"){
        fserver.serveFile('/ajax-loader.gif',200,{},request,response);
    }else{
        fserver.serveFile('/index.html',200,{},request,response);
    }

}).listen(8888);


function pingAPerson(name,response){
    var id = ips.name.indexOf(name);
    ping(id,response);
}

function ping(id,response){
   return exec("ping "+ips.ip[id]+" -c 2 -W 2", function(error, stdout, stderr) {
        var name = ips.name[id];
        console.log('exec ' + name);
        var the6thElementOf2ndeLineOfTheResultOfPing = stdout.split('\n')[1].split(' ')[5];
        var message;
                
        if(the6thElementOf2ndeLineOfTheResultOfPing == "ttl=64"){
            message =  "Present";
        } else if (the6thElementOf2ndeLineOfTheResultOfPing == "Unreachable"){
            message = "Absent";
        } else {
            message = "Perdu";
        }  
        response.write(message);
        response.end();
        console.log('terminé');
    });
}
