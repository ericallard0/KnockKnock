(function(){
	
	    var whoIsAtHome = function (){ 
			$.post('/api', function(data){
				if(data === "time out"){
					$('#container').html("<p>Time Out ... Sorry!</p>");
				}else{
					$('.loader').remove();
					data = JSON.parse(data);
					var names = data.name;
					for(var i=0; i<names.length; i++){               
					   var h2Element = document.createElement('h2');
					   $(h2Element).html(data.result[i]);
					   $('#' + names[i]).append(h2Element);
					}
				}
			});
		}();
	
})();
