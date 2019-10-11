(function($){
    function processForm( e ){
        var dict = {
        	Title : this["title"].value,
            DirectorName: this["director"].value,
            Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44352/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                alert("You have successfully added a movie! Click the Generate Movie List button to reload the movies."),
                
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
        $('#my-form').empty();
        e.preventDefault();
    }
    $('#my-form').submit( processForm );
    
})(jQuery);


function GetMovies(){
   
    $.ajax({
        url: 'https://localhost:44352/api/movie',
        dataType : 'json',
        type: 'Get',
        success: function(data, textStatus, jQxhr){
           $('tbody').empty();
           var newMovie = "";
                newMovie+="<tr>";
                newMovie+="<th>Title:</th>";
                newMovie+="<th>Director Name:</th>";
                newMovie+="<th>Genre:</th>";
                newMovie+="</tr>";
           $.each(data, function(index, value){

             
               newMovie+= "<tr>";
               newMovie+="<td>" +value.Title +"</td>";
               newMovie+="<td>"+value.DirectorName+"</td>";
               newMovie+="<td>"+value.Genre+"</td>";
               newMovie+="<td><button type ='button' onclick='GetSingleMovie(" +value.MovieId+ ")'>Details</button>";
               newMovie+="<td><button type='button' onclick='DeleteMovie("+value.MovieId+")'>Delete</button>";
               newMovie+="</tr>";
               

           });
           newMovie+="<tr>";
           newMovie+="<td><button type='button' onclick='MakeForm()'>Add New Movie</button>";
           newMovie+="</tr>"
           $('#MovieBody').append(newMovie);
           $('#my-form').empty();
           $('#edit').empty();
        
        }
       
    });
 
}
function MakeForm(){
    var newForm="";
    newForm+="<input type='text' name='title' placeholder='Title' />";
    newForm+="<input type='text' name='director' placeholder='DirectorName' />";
    newForm+="<input type='text'name='genre' placeholder='Genre'/>";
    newForm+="<button type='submit'>Submit</button>";
    $('#my-form').append(newForm);
   $('tbody').empty();
    

}
function GetSingleMovie(id){
    $.ajax({
        url: 'https://localhost:44352/api/movie/'+id,
        dataType:'json',
        type:'Get',
        success: function(data,textStatus,jQxhr){
            var searchedMovies = "";
            searchedMovies+= "<tr>";
            searchedMovies+="<td>" +data.Title +"</td>";
            searchedMovies+="<td>"+data.DirectorName+"</td>";
            searchedMovies+="<td>"+data.Genre+"</td>";
            searchedMovies+="</tr>";
            $('#MovieBody').html(searchedMovies);
        }
    })
    .then(MakeTheFrom(id));

}
function MakeTheFrom(id){
    var editForm="";
    editForm+=" <input type='text'id='title'name='title'placeholder='Title'/>";
    editForm+=" <input type='text'id='director'name='director'placeholder='DirectorName'/>";
    editForm+="<input type='text'id='genre' name='genre' placeholder='Genre'/>";
    editForm+="<button type='button' onclick='UpdateMovie("+id+")'>Update</button>";
    $('#edit').append(editForm);
    
    
}

function UpdateMovie(id){
    var editMovie={
     "Title": document.getElementById('title').value,
     "DirectorName":document.getElementById('director').value,
     "Genre":document.getElementById('genre').value,
    };
 
    $.ajax({
        type: 'PUT',
        url:'https://localhost:44352/api/movie/'+id,
        dataType:'json',
        data:editMovie,
        success:function(){
         $('#edit').empty();

        },
        error:function(jqXhr,textStatus,errorThrown){
            console.log(errorThrown);
            console.log(editMovie);
        }
    });

}
function DeleteMovie(id){
    $.ajax({
        url:'https://localhost:44352/api/movie/'+id,
        dataType:'json',
        type:'Delete',
        success:function(data,textStatus,jQxhr){
           alert("That movie has been deleted. Please Click the button Generate List to see the new list.")
           $('tbody').empty();
        }
        
    })

}
//  <input type="text"name="title" placeholder="Title"/>
//  <input type="text"name="director"placeholder="DirectorName"/>
//  <input type="text"name="genre"placeholder="Genre"/>
//  <button type="submit">Update</button> 