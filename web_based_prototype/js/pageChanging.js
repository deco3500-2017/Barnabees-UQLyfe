$(document).ready(function(){    
    
    $("#mainFrame").on( "load", function() {
        $("#mainFrame").contents().on("click", "button", function() {
            $("#mainFrame").attr("src", $(this).attr("page") );
        });
    });
    
    $("#home").click(function(){
        $("#mainFrame").attr("src", "home.html" );
    })
 
})  