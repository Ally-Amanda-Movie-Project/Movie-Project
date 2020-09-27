$(document).ready(function () {

    // Grabs any list items in local storage
    $('#list-items').html(localStorage.getItem('listItems'));

    // add items
    $('.add-items').submit(function (event) {
        //prevents the page from refreshing
        event.preventDefault();
        let finalHtml = ""
        let item = $('#todo-list-item').val();

        if(item) {
            finalHtml += `<li class='list-group-item form-check'>`
            finalHtml += `<label class="form-check-label" for="defaultCheck1">`
            finalHtml += `${item}`
            finalHtml += `</label>`
            finalHtml += `<a class='remove'>`
            finalHtml += `<i class=\"far fa-trash-alt\"></i>`
            finalHtml += `</a>`
            finalHtml += `<a class='addWatchlistMovie' id="${item}">`
            finalHtml += ` `
            finalHtml += `<i class=\"far fa-plus-square\"></i>`
            finalHtml += `</a>`
            finalHtml += `</li>`

            $("#list-items").append(finalHtml);
            // adds item to local storage
            localStorage.setItem('listItems', $("#list-items").html());
            $('#todo-list-item').val("");
        }
    });


    $(document).on('click','.remove', function () {
        $(this).parent().remove();
        localStorage.setItem('listItems', $('#list-items').html());

    });

    $(document).on('click', '.addWatchlistMovie', function () {
        let watchlistMovie = $(this).attr("id")
        console.log(watchlistMovie);
        $(".movie-title").html(watchlistMovie)
        $("#addMovieWatchlist").attr("data-id", watchlistMovie);
        $("#addModal").modal("toggle");
    })

    $(document).on('click', '#addMovieWatchlist', function () {
        let watchlistMovie = $("#addMovieWatchlist").attr("data-id");
        addMovieFromWatchlist(watchlistMovie)
        $(".remove").parent().remove();
        localStorage.setItem('listItems', $('#list-items').html());
        $("#addModal").modal("hide");
    })


    function addMovieFromWatchlist (movie) {
        let addMovieRatingWatchlist = document.getElementById("addMovieRatingWatchlist").value
        let addMovieWatchWatchlist = document.getElementById("addMovieWatchWatchlist").value
        let addMovieReviewWatchlist = document.getElementById("addMovieReviewWatchlist").value
        let addMovieKOLWatchlist = document.getElementById("addMovieKOLWatchlist").value

        fetch(`${omdbUrl}t=${movie}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const movies = {
                    "poster": data.Poster,
                    "title": data.Title,
                    "rating": addMovieRatingWatchlist,
                    "year": data.Year,
                    "genre": data.Genre,
                    "director": data.Director,
                    "actors": data.Actors,
                    "plot": data.Plot,
                    "watch": addMovieWatchWatchlist,
                    "review": addMovieReviewWatchlist,
                    "kindOfLike": addMovieKOLWatchlist
                }

                const options = {
                    "method": "POST",
                    "headers": {
                        'Content-Type': 'application/json'
                    },
                    "body": JSON.stringify(movies)
                }

                //adds the data fetched from OMDB and posts it onto our api
                fetch(url, options)
                    .then(response => response.json())
                    .then(movie => {
                        $("#loading").css("display", "block");
                        displayMovies();
                        displayCarousel();
                    })
                    .catch(errors => console.log(errors));
            })
            .catch(errors => console.log(errors))
    }


});