const url =
    "https://ally-amanda-movie-app.glitch.me/movies"
let finalHtml = "";

fetch(url)
    .then(response => response.json())
    .then(movies => console.log(movies))
        // for(let i=0; i<=movies.length; i++) {
        //     finalHtml += `<div class='movie'> <h1>${movies[i].title}</h1> <h3>${movies[i].rating}</h3> </div>`;
        // }
        // document.body.innerHTML = finalHtml;
// })
    .catch(errors => console.error(errors));


//Adds a movie to server
function addMovie () {
    const movies = {
        "title": "Great Movie",
        "rating": 4,
    };

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

