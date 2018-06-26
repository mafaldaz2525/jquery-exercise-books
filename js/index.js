var routes = [
    {
        "path": "/",
        "component": "list.html",
        "controller": function(){
            $.getJSON('./js/books.json').done(function(response){
                let items = response.items;
                let template;

                $.ajax(
                    {
                        url: './components/templates/card.html',
                        type: 'GET',
                        dataType: 'text',
                        success: function(response){
                            for(let i=0; i < items.length; i++){
                                $('#books').append(response);

                            }                            
                        },
                        error: function(error){
                            console.log(error);
                        },
                        complete: function(xhr, status){
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
        "controller": function(id){

        }
    }
];


$(document).ready(function(){
    $('.toggle-sidebar').click(function(event){
        event.preventDefault();
        if(!$('.left-aside').hasClass('aside-close')){
            $('.left-aside').toggleClass('aside-close');            
            $('.left-aside').animate({
                width: '50px'
            }, function(){
                $('.main-section').toggleClass('main-collape');
            });
        }else {
            $('.main-section').toggleClass('main-collape');
            $('.left-aside').animate({
                width: '300px'
            }, function(){                
                $(this).toggleClass('aside-close');               
            });
        }        
    });
    
    $(window).on('load', function(e){
        let loc = e.originalEvent.target.location;
        router(loc);
    });

    $(window).on('hashchange', function(e){
        let event = e.originalEvent;
        console.log(event);
        let hash =event.newURL.split('#')[1];
        
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
    });
});

function router(ltn){
    let loc = ltn;
    let hash = loc.hash.split("#")[1];

    routes.map(function(data){
        let url = loc.hash.slice(1) || '/';
        console.log(url);

        if(url == "/" && data.path == "/"){
            getContent("./components/" + data.component, data.controller);
        }
    });
}

function getContent(url, callback, param){
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'text',
        success: function(response){
            $("#content").html(response);
            if(param != undefined){
                callback(param);
            }else {
                callback();
            }
        },
        error: function(error){
            console.log(error);
        },
        complete: function(xhr, status){
            console.log(status);
        }
    });
}

function loadBooks(){
    

    $.ajax({
        url: './components/list.html',
        type: 'GET',
        dataType: 'text',
        success: function(response) {
            
            $("#content").html(response);

            

            
        

        },
        error: function(error) {
            console.log(error);
        },
        complete: function(xhr, status){
            console.log(status);
        }
    });
}