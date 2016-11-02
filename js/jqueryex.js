
$("#submitButton").on('click',function(){
	 var pages = 0;
    var limit = 5;
    var offset=0;
	var title=$("#movieTitle").val();
	var details= $("#displayDetails");
	var poster= $("#poster");
	details.empty();
	poster.empty();
	var $movieSearch = $("#searchtitle");
	$movieSearch.empty();
	var $movieShow = $("#movie");
	$movieShow.remove();
	 var $title=$("#movieTitle");
	 var titlevalue=$title.val();
	 var flag=false;
	$.ajax({
		type:'GET',
		url:'http://www.omdbapi.com/?s='+title,
		success: function(data)
		{
			 var currentOffset = 1;
             var index = 1;          
			$.each(data["Search"],function(i,movie){
				{
				    pages++;
                    if(currentOffset > offset && index <= limit)
					{  		
						$movieSearch.append('<li><button type="button" class="movieItem btn btn-link" data-id="'+movie.imdbID+'">' +movie.Title+'</button></li>');
						flag=true;
						 index++;
						 currentOffset++;
					}
			}
			});
			if(!flag)
			{

				alert('No Movies Found');
				offset=0;
			}
			if(flag)
			{
				  pages = pages/limit;
                  for( var btn=0; btn < pages; btn++)
                  {
                   $movieSearch.append('<input type="button" class="pageNumber" value="'+(parseInt(btn)+1)+'" data-offset="'+(parseInt(btn))+'">');
                  }

			}
		},
		error:function(){
			document.location.href="error.html";
		}
	});
});


$('#searchtitle').delegate('.movieItem','click',function(){
	var $movie=$('#searchtitle');
	var details= $("#displayDetails");
	var poster= $("#poster");
	var displayMovie=$(this).attr('data-id');
	$movie.empty();
	$.ajax({
		type:'GET',
		url:'http://www.omdbapi.com/?s=title',
		success: function(data)
		{
			 $.each(data["Search"],function(i,movie){
				if(movie.imdbID===displayMovie)
				{	
			 details.append('<p> Title:' +movie.Title+'<br>Year:'+movie.Year+'<br>IMBId:'+movie.imdbID+'</p>');
			  poster.append('<img src="'+movie.Poster+'"></img>');
			}
		});
		},
		error:function(){
			alert('error');
		}
	});
});


  /* $("#searchtitle").delegate('.pageNumber','click',function()
    {
        var thisButton = $(this);
        var limit=5;
        var title=$("#movieTitle").val();
        var flag=false;
        console.log(thisButton.attr('data-offset'));
        $("#searchtitle").empty();

                offset = parseInt(thisButton.attr('data-offset')) * limit;
            pages = 0;
 
               $.ajax({
		type:'GET',
		url:'http://www.omdbapi.com/?s='+title,
		success: function(data)
		{
			 var currentOffset = 1;
             var index = 1;          
			$.each(data["Search"],function(i,movie){
				{
				    pages++;
                    if(currentOffset > offset && index <= limit)
					{  		
						$movieSearch.append('<li><button type="button" class="movieItem btn btn-link" data-id="'+movie.imdbID+'">' +movie.Title+'</button></li>');
						flag=true;
						 index++;
						 currentOffset++;
					}
			}
			});
			if(!flag)
			{

				alert('No Movies Found');
				offset=0;
			}
			if(flag)
			{
				  pages = pages/limit;
                  for( var btn=0; btn < pages; btn++)
                  {
                   $movieSearch.append('<input type="button" class="pageNumber" value="'+(parseInt(btn)+1)+'" data-offset="'+(parseInt(btn))+'">');
                  }

			}
		},
		error:function(){
			document.location.href="error.html";
		}
	});
          
});
*/