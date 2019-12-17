// JavaScript Document

/*

1.  Create and style an image 4 ways on the page load

2.  Remove two elements when the mouse is hovered over them

3.  Use getElementsByTagName to change all <div> elements on a page (4 styles) when any div is double-clicked

4.  Have some <h1> text which when clicked, will dynamically create a table with 4 cells (2 *2) 
    one of the cells should have a background colour of yellow and the other should contain an image

5.  Use an API of your choice and obtain JavaScript code to demonstrate that API. 
    You should alter the provided code in order to demonstrate 4 - 8 visible changes
    
*/

(function(){
    console.log("start");
    createImage();
    
    document.getElementById('firstLetter').addEventListener("mouseover", removeThis, false);
    document.getElementById('year').addEventListener("mouseover", removeThis, false);
    
    var myDivs = document.getElementsByTagName('div');
    for (var i = 0; i < myDivs.length; i++) 
    {
        myDivs[i].addEventListener('dblclick', removeDivs, false);
    }

    document.getElementsByTagName('h1')[1].addEventListener("mouseover", newTable, false);
    document.getElementById('today').addEventListener("click", todaysPicture, false);

}());

// global variable
var yCounter = 0;

function createImage()
{
    console.log("create image");
    var myImg = document.createElement("img");
    myImg.setAttribute('src', 'images/swan_600.jpg');
    
	var myMain = document.getElementsByTagName('main')[0];
    
    // insert image at start of element
    myMain.insertBefore(myImg, myMain.firstChild);

    // rotate
	myImg.style.transform="rotate(-36deg)";

    // add background and padding to make background visible
    myImg.style.background = "grey";
	myImg.style.padding="16px";

    // add a border
    myImg.style.border="5px solid";
    myImg.style.borderBottomColor = 'red';
    myImg.style.borderLeftColor = 'red';
    
    // transparency and blur
    myImg.style.opacity = 0.90;
    myImg.style.filter = "blur( 1px )";

    
    // add a box shadow
    myImg.style.boxShadow = " 0 6px 12px 0 rgba(0, 0, 0, 0.1), 0 9px 30px 0 rgba(0, 0, 0, 0.29)";
}


// first letter of first paragraph 
// and the current year in the footer
// remove element when mouse hovers over it
function removeThis()
{
    console.log("removeThis: ", this);
    this.parentNode.removeChild(this);
}


function removeDivs()
{
    console.log("removeDiv: ", this);
    
    var myDivs = document.getElementsByTagName('div');
    
    for (var i = 0; i < myDivs.length; i++) 
    {
        myDivs[i].parentNode.removeChild(myDivs[i]);
        // the list has gotten shorter so i does not need to be incremented
        i--;
    }
}

// add new table
function newTable()
{
    console.log("new table: ", this);
    
    var myTable = createTable();
	var myFooter = document.getElementsByTagName('footer')[0];
    
    // style applied before it is appended
    myTable.style.border="5px solid";
    myFooter.appendChild( myTable )
}


// create table element
function createTable() {

    // create elements <table> and a <tbody>
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");

    // create elements for rows
    var row1 = document.createElement("tr");
    var row2 = document.createElement("tr");

    var textForCell = "";
    
    // create image element
    var myImg = document.createElement("img");
    myImg.setAttribute('src', 'images/glass-ball-250.jpg');
    
    console.log('image size: ', myImg.width, myImg.height)
    
    // create elements for cells
    var cell1ForRow1 = document.createElement("td");
    textForCell = document.createTextNode( "a" );
    cell1ForRow1.appendChild( textForCell );
    
    cell1ForRow1.style.backgroundColor = "yellow";
    
    // set cell to match the size of the other cell
    myImg.onload = function () 
    {
        console.log("image:        ", myImg.width, myImg.height)
        cell1ForRow1.style.width = myImg.width + "px";
        cell1ForRow1.style.height = myImg.height + "px";
    };
    
    var cell2ForRow1 = document.createElement("td");
    textForCell = document.createTextNode( "b" );
    cell2ForRow1.appendChild( textForCell );
    
    var cell1ForRow2 = document.createElement("td");
    textForCell = document.createTextNode( "c" );
    cell1ForRow2.appendChild( textForCell );
    
    var cell2ForRow2 = document.createElement("td");
    cell2ForRow2.appendChild( myImg );
    
    // add cells to rows
    row1.appendChild(cell1ForRow1);
    row1.appendChild(cell2ForRow1);
    row2.appendChild(cell1ForRow2);
    row2.appendChild(cell2ForRow2);

    // add rows to table
    tblBody.appendChild( row1 );
    tblBody.appendChild( row2 );
    
    tbl.appendChild(tblBody);

    return tbl;
}


