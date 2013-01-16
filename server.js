var nodeStatic = require('node-static'),
jsdom = require('jsdom'),
fs = require('fs'),
sys = require('sys'),
fserver = new nodeStatic.Server('./public'),
exec = require('child_process').exec;

var personsFile = fs.readFileSync('./persons.json','utf8'); 
var ips = JSON.parse(personsFile); 

require('http').createServer(function (request, response) {
    var req = request.url.split("/");
    req.shift();
    if(req[0] == "api"){
        var name = req[1];
        request.addListener('end', function () {
            setTimeout(function(){
                response.writeHead(200, {
                    'Content-Type': 'text/plain'
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
        readIndex(function (indexHtml) {
            jsdom.env({
                html: indexHtml,
                scripts: ['http://code.jquery.com/jquery-1.9.0.min.js', 'https://raw.github.com/placemarker/jQuery-MD5/master/jquery.md5.js','/script_client.js']
            }, function (err, window) {
                var $ = window.jQuery;
                for(var id = 0; id< ips.ip.length ;id++){
                    var $divPersonElement = $('<div>');
                    console.log('test du for');
                    $divPersonElement.attr('id', ips.name[id]).addClass("person");
                    var $img = $('<img>');
                    $img.attr('src', 'http://www.gravatar.com/avatar/'+ $.md5(ips.email[id])+'?s=400').addClass('child');
                    var $h2PersonName = $('<h2>');
                    $h2PersonName.html(ips.name[id]).addClass('child');
                    $divPersonElement.append($img).append($h2PersonName);
                    console.log($divPersonElement.html());
                    $('#container').append($divPersonElement);
                }
                
                $('.jsdom').removeClass('jsdom');
                  response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.write(window.document.innerHTML);
                response.end();
                
            });
        })
        
    }

}).listen(8888);

function readIndex(callback) {
    fs.readFile("./public/index.html","utf-8",  function (err, content) {
        if (err) return callback(err)
        callback(content)
    })
}


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
