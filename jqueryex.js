//Called when search button is clicked
$("#submitButton").on('click',function(){
	//Pages available and limit of the content on each page
	var pages = 0;
    var limit = 5;
    var offset=0;
    //Fetching the value for title
	var title=$("#movieTitle").val();
	var details= $("#displayDetails");
	var poster= $("#poster");
	//Emptying the entire details which is already displayed
	details.empty();
	poster.empty();
	var $movieSearch = $("#searchtitle");
	$movieSearch.empty();
	var $movieShow = $("#movie");
	$movieShow.remove();
	 var $title=$("#movieTitle");
	 var titlevalue=$title.val();
	 var flag=false;
	 //Calling OMDB using ajax
	$.ajax({
		type:'GET',
		url:'http://www.omdbapi.com/?s='+title,
		success: function(data)
		{
			 var currentOffset = 1;
             var index = 1; 
             //Searching each data which matches the title entered by user         
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
			//If movie not found alert is displayed
			if(!flag)
			{

				alert('No Movies Found');
				offset=0;
			}
			//Pages will be set according to the limit
			if(flag)
			{
				  pages = pages/limit;
                  for( var btn=0; btn < pages; btn++)
                  {
                   $movieSearch.append('<input type="button" class="pageNumber" value="'+(parseInt(btn)+1)+'" data-offset="'+(parseInt(btn))+'">');
                  }

			}
		},
		//Error function will be called incase of any server problem 
		error:function(){
			document.location.href="error.html";
		}
	});
});

//Called when particular movie item is clicked
$('#searchtitle').delegate('.movieItem','click',function(){
	var $movie=$('#searchtitle');
	var details= $("#displayDetails");
	var poster= $("#poster");
	//Emptying the entire details which is already displayed
	var displayMovie=$(this).attr('data-id');
	$movie.empty();
	//Searching each data which matches the title entered by user 
	$.ajax({
		type:'GET',
		url:'http://www.omdbapi.com/?s=title',
		success: function(data)
		{
			//Display the movie details based on the search accordingly
			 $.each(data["Search"],function(i,movie){
				if(movie.imdbID===displayMovie)
				{	
			 details.append('<p> Title:' +movie.Title+'<br>Year:'+movie.Year+'<br>IMBId:'+movie.imdbID+'</p>');
			  poster.append('<img src="'+movie.Poster+'"></img>');
			}
		});
		},
		//Error function will be called incase of any server problem 
		error:function(){
			alert('error');
		}
	});
});

//Displaying content pagewise
   $('#searchtitle').delegate('.pageNumber','click',function()
    {
        var thisButton = $(this);
        var limit=5;
        var title=$("#movieTitle").val();
        var flag=false;
        console.log(thisButton.attr('data-offset'));
        $("#searchtitle").empty();
        offset = parseInt(thisButton.attr('data-offset')) * limit;
        pages = 0;
 		//Calling OMDB using ajax
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
			//If movie not found alert is displayed
			if(!flag)
			{

				alert('No Movies Found');
				offset=0;
			}
			//Pages will be set according to the limit
			if(flag)
			{
				  pages = pages/limit;
                  for( var btn=0; btn < pages; btn++)
                  {
                   $movieSearch.append('<input type="button" class="pageNumber" value="'+(parseInt(btn)+1)+'" data-offset="'+(parseInt(btn))+'">');
                  }

			}
		},
		//Error function will be called incase of any server problem 
		error:function(){
			document.location.href="error.html";
		}
	});       
});
