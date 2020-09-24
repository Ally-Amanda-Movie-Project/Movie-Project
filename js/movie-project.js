const url =
    "https://ally-amanda-movie-app.glitch.me/movies"


displayMovies();

//Displays the Movie List
function displayMovies () {
    let finalHtml = "";
    fetch(url)
        .then(response => response.json())
        .then(movies => {
            console.log(movies)
            movies.forEach(movie => {
                finalHtml += `<a href="#" class="list-group-item list-group-item-action movie d-flex 
justify-content-between" data-id="${movie.id}" data-target="#exampleModalCenter"><span 
class="text-left">${movie.title}</span><span class="text-center">${movie.title}</span><span class="text-right">${movie.rating}</span></a>`
            });
            document.querySelector(".list-group").innerHTML = finalHtml;
        })
        .catch(errors => console.error(errors));
}




//Modal function

    // $("#exampleModalCenter").modal("toggle", function(e){
    //     e.preventDefault()
    //     let movieID = $(this).data("id");
    //     let finalHTM = ""
    //     let displayURL = `${url}/${movieID}`
    // fetch(displayURL)
    //     .then(response => response.json())
    //     .then(modal => {
    //         // finalHTM += "<p>lasdfjalsdfjasldkfj</p>"
    //     // document.querySelector(".modal-body").innerHTML = finalHTM;
    //         console.log(movieID);
    //     })
    // });


//`<button class=“edit” data-id=“${id}” ><i class=“far fa-edit”></i></button>`

//$(document).on("click", ".edit", function(e){
//     e.preventDefault();
//     console.log("bacon");
//     let editID = $(this).data("id");
//     console.log(editID);

// document.getElementById("add-movie").addEventListener("click", function (e) {
//     e.preventDefault();
//     addMovie();
// })


/*Functions*/
//Adds a movie to server
function addMovie () {
    let userMovieTitle = document.getElementById("movie-title").value
    let userMovieRating = document.getElementById("rating").value

    const movies = {
        "title": userMovieTitle,
        "rating": userMovieRating,
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

