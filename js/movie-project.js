
//Adds a movie to server
function addMovie () {
    const movies = {
        "title": "Great Movie",
        "rating": 4,
    };
    const url =
        "https://ally-amanda-movie-app.glitch.me/movies"

    const options = {
        "method": "POST",
        "headers": {
            'Content-Type': 'application/json'
        },
        "body": JSON.stringify(movies)
    };


    fetch(url, options)
        .then(response => console.log(response))
        .catch(errors => console.log(errors));
}

// Edit an existing movie
function editMovie () {
    const movies = {
        "title": "The Little Mermaid",
        "rating": 4,
    }
    const url =
         "https://ally-amanda-movie-app.glitch.me/movies/23"

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

    const url =
        "https://ally-amanda-movie-app.glitch.me/movies/8"

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

