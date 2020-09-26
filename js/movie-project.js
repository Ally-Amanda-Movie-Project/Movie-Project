const url =
    "https://ally-amanda-movie-app.glitch.me/movies"


//3D Carousel
// $('.carousel-3d-controls').mdbCarousel3d();


//Displays initial list of movies

displayMovies();

//Displays the Movie List
function displayMovies () {
    let finalHtml = "";
    fetch(url)
        .then(response => response.json())
        .then(movies => {
            $("#accordionMovies").empty();
            let reverseMovie = movies.reverse()
            reverseMovie.forEach(movie => {
                finalHtml += `<div class="card">`
                finalHtml += `<div class="card-header " id="heading${movie.id}">`
                finalHtml += `<h2 class="mb-0">`
                finalHtml += `<button class="btn btn-link btn-block text-left collapsed movieList" type="button" data-toggle="collapse" data-target="#collapse${movie.id}" aria-expanded="true" aria-controls="collapse${movie.id}">`
                finalHtml += `${movie.title}`
                finalHtml += `</button>`
                finalHtml += `</h2>`
                finalHtml += `</div>`
                finalHtml += `<div id="collapse${movie.id}" class="collapse" aria-labelledby="heading${movie.id}" data-parent="#accordionMovies">`
                finalHtml += `<div class="card-body movieInfo">`
                finalHtml += `<p>Rating: ${movie.rating} <i class="far fa-star"></i></p>`
                finalHtml += `<p>Genre: ${movie.genre}</p>`
                if(typeof movie.review === "undefined") {
                    finalHtml += `<p>Tell us about ${movie.title}!`
                } else {
                    finalHtml += `<p>Review: ${movie.review}</p>`
                }
                if(typeof movie.kindOfLike === "undefined") {
                    finalHtml += `<p>If you like ${movie.title}, you'll really like...`
                } else {
                    finalHtml += `<p>Kind of Like: ${movie.kindOfLike}</p>`
                }
                finalHtml += `<div class="btn-group" role="group" aria-label="edit-and-delete">`
                finalHtml += `<button type="button" data-id=${movie.id} class="btn btn-secondary editMovie buttonDesign">Edit</button>`
                finalHtml += `<button type="button" class="btn btn-secondary deleteMovie buttonDesign" data-id=${movie.id}>Delete</button>`
                finalHtml += `</div>`
                finalHtml += `</div>`
                finalHtml += `</div>`
                finalHtml += `</div>`
            });
            setTimeout(function () {
                $("#loading").css("display", "none");
                document.querySelector("#accordionMovies").innerHTML = finalHtml;
            }, 3000);
        })
        .catch(errors => console.error(errors));
}


//Modal function
$(document).on("click", ".editMovie", function (e) {
    e.preventDefault();
    let movieID = $(this).data("id");
    let displayURL = `${url}/${movieID}`
    console.log(movieID)
    fetch(displayURL)
        .then(response => response.json())
        .then(movie => {
            $("#editMovieTitle").val(movie.title);
            $("#editMovieRating").val(movie.rating);
            $("#editMovieGenre").val(movie.genre);
            $("#editMovieReview").val(movie.review);
            $("#editMovieKOL").val(movie.kindOfLike);
        })
        .catch(errors => console.log(errors));
    $("#myModal").modal("toggle")
    $("#saveChanges").attr("data-id", movieID);
})

$("#saveChanges").click(function () {
    let movieID = $(this).data("id");
    console.log(movieID);
    editMovie(movieID);
    $("#myModal").modal('hide');
})

$(document).on("click", ".close", function () {
    $("#myModal").modal("hide");
})

$(document).on("click", ".deleteMovie", function (e) {
    let movieID = $(this).data("id");
    deleteMovie(movieID)
})

//Button to add a movie
$("#addMovieButton").click(function (e) {
    e.preventDefault();
    addMovie()
})



/*Functions*/
//Adds a movie to server
function addMovie () {
    let userMovieTitle = document.getElementById("addMovieTitle").value
    let userMovieRating = document.getElementById("addMovieRating").value
    let userMovieGenre = document.getElementById("addMovieGenre").value

    const movies = {
        "title": userMovieTitle,
        "rating": userMovieRating,
        "genre": userMovieGenre
    };

    const options = {
        "method": "POST",
        "headers": {
            'Content-Type': 'application/json'
        },
        "body": JSON.stringify(movies)
    };


    fetch(url, options)
        .then(response => response.json())
        .then(movie => {
            $("#loading").css("display", "block");
            displayMovies();
        })
        .catch(errors => console.log(errors));

}

// Edit an existing movie
function editMovie (id) {
    let displayURL = `${url}/${id}`
    let editMovieTitle = document.getElementById("editMovieTitle").value
    let editMovieRating = document.getElementById("editMovieRating").value
    let editMovieGenre = document.getElementById("editMovieGenre").value
    let editMovieReview = document.getElementById("editMovieReview").value
    let editMovieKOL = document.getElementById("editMovieKOL").value

    const movies = {
        "title": editMovieTitle,
        "rating": editMovieRating,
        "genre": editMovieGenre,
        "review": editMovieReview,
        "kindOfLike": editMovieKOL
    }

    const options = {
        "method": "PUT",
        "headers": {
            'Content-Type' : 'application/json'
        },
        "body": JSON.stringify(movies)
    }

    fetch(displayURL, options)
        .then(response => response.json())
        .then(movie => {
            $("#loading").css("display", "block")
        displayMovies()
        })
        .catch(errors => console.log(errors));
}

//Delete an existing movie
function deleteMovie (id) {
    let deleteMovieAlert = confirm("Are you sure you want to delete this movie?");
    if (deleteMovieAlert === true) {
        let displayURL = `${url}/${id}`

        const options = {
            "method": "DELETE",
            "headers": {
                'Content-Type': 'application/json'
            }
        }

        fetch(displayURL, options)
            .then(response => response.json)
            .then(movie => {
                $("#loading").css("display", "block");
                displayMovies()
            })
            .catch(errors => console.log(errors));
    }
}


// select menu stay open
$('.selectMenu').on('click', function(e) {
    e.stopPropagation();
});