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
           var stuff = "";
           $.each(data, function(index, value){
               stuff+= "<tr>";
               stuff+="<td>" +value.Title +"</td>";
               stuff+="<td>"+value.DirectorName+"</td>";
               stuff+="<td>"+value.Genre+"</td>";
               stuff+="<td><button onclick='GetSingleMovie(" +value.MovieId+ ")'>Details</button>";
               stuff+="</tr>"
           });
           $('#MovieBody').append(stuff);
        }
    });
}
function GetSingleMovie(id){
    $.ajax({
        url: 'https://localhost:44352/api/movie/'+id,
        dataType:'json',
        type:'Get',
        success: function(data,textStatus,jQxhr){
            var stuff = "";
            stuff+= "<tr>";
            stuff+="<td>" +data.Title +"</td>";
            stuff+="<td>"+data.DirectorName+"</td>";
            stuff+="<td>"+data.Genre+"</td>";
            stuff+="</tr>";
            $('#MovieBody').html(stuff);
        }
    })
    var editForm="";
    editForm+=" <input type='text'id='title'name='title'placeholder='Title'/>";
    editForm+=" <input type='text'id='director'name='director'placeholder='DirectorName'/>";
    editForm+="<input type='text'id='genre' name='genre' placeholder='Genre'/>";
    editForm+="<button onclick='UpdateMovie("+id+")'>Update</button>";
    $('#edit').append(editForm);
    
}

function UpdateMovie(id){
    let editMovie={
     Title: document.getElementById('title').value,
     DirectorName:document.getElementById('director').value,
     Genre:document.getElementById('genre').value,
    }
    $.ajax({
        url:'https://localhost:44352/api/movie/'+id,
        dataType: 'json',
        contentType:'application/json',
        type: 'Put',
        data:JSON.stringify(editMovie),
        success:function(data,textStatus,jQxhr){
         console.log("YEAH");
          },
        error:function(jqXhr,textStatus,errorThrown){
            console.log(errorThrown);
            console.log(editMovie);
        }
    });


}

//  <input type="text"name="title" placeholder="Title"/>
//  <input type="text"name="director"placeholder="DirectorName"/>
//  <input type="text"name="genre"placeholder="Genre"/>
//  <button type="submit">Update</button> 