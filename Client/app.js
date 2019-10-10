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
                console.log("success");
                document.getElementById("")
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
        data: JSON.stringify(),
    })

}