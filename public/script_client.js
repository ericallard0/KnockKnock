(function(){
	
    var IsHeAtHome = function (name){
        var personDiv = $('#' + name);
        var h2Element = personDiv.children().last();
        h2Element.hide();               
        var loader = $(document.createElement('img'));
        loader.addClass("child").attr("id","loader").attr("src","ajax-loader.gif");
        personDiv.append(loader);
        $.post('/api/' + name, function(data){
            if(data === "time out"){
                $(h2Element).html("Timeout... Sorry!");
            }else{                 
                $(h2Element).html(data).attr('class', data + " child");
            }
            loader.remove();   
            h2Element.show();
        });
    }
    
    $("#container").click(function(ev){
        var target = ev.target;
        var className = $(target).attr('class');
        if ($(target).hasClass("child")){
            target = $(target).parent()[0];
            className = $(target).attr('class');
        }
        if("person" === className){
            IsHeAtHome($(target).attr("id"))
        }
    });
})();
