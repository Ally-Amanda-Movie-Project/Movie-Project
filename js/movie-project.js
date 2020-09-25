const url =
    "https://ally-amanda-movie-app.glitch.me/movies"

//Displays initial list of movies
displayMovies();

//Displays the Movie List
function displayMovies () {
    let finalHtml = "";
    fetch(url)
        .then(response => response.json())
        .then(movies => {
            let reverseMovie = movies.reverse()
            console.log(movies)
            reverseMovie.forEach(movie => {
                finalHtml += `<div class="card">
                    <div class="card-header" id="heading${movie.id}">
                        <h2 class="mb-0">
                            <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapse${movie.id}" aria-expanded="true" aria-controls="collapse${movie.id}">
                                ${movie.title}
                            </button>
                        </h2>
                    </div>

                    <div id="collapse${movie.id}" class="collapse" aria-labelledby="heading${movie.id}" data-parent="#accordionMovies">
                        <div class="card-body">
                            Image: 
                            <br>
                            Rating: ${movie.rating}
                            <br>
                            Genre: ${movie.genre}
                            <br>
                            Review: ${movie.review}
                            <br>
                            <div class="btn-group" role="group" aria-label="edit-and-delete">
                                <button type="button" data-id=${movie.id} class="btn btn-secondary editMovie">Edit Movie</button>
                               <button type="button" class="btn btn-secondary deleteMovie" data-id=${movie.id}>Delete</button>     
                           </div>
                        </div>
                    </div>
                </div>`
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
            $("#saveChanges").attr("data-id", movie.id)
        })
        .catch(errors => console.log(errors));
    $("#myModal").modal("toggle")
})

$(document).on("click", "#saveChanges", function () {
    let movieID = $(this).data("id");
    editMovie(movieID);
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

    const movies = {
        "title": editMovieTitle,
        "rating": editMovieRating,
        "genre": editMovieGenre,
        "review": editMovieReview
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
        .then(movie =>
            displayMovies())
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
            .then(movie =>
                displayMovies())
            .catch(errors => console.log(errors));
    }
}


// select menu stay open
$('.selectMenu').on('click', function(e) {
    e.stopPropagation();
});