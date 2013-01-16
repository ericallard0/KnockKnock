(function(){
	
    var IsHeAtHome = function (name){
        var personDiv = $('#' + name);
        personDiv.children().last().remove();               
        var loader = $(document.createElement('img'));
        loader.addClass("child").attr("id","loader").attr("src","ajax-loader.gif");
        personDiv.append(loader);
        $.post('/api/' + name, function(data){               
            var h2Element = document.createElement('h2');
            if(data === "time out"){
                $(h2Element).html("Time Out ... Sorry!");
            }else{                 
                $(h2Element).html(data);
            }
            personDiv.children().last().remove();   
            personDiv.append(h2Element);
        });
    }
    
    $("#container").click(function(ev){
        var target = ev.target;
        var className = $(target).attr('class');
        if (className == "child"){
            target = $(target).parent()[0];
            className = $(target).attr('class');
        }
        if("person" === $(target).attr('class')){
            IsHeAtHome($(target).attr("id"))
        }
    });
})();
