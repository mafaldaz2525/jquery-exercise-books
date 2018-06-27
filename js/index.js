var routes = [
    {
        "path": "/",
        "component": "list.html",
        "controller": function () {
            $.getJSON('./js/books.json').done(function (response) {
                let items = response.items;
                let template;

                $.ajax(
                    {
                        url: './components/templates/card.html',
                        type: 'GET',
                        dataType: 'text',
                        success: function (response) {
                            template = response;
                            for (let i = 0; i < items.length; i++) {
                                //Obtiene los valores
                                let newTempleate = template.slice(0);
                                //los tomo del json
                                let volInfo = items[i].volumeInfo;
                                let id = items[i].id;
                                let keys = Object.keys(volInfo);
                                let link = "#/detail/" + id;

                                newTempleate = newTempleate.replace("{{routeLink}}", link).slice(0);

                                for (let j = 0; j < keys.length; j++) {
                                    if (keys[j] == 'imageLinks') {
                                        let urlImage = volInfo[keys[j]].smallThumbnail;
                                        newTempleate = newTempleate.replace("{{" + keys[j] + "}}", urlImage);
                                    } else {
                                        let texBook = volInfo[keys[j]];
                                        newTempleate = newTempleate.replace("{{" + keys[j] + "}}", texBook).slice(0);
                                    }
                                }

                                $('#books').append(newTempleate);

                            }
                        },
                        error: function (error) {
                            console.log(error);
                        },
                        complete: function (xhr, status) {
                            console.log(status);
                        }
                    }
                );


            });
        }

    },
    {
        "path": "/detail/:id",
        "component": "detail.html",
        "controller": function (id) {
            $.getJSON('./js/books,json').done(function (response) {
                let items = response.items;
                items.find(function (elem) {
                    return elem.id == id;
                });

                let templeate;

                $.ajax({
                    url:'./components/templeates/books.html',
                    type: 'GET',
                    dataType: 'text',

                });

            });

        }
    }
];


$(document).ready(function () {
    $('.toggle-sidebar').click(function (event) {
        event.preventDefault();
        if (!$('.left-aside').hasClass('aside-close')) {
            $('.left-aside').toggleClass('aside-close');
            $('.left-aside').animate({
                width: '50px'
            }, function () {
                $('.main-section').toggleClass('main-collape');
            });
        } else {
            $('.main-section').toggleClass('main-collape');
            $('.left-aside').animate({
                width: '300px'
            }, function () {
                $(this).toggleClass('aside-close');
            });
        }
    });

    $(window).on('load', function (e) {
        let loc = e.originalEvent.target.location;
        router(loc);
    });

    $(window).on('hashchange', function (e) {
        let event = e.originalEvent;
        console.log(event);
        router(event.target.location);

        /*let hash =event.newURL.split('#')[1];
        
        $.ajax({
            url: './' + hash,
            type: 'GET',
            dataType: 'text',
            success: function(response) {
                console.log("Success: \n" + response);
                $("#content").html(response);
            },
            error: function(error) {
                console.log(error);
            },
            complete: function(xhr, status){
                console.log(status);
            }
        });
        */
    });
});

function router(ltn) {
    let loc = ltn;
    let hash = loc.hash.split("#")[1];

    routes.map(function (data) {
        let url = loc.hash.slice(1) || '/';
        let parts = url.substr(1).split('/'), param;
        console.log(url);

        if (url == "/" && data.path == "/") {
            getContent("./components/" + data.component, data.controller);
        }
        else if (data.path.match(/:id/g)) {
            let mod = data.path.split("/:id")[0].slice(1);
            while (parts.length) {
                if (parts.shift() === mod) {
                    param = parts.shift();
                    getContent("./components/" + data.component, data.controller, param)
                }
                else {
                    parts.shift();
                }
            }
        }

    });
}

function getContent(url, callback, param) {
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'text',
        success: function (response) {
            $("#content").html(response);
            if (param != undefined) {
                callback(param);
            } else {
                callback();
            }
        },
        error: function (error) {
            console.log(error);
        },
        complete: function (xhr, status) {
            console.log(status);
        }
    });
}

function loadBooks() {


    $.ajax({
        url: './components/list.html',
        type: 'GET',
        dataType: 'text',
        success: function (response) {

            $("#content").html(response);






        },
        error: function (error) {
            console.log(error);
        },
        complete: function (xhr, status) {
            console.log(status);
        }
    });
}