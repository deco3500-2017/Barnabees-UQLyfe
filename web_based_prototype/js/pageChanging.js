$(document).ready(function(){    
    
    // When you click a 'button' with a 'page' attribute
    //   set the src of the 'mainFrame' to the value.
    $("#mainFrame").on( "load", function() {
        $("#mainFrame").contents().on("click", "button", function() {
            if ( $(this).attr("page") != undefined) {
                $("#mainFrame").attr("src", $(this).attr("page") );
            }
        });
    });
    
    // When you click the 'home' button in index.html
    $("#home").click(function(){
        $("#mainFrame").attr("src", "home.html" );
    })
 
})  