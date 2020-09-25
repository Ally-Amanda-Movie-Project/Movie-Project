const url =
    "https://ally-amanda-movie-app.glitch.me/movies"


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
                            Review:
                            <br>
                            <div class="btn-group" role="group" aria-label="edit-and-delete">
                                <button type="button" data-id=${movie.id} class="btn btn-secondary editMovie">Edit Movie</button>
                                <button type="button" class="btn btn-secondary      deleteMovie">Delete</button>     
                           </div>
                        </div>
                    </div>
                </div>`
            });

            document.querySelector("#accordionMovies").innerHTML = finalHtml;
        })
        .catch(errors => console.error(errors));
}




//Modal function

$(document).on("click", ".editMovie", function (e) {

    var movieID = $(this).data("id");
    // movieID = (movieID);
    e.preventDefault();
    $("#myModal").modal("toggle");
    console.log(movieID)
    console.log(typeof movieID);
    $("#myModal").on("shown.bs.modal", function (e) {
        // e.preventDefault();
        $(".modal-body").empty()
        let finalHtml = "";
        let displayURL = `${url}/${movieID}`
        fetch(displayURL)
            .then(response => response.json())
            .then(movies => {
            if (movies.id === movieID) {
                finalHtml += `${movies.id}`
                document.querySelector(".modal-body").innerHTML = finalHtml;
            }})
        });
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
function editMovie () {
    const movies = {
        "title": "The Little Mermaid",
        "rating": 4,
    }

    const options = {
        "method": "PATCH",
        "headers": {
            'Content-Type' : 'application/json'
        },
        "body": JSON.stringify(movies)
    }

    fetch(url, options)
        .then(response => console.log(response))
        .catch(errors => console.log(errors));
}

//Delete an existing movie
function deleteMovie () {

    const options = {
        "method": "DELETE",
        "headers": {
            'Content-Type' : 'application/json'
        }
    }

    fetch(url, options)
        .then(response => console.log(response))
        .catch(errors => console.log(errors));
 }


// select menu stay open
$('.selectMenu').on('click', function(e) {
    e.stopPropagation();
});