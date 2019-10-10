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
                console.log("success"),
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
            stuff+="<td><button onclick='UpdateMovie(" +value.MovieId+ ")'>Update</button>";
            stuff+="</tr>";
            $('#MovieBody').html(stuff);
        }
    })
}