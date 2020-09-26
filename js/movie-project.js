const url =
    "https://ally-amanda-movie-app.glitch.me/movies"


//3D Carousel
// $('.carousel-3d-controls').mdbCarousel3d();

const omdbUrl = `http://www.omdbapi.com/?apikey=${movieKey}&`


//Displays initial list of movies
displayMovies();

//Displays the Movie List
function displayMovies () {
    let starCount = ["&#9734", "&#9734", "&#9734", "&#9734", "&#9734"]
    let userRating = ""
    let finalHtml = "";
    fetch(url)
        .then(response => response.json())
        .then(movies => {
            $("#accordionMovies").empty();
            let reverseMovie = movies.reverse()
            reverseMovie.forEach(movie => {
                for(let i = 0; i < movie.rating; i++) {
                    userRating += starCount[i];
                }
                finalHtml += `<div class="card">`
                finalHtml += `<div class="card-header" id="heading${movie.id}">`
                finalHtml += `<h2 class="mb-0">`
                finalHtml += `<button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapse${movie.id}" aria-expanded="true" aria-controls="collapse${movie.id}">`
                finalHtml += `${movie.title}`
                finalHtml += `</button>`
                finalHtml += `</h2>`
                finalHtml += `</div>`
                finalHtml += `<div id="collapse${movie.id}" class="collapse" aria-labelledby="heading${movie.id}" data-parent="#accordionMovies">`
                finalHtml += `<div class="card-body">`
                finalHtml += `<p>Rating: ${userRating}</p>`
                finalHtml += `<p>Year: ${movie.year}</p>`
                finalHtml += `<p>Genre: ${movie.genre}</p>`
                finalHtml += `<p>Director: ${movie.director}</p>`
                finalHtml += `<p>Actors: ${movie.actors}</p>`
                finalHtml += `<p>Plot: ${movie.plot}</p>`
                if(typeof movie.review === "undefined") {
                    finalHtml += `<p>Tell us about ${movie.title}!`
                } else {
                    finalHtml += `<p>Review: ${movie.review}</p>`
                }
                finalHtml += `<div class="btn-group" role="group" aria-label="edit-and-delete">`
                finalHtml += `<button type="button" data-id=${movie.id} class="btn btn-secondary editMovie">Edit</button>`
                finalHtml += `<button type="button" class="btn btn-secondary deleteMovie" data-id=${movie.id}>Delete</button>`
                finalHtml += `</div>`
                finalHtml += `</div>`
                finalHtml += `</div>`
                finalHtml += `</div>`
                userRating = "";
            });
            setTimeout(function () {
                $("#loading").css("display", "none");
                document.querySelector("#accordionMovies").innerHTML = finalHtml;
            }, 3000);
        })
        .catch(errors => console.error(errors));
}


/* --- ~~~ Event Listeners ~~~ --- */
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
    addMovie($("#addMovieTitle").val().trim());
})

// select menu stay open
$(".selectMenu").on('click', function(e) {
    e.stopPropagation();
});



/* --- ~~~ Functions ~~~ --- */
//Adds a movie to server
function addMovie (movie) {

    let userMovieRating = $("#addMovieRating").val();

    fetch(`${omdbUrl}t=${movie}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const movies = {
                "title": data.Title,
                "rating": userMovieRating,
                "year": data.Year,
                "genre": data.Genre,
                "director": data.Director,
                "actors": data.Actors,
                "plot": data.Plot
            }

            const options = {
                "method": "POST",
                "headers": {
                    'Content-Type': 'application/json'
                },
                "body": JSON.stringify(movies)
            }

            fetch(url, options)
                .then(response => response.json())
                .then(movie => {
                    $("#loading").css("display", "block");
                    displayMovies();
                })
                .catch(errors => console.log(errors));
        })
        .catch(errors => console.log(errors))
}

// Edit an existing movie
function editMovie (id) {
    let displayURL = `${url}/${id}`
    let editMovieTitle = document.getElementById("editMovieTitle").value
    let editMovieRating = document.getElementById("editMovieRating").value
    let editMovieGenre = document.getElementById("editMovieGenre").value
    let editMovieReview = document.getElementById("editMovieReview").value


    const movies = {
        "title": editMovieTitle,
        "rating": editMovieRating,
        "genre": editMovieGenre,
        "review": editMovieReview
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