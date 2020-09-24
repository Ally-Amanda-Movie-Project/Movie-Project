$(document).ready(function () {

    // Grabs any list items in local storage
    $('#list-items').html(localStorage.getItem('listItems'));

    // add items
    $('.add-items').submit(function (event) {
        //prevents the page from refreshing
        event.preventDefault();

        var item = $('#todo-list-item').val();

        if(item) {
            $("#list-items").append("<li class='list-group-item form-check'><input class='checkbox form-check-input' type='checkbox'/><label class=\"form-check-label\" for=\"defaultCheck1\">" + item + "</label><a class='remove'><i class=\"far fa-trash-alt\"></i> </a></li>");
            // adds item to local storage
            localStorage.setItem('listItems', $("#list-items").html());
            $('#todo-list-item').val("");
        }
    });

    $(document).on('click','.checkbox', function () {
        if($(this).attr('checked')) {
            $(this).removeAttr('checked');
        } else {
            $(this).attr('checked','checked');
        }
        $(this).parent().toggleClass('completed');

        localStorage.setItem('listItems', $('#list-items').html());
    });

    $(document).on('click','.remove', function () {
        $(this).parent().remove();
        localStorage.setItem('listItems', $('#list-items').html());

    });

});