//  click for todays picture is clicked
function todaysPicture()
{
    console.log("todays picture", "start" )

    // reset counter for previous
    yCounter = 0;
    
    var myUrl = 'https://api.nasa.gov/planetary/apod?api_key=FtRE9tozkfepHja4nj6l8GH4Y1oezsOdhxV0KiTG';
    
    getFromUrl( myUrl )
    console.log("todays picture", "end");
}


//  click for yesterdays Picture is clicked
function yesterdaysPicture()
{
    yCounter++;
    console.log("ydays picture", "start" )

    // add a date argument to get request
    var myUrl1 = 'https://api.nasa.gov/planetary/apod?api_key=FtRE9tozkfepHja4nj6l8GH4Y1oezsOdhxV0KiTG&date=';//
    var myUrl2 = myUrl1 + getYesterday();
    
    getFromUrl( myUrl2 )
    console.log("ydays picture", "end");
}


// starts asynchronous request
function getFromUrl(yourUrl) 
{
    console.log("getFromUrl: start", yourUrl);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            displayResponse( xhttp.responseText )
        }
    };
    xhttp.open("GET", yourUrl, true);
    xhttp.send();
    console.log("getFromUrl: end");
}


// get url from response json
// if there already remove image
// add image
// if there already remove yesterdays link
// add yesterdays link
function displayResponse( response )
{
    console.log("displayResponse: start");
    var json_obj = JSON.parse( response );
    
    console.log("displayResponse: obj", json_obj['copyright']);
 
    var myImg = document.createElement("img");
    myImg.setAttribute('src', json_obj.url );
    
	var elemDiv = document.getElementById('remotePicture');
    
    console.log( elemDiv.getElementsByTagName('img').length );
    
    if( elemDiv.getElementsByTagName('img').length == 1)
    {
        //elemDiv.appendChild(myImg);
        elemDiv.removeChild(elemDiv.getElementsByTagName('img')[0] )
    }
    elemDiv.appendChild(myImg);
    myImg.style.width = 600 + "px";
    
 
    var myh2 = document.createElement("h2");
    myh2.innerHTML = "click for yesterday's picture";
 
    var yDiv = document.getElementById('yesterday')
    if( yDiv.getElementsByTagName('h2').length == 1)
    {
        //elemDiv.appendChild(myImg);
        yDiv.removeChild(yDiv.getElementsByTagName('h2')[0] )
    }
 
    yDiv.appendChild( myh2 );
    yDiv.addEventListener("click", yesterdaysPicture, false);
    // append image
    // elemDiv.appendChild(myImg);
    console.log("displayResponse: end");
}


function addLeadingZero( zeroAnd99 )
{
    if ( zeroAnd99 < 10) {
        zeroAnd99 = '0' + zeroAnd99;
    }
    return zeroAnd99;
}

// get today minus a number of days
function getYesterday() 
{
    var today = new Date();
    
    var dd = addLeadingZero( today.getDate() - yCounter );
    // months begin at zero
    var mm = addLeadingZero( today.getMonth() + 1 );
    var yyyy = today.getFullYear();

    var yesterday = yyyy + '-' + mm + '-' + dd;
    console.log("yesterday: ", yesterday);
    return yesterday
}