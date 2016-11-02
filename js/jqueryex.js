$(function(){
//Called when search button is clicked
var title =null;
$("#submitButton").on('click',function(){

	//Pages available and limit of the content on each page
	var pages = 0;
    var limit = 5;
    //Fetching the value for title
	title=$("#movieTitle").val();
	var details= $("#displayDetails");
	var poster= $("#poster");
	//Emptying the entire details which is already displayed
	details.empty();
	poster.empty();
	var movieSearch = $("#searchtitle");
	movieSearch.empty();
	$('#pagin').empty();
	 var flag=false;
	 //Calling OMDB using ajax	
	$.ajax({
		type:'GET',
		url:'http://www.omdbapi.com/?s='+title,
		success: function(data)
		{       
			$.each(data["Search"],function(i,movie)
				{ 
				    pages++;
					$("#searchtitle").append('<li class="item"><button type="button" class="movieItem btn btn-link" data-id="'+movie.imdbID+'">' +movie.Title+'</button></li>');
					flag=true;	
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
                  var pageCount =  pages/limit;
                 for(var i = 0 ; i<pageCount;i++)
                 {
                   $('#pagin').addClass('text-center');
                   $('#pagin').append('<li><a href="#">'+(i+1)+'</a></li> ');
                 }
                 //Finding the current page
                  $('#pagin li').first().find('a').addClass('current');
                 showPage = function(page) {
                    $('.item ').hide();
                    $('.item ').each(function(n) {
                          if (n >= limit * (page - 1) && n < limit * page)
                            {
                               $(this).show();
                       
                            }
                    });        
                }
                showPage(1);
                $('#pagin li a').click(function() {
                    $('#pagin li a').removeClass("current");
                    $(this).addClass('current');
                    showPage(parseInt($(this).text())) 
                });
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
	$('#pagin').empty();
	var movie=$('#searchtitle');
	var details= $("#displayDetails");
	var poster= $("#poster");
	//Emptying the entire details which is already displayed
	var displayMovie=$(this).attr('data-id');
	movie.empty();
	//Searching each data which matches the title entered by user 
	$.ajax({
		type:'GET',
		url:'http://www.omdbapi.com/?s='+title,
		success: function(data)
		{
			$('#searchtitle').html('');
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
});