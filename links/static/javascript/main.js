/**
 * Created by Martin on 12/22/2015.
 */

$(document).on('pageinit', '#pageone', function(){

    <!-- set link as seen -->
    $(document).on('click', '.button-link', function(e) {
        //alert('clicked huh');
        var fullId = $(this).closest('a').attr('id');
        //alert(fullId);

        // AJAX acknowledge
        $.ajax({
            url: 'link_seen/',
            type: 'POST',
            data: {
                id: fullId,
                viewed: new Date()
            },

            // successful response
            success: function (json) {
                //alert('success');
                $('#div' + fullId).html(json.title + ' &nbsp-&nbsp viewed ' + json.viewed);
                $('#div' + fullId).removeClass( "unseen-text" ).addClass( "seen-text" );

                //window.location.href = "" + json.link;
                //window.open("" + json.link, '_blank');
            },

            // non-successful response
            error: function (xhr, errmsg, err) {
                alert('failure');
                console.log(xhr.status + ': ' + xhr.responseText); // log the error to the console
            }
        });
    });

    <!-- delete link -->
    $("a[id^=delete]").on('click', function(){
        //alert('clicked');
        var fullId = $(this).closest('a').attr('id');
        var id = fullId.substring(6);

        // AJAX acknowledge
        $.ajax({
            url: 'link_delete/',
            type: 'POST',
            data: {
                id: id
            },

            // successful response
            success: function (json) {
                //alert('success');
                //$(this).parent().remove();
                $("#select_link option[value='" + fullId + "']").remove();
                $("#select_link option[value='" + id + "']").remove();
                $('#' + fullId).fadeOut(1000);
                $('#' + id).fadeOut(1000);
            },

            // non-successful response
            error: function (xhr, errmsg, err) {
                alert('failure');
                console.log(xhr.status + ': ' + xhr.responseText); // log the error to the console
            }
        });
    });

    <!-- add link -->
    $(document).on('click', '#button_add', function(e) {
        var title = $('#title').val();
        var link = $('#link').val();

        // AJAX acknowledge
        $.ajax({
            url: 'link_add/',
            type: 'POST',
            data: {
                title: title,
                link: link
            },

            // successful response
            success: function (json) {
                $('<li><a href="' + json.link + '" target="_blank"><div id="div' + json.id + '" class="unseen-text">' + json.title + '</div></a></li>').hide().prependTo('#linkList').slideDown("slow");
                $('#linkList').listview('refresh');
            },

            // non-successful response
            error: function (xhr, errmsg, err) {
                alert('failure');
                console.log(xhr.status + ': ' + xhr.responseText); // log the error to the console
            }
        });
    });

    $("a[id^=2delete]").on('click', function(){
        alert('clicked');
        var fullId = $(this).closest('a').attr('id');
        var id = fullId.substring(6);
        alert(fullId);
        alert(id);
        $(this).parent().remove();
        $('#linkList').listview('refresh');
    });

    $("#title, #link").on('keyup focusout', function(){
        //alert('sup');
        if ($('#title').val().length > 0 && $('#link').val().length > 0) {
            $('#button_add').removeClass("ui-disabled");
        }
        else {
            $('#button_add').removeClass("ui-disabled").addClass("ui-disabled");
        }
    });

    // get cookie with a given name
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

	// csrf token
    var csrftoken = getCookie('csrftoken');

    /*
    The functions below will create a header with csrftoken
    */

	// these HTTP methods do not require CSRF protection
    function csrfSafeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

	// test that a given url is a same-origin URL.  URL could be relative or scheme relative or absolute
    function sameOrigin(url) {
        // test that a given url is a same-origin URL
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }

	// send the token to same-origin, relative URLs only.  Send the token only if the method warrants CSRF protection (Using the CSRFToken value acquired earlier)
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                xhr.setRequestHeader('X-CSRFToken', csrftoken);
            }
        }
    });
});



var resultObject = {
    formSubmitionResult : null
};




