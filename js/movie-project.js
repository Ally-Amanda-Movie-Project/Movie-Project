const url =
    "https://ally-amanda-movie-app.glitch.me/movies"


//3D Carousel
// $('.carousel-3d-controls').mdbCarousel3d();

const omdbUrl = `http://www.omdbapi.com/?apikey=${movieKey}&`


//Displays initial list of movies
displayMovies();
displayCarousel();

//Displays the Movie List
function displayMovies () {
    let starCount = ["&#9734", "&#9734", "&#9734", "&#9734", "&#9734"];
    let userRating = "";
    let finalHtml = "";
    fetch(url)
        .then(response => response.json())
        .then(movies => {
            $("#accordionMovies").empty();
            let reverseMovie = movies.reverse()
            reverseMovie.forEach(movie => {
                //changes number rating to a star rating
                for(let i = 0; i < movie.rating; i++) {
                    userRating += starCount[i];
                }
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
                finalHtml += `<img src="${movie.poster}" alt=""/>`
                finalHtml += `<p>Rating: ${userRating}</p>`
                finalHtml += `<p>Year: ${movie.year}</p>`
                finalHtml += `<p>Genre: ${movie.genre}</p>`
                finalHtml += `<p>Director: ${movie.director}</p>`
                finalHtml += `<p>Actors: ${movie.actors}</p>`
                finalHtml += `<p>Plot: ${movie.plot}</p>`
                if(typeof movie.watch === "undefined") {
                    finalHtml += `<p>Where did you watch ${movie.title}?`
                } else {
                    finalHtml += `<p>Whatched on: ${movie.watch}</p>`
                }
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
                //clears out the userRating variable so it doesn't add too many stars to the list item.
                userRating = "";
            });
            setTimeout(function () {
                $("#loading").css("display", "none");
                document.querySelector("#accordionMovies").innerHTML = finalHtml;
            }, 3000);
        })
        .catch(errors => console.error(errors));
}

function displayCarousel() {
    let starCount = ["&#9734", "&#9734", "&#9734", "&#9734", "&#9734"];
    let finalHTML = "";
    let userRating = "";
    $(".carousel-inner").empty();
    fetch(url)
        .then(response => response.json())
        .then(movies => {
            movies.forEach(movie => {
                for(let i = 0; i < movie.rating; i++) {
                    userRating += starCount[i];
                }
                if(movie === movies[0]) {
                    finalHTML += `<div class="carousel-item active">`
                } else {
                    finalHTML += `<div class="carousel-item">`
                }
                finalHTML +=`<img src="${movie.poster}" class="d-block w-100" alt="...">`
                finalHTML += `<div class="carousel-caption d-md-block">`
                finalHTML +=`<h5>`
                finalHTML +=  `${movie.title}`
                finalHTML += `</h5>`
                finalHTML += `<p>`
                finalHTML +=  `${userRating}`
                finalHTML += `</p>`
                finalHTML +=`<p>`
                finalHTML +=  `${movie.review}`
                finalHTML += `</p>`
                finalHTML += `</div>`
                finalHTML +=`</div>`
                //clears out the userRating variable so it doesn't add too many stars to the list item.
                userRating = "";
            })
            document.querySelector(".carousel-inner").innerHTML = finalHTML;
            //clears out the userRating variable so it doesn't add too many stars to the list item.
            userRating = "";
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
            $("#editMovieRating").val(movie.rating);
            $(".movie-title").html(movie.title)
            $("#editMovieWatch").val(movie.watch);
            $("#editMovieReview").val(movie.review);
            $("#editMovieKOL").val(movie.kindOfLike);
            $("#saveChanges").attr("data-id", movieID);
        })
        .catch(errors => console.log(errors));
    $("#myModal").modal("toggle")
})


//This saves the edited rating
$("#saveChanges").click(function () {
    let movieID = $("#saveChanges").attr("data-id");
    console.log(movieID);
    editMovie(movieID);
    $("#myModal").modal('hide');
})

//hides the modal when they click "x"
$(document).on("click", ".close", function () {
    $("#saveChanges").removeAttr("data-id");
    $(".movie-title").html(" ");
    $("#myModal").modal("hide");
})

//deletes a movie
$(document).on("click", ".deleteMovie", function () {
    let movieID = $(this).data("id");
    deleteMovie(movieID)
})

//Button to add a movie
$("#addMovieButton").click(function (e) {
    e.preventDefault();
    addMovie($("#addMovieTitle").val().trim());
})

// select menu stay open on add movie button
$(".selectMenu").on('click', function(e) {
    e.stopPropagation();
});



/* --- ~~~ Functions ~~~ --- */
//Adds a movie to server
function addMovie (movie) {

    let userMovieRating = $("#addMovieRating").val();

    //fetches information from the OMDB api
    fetch(`${omdbUrl}t=${movie}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const movies = {
                "poster": data.Poster,
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

// TODO change to only allow user to edit rating
// Edit an existing movie
function editMovie (id) {
    let displayURL = `${url}/${id}`
    let editMovieRating = document.getElementById("editMovieRating").value   
    let editMovieWatch = document.getElementById("editMovieWatch").value
    let editMovieReview = document.getElementById("editMovieReview").value
    let editMovieKOL = document.getElementById("editMovieKOL").value

    const movies = {
        "rating": editMovieRating,
        "watch": editMovieWatch,
        "review": editMovieReview,
        "kindOfLike": editMovieKOL
    }

    const options = {
        "method": "PATCH",
        "headers": {
            'Content-Type' : 'application/json'
        },
        "body": JSON.stringify(movies)
    }

    fetch(displayURL, options)
        .then(response => response.json())
        .then(movie => {
            $("#loading").css("display", "block")
            displayMovies();
            displayCarousel();
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
                displayMovies();
                displayCarousel();
            })
            .catch(errors => console.log(errors));
    }
}