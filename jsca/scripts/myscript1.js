// JavaScript Document

/*
15 anonymous functions
3 named functions

$('main div')
select all divs inside element main

$("h1, h2, main ul")
select all div ul elements inside element main
and all h1 and h2 elements

$(this).prev()
$(this).next()
adjacent sibling selectors.

$('a').attr('href', "#");
change attribute 'href' of elements 'a'

$("#setupLeft").replaceWith(divElem);
jquery replace element

$('main div').delay(800).animate({fontSize: '3em'}, "slow");
jquery delay
jQuery Method Chaining

*/

var jclass = 1;

$(document).ready(function () {
    console.log("page load");


    // 1
    // a key is pressed,  0-9, q, w
    $(document).keypress(function (myevent) {
        //console.log("key press");
        console.log("key press: ", myevent['key']);

        var k = myevent['key'];

        if (k == '1' || k == '2' || k == '3' || k == '4' || k == '5' || k == '6' || k == '0') 
        {
            var i = 1;
            while (i < 7) 
            {
                $("body").removeClass("jqBodyR" + i);
                i++;
            }
            if (k != 0) 
            {
                $("body").addClass("jqBodyR" + k);
            }
        }

        if (k == '7') {
            $("body").addClass("jqBodyMirror");
        }
        if (k == '8') {
            $("body").removeClass("jqBodyMirror");
        }

        if (k == 'q') {
            $("body").removeClass("jqBody1");
            $("body").addClass("jqBody2");
        }
        if (k == 'w') {
            $("body").removeClass("jqBody2");
            $("body").addClass("jqBody1");
        }
        if (k == '9') {
            // create an element, add it, set display to none, then slide it down
            var divElem = document.createElement("div");
            divElem.innerHTML = 'slide down';
            $('main').append(divElem);

            $('main div').css({
                "display": 'none',
                "background": 'yellow'
            });

            $('main div').slideDown("slow");

            $('main div').delay(800).animate({
                fontSize: '3em'
            }, "slow");
            console.log('click main image: ' + "end");
        }

        // don't pass event to parent
        return false;
    });


    // 2
    // when link is clicked
    $('a').click(function () {
        console.log("link clicked");

        // change all links 
        $('a').attr('href', "#");


        // add css classes and remove classes
        switch (jclass) {
            case 1:
                // select unordered list in main but not in nav
                $("h1, h2, main ul").addClass("jclass1");

                $("h1, h2, main ul").removeClass("jclass2");
                // $("h1, h2, main ul").removeClass("jclass3");
                jclass++;
                break;
            case 2:
                $("h1, h2, main ul").addClass("jclass2");

                $("h1, h2, main ul").removeClass("jclass1");
                $("h1, h2, main ul").removeClass("jclass3");
                jclass++;
                break;
            case 3:
                $("h1, h2, main ul").addClass("jclass3");

                $("h1, h2, main ul").removeClass("jclass1");
                $("h1, h2, main ul").removeClass("jclass2");
                jclass = 1;
                break;
            default:
        }

    });

    // 3
    // when nav is hovered over it goes downwards in animation
    $('nav').mouseenter(function () {

        $(this).animate({
            height: '+=10px'
        });
        // select unordered list elements only within this element
        $('ul', this).animate({
            'padding-top': '+=10px',
        });
    });

    // 4
    // when nav is clicked it goes upwards in animation
    $('nav').click(function () {
        console.log($(this).height());

        var hi = $(this).height()
        if (hi > 40) {
            $(this).animate({
                height: '-=10px'
            });

            // select unordered list elements only within this element
            $('ul', this).animate({
                'padding-top': '-=10px'
            });
        }
        // it stops going upwards when there is no more space
    });


    // 5
    // select images inside article
    // make rounded corners, animated
    $('article img').mouseenter(function () {
        $(this).animate({
            "border-radius": "45%"
        });
    });


    // 6
    // select images inside article
    // makes less rounded corners, animated
    $('article img').mouseleave(function () {
        myImg = this;
        $(this).animate({
            "border-radius": "10%"
        });
    });


    // 7
    // when mouse enters main element 
    // change header background to a gradient colour

    $('main').mouseenter(function () {
        console.log("main enter");
        c1 = "#ccc";
        c2 = "#000";

        $('header').css({
            background: "-webkit-gradient(linear, left top, right bottom, from(" + c1 + "), to(" + c2 + "))"
        });

    });


    // 8
    // when mouse leaves main element 
    // change header background to a random gradient colour, from red green and blue
    $('main').mouseleave(function () {
        console.log("main leave");

        c2 = randColorRGB();
        c1 = randColorRGB();

        $('header').css({
            background: "-webkit-gradient(linear, left top, right bottom, from(" + c1 + "), to(" + c2 + "))"
        });
    });


    // 9
    // when mouse leaves main element 
    // change header background to a random gradient colour, from hue saturation and light
    $('footer').mouseenter(function () {

        var c1 = randColorHSL()
        var c2 = randColorHSL()

        $('header').css({
            background: "-webkit-gradient(linear, left top, right bottom, from(" + c1 + "), to(" + c2 + "))"
        });
    });



    // 10
    // when h2 clicked it fades out and back again
    $('h2').click(function () {
        $(this).css({
            "opacity": "1"
        }).fadeOut("fast");
        $(this).css({
            "opacity": "1"
        }).fadeIn("fast");

    });

    // 11
    // when item in list is hovered over
    // it fades out and back again
    // and its' siblings change colour
    $('article ul li').mouseenter(function () {

        $(this).css({
            "opacity": "1"
        }).fadeOut("fast");
        $(this).css({
            "opacity": "1"
        }).fadeIn("fast");

        var c1 = randColorHSL();

        // adjacent sibling selectors

        $(this).prev().css({
            "background": 'black'
        });
        $(this).next().css({
            "background": c1
        });

        $(this).prev().css({
            "color": c1
        });
        $(this).next().css({
            "color": 'white'
        });

    });


    // 12
    // when item in list is clicked
    // it's text becomes that of one sibling
    // and it's background colour becomes that of the other
    $('article ul li').click(function () {
        // adjacent sibling selectors
        var c1 = $(this).prev().css("color");
        var c2 = $(this).next().css("color");

        $(li).css({
            "color": c1
        });
        $(li).css({
            "backgroundColor": c2
        });

    });


    // 13
    // when an element is double clicked it is removed,
    // toggling between show and hide may also have worked
    $('*').dblclick(function () {

        console.log("dblclick: " + "start");
        console.log("nodeName:" + $(this).prop('nodeName'));

        if ($(this).prop('nodeName') != 'HTML') {
            // if it is not html, the highest element, then remove it 
            $(this).remove();
        } else {
            // if it is html, don't remove it, but remove ( some of ) its contents
            console.log("node is html, number of children: " + $(this).children().length);

            // these methods work also, but the effect seems to be slightly different
            //$( this ).children().remove();
            //$( this ).empty();

            for (var i = 0; i < $(this).children().length; i++) {
                $(this).children()[i].remove();
            }

            // if html is empty, add a button
            if ($(this).children().length == 0) {
                console.log("the end, is html, zero children");

                var body = document.createElement("body");
                var button1 = document.createElement("button");
                button1.innerHTML = "click away from the button";
                body.append(button1);

                $(this).append(body)

                // when the button is clicked it does nothing
                $("button").click(function () {
                    console.log("button clicked, node name:" + $(this).prop('nodeName'));

                    // this event is not passed up to its parent
                    return false;
                });


                $('button').css({
                    "margin": 'auto',
                    "width": '20%',
                    "margin-top": "100px"
                });
            }
        }

        // return true;

        // this returns false because otherwise the function runs for all the elements parents as well
        return false;
    });

    // 14
    // when all that is displayed is the button, clicking will reload page
    $('html').click(function () {

        if ($("button").text() == "click away from the button") {
            location.reload();
        }
    });


    // 15
    // when footer is clicked get object from internet and display it 
    $('footer').click(function () {
        console.log("footer: " + "start");

        $.ajax({
            url: "https://api.nasa.gov/planetary/apod?",
            type: "get", //send it through get method
            data: {
                api_key: 'FtRE9tozkfepHja4nj6l8GH4Y1oezsOdhxV0KiTG',
            },
            success: function (response) {
                //Do Something
                console.log("response: " + response['copyright']);
                diplayRemoteObject(response);
            },
            error: function (xhr) {
                //Do Something to handle error
                console.log("nasa is not responding" + "");
            }
        });

        // this runs before the things in the bracket above finishes
        console.log("footer: " + "the end");
    });

});


