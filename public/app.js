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
                    for (var i = 0; i < data.length; i++) {
                        $("#articleDiv").append("<p data-id='" + data[i]._id + "'>" + data[i].headline + "<br>" + data[i].summary + "<br>" + data[i].URL + "</p>");
                    };
                });
            }
            articlePost();
        }
    });
    
    $(document).on("click", "p", function () {
        $("#notesDiv").empty();

        var thisId = $(this).attr("data-id");

        $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
            .then(function (data) {
                console.log(data);
                $("#notesDiv").append("<h3>" + data.headline + "</h3>");
                $("#notesDiv").append("<input id='titleinput' name = 'title'>");
                $("#notesDiv").append("<textarea id='bodyinput' name='body'> </textarea>")
                $("#notesDiv").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

                if (data.note) {
                    $("#titleinput").val(data.note.title);
                    $("#bodyinput").val(data.note.body);
                }
            })

    });

    $(document).on("click", "#savenote", function () {

        var thisId = $(this).attr("data-id");
        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                title: $("#titleinput").val(),
                body: $("#bodyinput").val()
            }
        })
            .then(function (data) {
                console.log(data);

                $("#notes").empty();
            });
        $("#titleinput").val("");
        $("#bodyinput").val("");
    });

    document.getElementById("reset").onclick = function () {
        console.log("clicked");
        document.getElementById("articleDiv").innerHTML = "";
    };

});