// onClick for /scrape 
//AJAX request to /scrape endpoint
//submit a Second AJAX request to articles endpoint
//append articles to page 

$(document).ready(function () {
    $(document).on("click", "#scrapeButton", function () {
        $.ajax({
            method: "GET",
            url: "/scrape",
            success: function () {
                articleGET();
            }
        })
        function articleGET() {
            $.ajax({
                method: "GET",
                url: "/articles"
            });
            function articlePost() {
                $.getJSON("/articles", function (data) {
                    $("#articleDiv").empty(); 
                    for (var i = 0; i < data.length; i++){ 
                        $("#articleDiv").append("<p>" + data[i].headline + "<br>"  + data[i].summary + "<br>"  + data[i].URL+ "</p>");
                    };
                });
            }
            articlePost();
        }
    })
})