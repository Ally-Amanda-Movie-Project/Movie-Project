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
        addMovie(watchlistMovie);
        $(this).parent().remove();
    })

});