// return a random rgb colour
function randColorRGB() {
    var r1 = Math.floor(Math.random() * 255);
    var g1 = Math.floor(Math.random() * 255);
    var b1 = Math.floor(Math.random() * 255);

    return "rgb(" + r1 + "," + g1 + "," + b1 + ")";
}


// return a random hue, saturation 100, light 50%
function randColorHSL() {
    var h = Math.floor(Math.random() * 255);
    var s = 100;
    var l = 50;

    return "hsl(" + h + "," + s + "%," + l + "%)";
}


function diplayRemoteObject(remoteObject) {
    // create new element
    // add title, picture, copyright
    // select main part of page
    // append element

    var imgSrc = remoteObject['url'];
    var titleText = remoteObject['title']
    var copyText = remoteObject['copyright']

    var divElem = document.createElement("div");

    var titleElem = document.createElement("h2");
    titleElem.innerHTML = titleText;

    var copyElem = document.createElement("i");
    copyElem.innerHTML = '<br>copyright: ' + copyText + ', via nasa.gov';

    var img1 = $('<img>');
    img1.attr('src', imgSrc);
    img1.attr('width', '600px');

    divElem.append(titleElem);
    img1.appendTo(divElem);
    divElem.append(copyElem);

    $("#setupLeft").replaceWith(divElem);

}