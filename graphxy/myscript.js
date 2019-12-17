"use strict";

$(document).ready(function () {

    console.log("page load");
	myFunc()
	
	window.onresize = function()
	{
		$("#myCanvas").resizeCanvas($(window).width() - 40, $(window).height() - 40)
		myFunc()
	};



    $(document).keydown(function (myevent) {
        //console.log("key press");
        //console.log("key press: ", myevent['key']);

        var k = myevent['key'];

        if (k == 'ArrowUp' ) 
        {
			//console.log("u")
			yOffs = yOffs - 20;
			myFunc()
        }
        if (k == 'ArrowDown' ) 
        {
			//console.log("d")
			yOffs = yOffs + 20;
			myFunc()
        }
        if (k == 'ArrowLeft' ) 
        {
			//console.log("l")
			xOffs = xOffs - 20;
			myFunc()
        }
        if (k == 'ArrowRight' ) 
        {
			//console.log("r")
			xOffs = xOffs + 20;
			myFunc()
        }
		
	});

	$(window).on('wheel', function(event){
		// deltaY obviously records vertical scroll, deltaX and deltaZ exist too
		if(event.originalEvent.deltaY < 0){
			// wheeled up
			scale = ( scale * 1.1) | 0 ;
			yOffs = yOffs * 1.1
			xOffs = xOffs * 1.1
			console.log('scrolling up !',scale);
			myFunc()
		}
		else 
		{
			// wheeled down
			if( scale > 10 )
			{
				scale = ( scale / 1.1 ) | 0;
				console.log('scrolling down !', scale, xOffs, yOffs);
				yOffs = yOffs / 1.1
				xOffs = xOffs / 1.1
				myFunc()
			}
		}
	});

});

var xOffs = 0;
var yOffs = 0;


function xm2c( x )  // x, math to canvas
{
	var out = midX + ( scale * x );
	out = out - xOffs
	//console.log("xm2c: ", out );
	return out;
}

function ym2c(  y )  // y, math to canvas
{
	var out = midY - ( scale * y );
	//console.log("ym2c: ", out );
	out = out - yOffs
	return out;
}



function drawRedAxis()
{
	var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = 'rgba(200, 0, 0, 1)';
	
	var yOffsY = yOffs / scale;  //  down: yoff + 20,  ymath: -1
	drawVLine( 0, 0 - yOffsY, height ) // change
	
	var xOffsX = xOffs / scale;
	drawHLine( 0 + xOffsX, 0, width )
		
	var lineSize = 12;
	
	var xLow =  ( ( -midX / scale ) + xOffsX )|0
	var xHigh = ( ( midX / scale ) + xOffsX + 1 )|0
	
	for (var i = xLow; i < xHigh; i++)
	{
		//console.log( i)
		drawVLine( i, 0, lineSize )
	}
	
	var yLow = ( -midY / scale ) - yOffsY
	var yHigh = ( midY / scale ) - yOffsY
	
	yLow = yLow|0;
	yHigh = (yHigh +1 )|0;
	
	for (var i = yLow; i < yHigh; i++)
	{
		//console.log( i)
		drawHLine( 0, i, lineSize )
	}
	
	// h: 600,   s: 40, yRange: 15,  7.5 to -7.5, pressDown: 7 to -8
	// 300 / 40 = 7.5, 
	
	ctx.stroke();
	ctx.strokeStyle = oldStyle;
}


function drawVLine( pX, pY, size )
{
	//console.log("V line: x", pX, " y ", pY );

	ctx.moveTo( xm2c( pX ), ym2c( pY ) - ( size / 2 ) );
	ctx.lineTo( xm2c( pX ), ym2c( pY ) + ( size / 2 ) );

	ctx.stroke();
}
function drawHLine( pX, pY, size )
{
	//console.log("V line: x", pX, " y ", pY );

	ctx.moveTo( xm2c( pX ) - ( size / 2 ) , ym2c( pY ));
	ctx.lineTo( xm2c( pX ) + ( size / 2 ), ym2c( pY ) );

	ctx.stroke();
}

function drawCross( pointX, pointY, size )
{
	//.log("cross: x", pointX, " y ", pointY );
	drawVLine( pointX, pointY, size )
	drawHLine( pointX, pointY, size )
	ctx.stroke();
}



function joinPoints( x1, y1, x2, y2 )
{
    ctx.beginPath();
	//console.log( x1, y1, x2, y2 )
	if ( x1 == undefined )
	{
		return;
	}
	ctx.moveTo( xm2c( x1 ), ym2c( y1 ));
	ctx.lineTo( xm2c( x2 ), ym2c( y2 ));
	ctx.stroke();
}


function abcFormula( a,b,c )  // 5 6 1
{
	var z1 = (b*b) - ( 4 * a * c )  //b2 − 4ac ,  36 - 20 = 16
	var z2 = Math.sqrt( z1 )
	var z3 = (-b) + z2 
	var z4 = (-b) - z2 
	var z5 = z3 / (2*a)
	var z6 = z4 / (2*a)
	//console.log( "x =", z5, ", x =", z6 )

	var xArr = [z5,z6];
	return xArr
}

 (function($) {  
        $.fn.extend({  
            //Let the user resize the canvas to the size he/she wants  
            resizeCanvas:  function(w, h) {  
                var c = $(this)[0]  
                c.width = w;  
                c.height = h  
            }  
        })  
    })(jQuery)

	

function drawCircle2( a, b, c ) // ( x - a )^2 + ( y - b )^2 = c
{
    ctx.beginPath();
	var r = Math.sqrt( c )
	drawCircle( -a, -b, r )
}

function drawCircle( x, y, r )
{
    ctx.beginPath();
	xm2c( x )
	ym2c( y )
	
	var rc = r * scale
	
	var endAngle = (Math.PI * 2);
	var startAngle = endAngle;
	ctx.arc(xm2c( x ), ym2c( y ), rc, 0, endAngle, false);   
	ctx.stroke();
}





function drawCubicGraph3(az)  //  ax^3 + bx^2 + cx + d
{
    ctx.beginPath();
	
	var xOffsX = xOffs / scale;
	
	var xLow = ( -( midX / scale ) + xOffsX - 1 ) | 0 
	var xHigh = ( ( midX / scale ) + xOffsX + 1 ) | 0
	
	var scale2 = scale / 4
	
	
	console.log( xLow, xHigh )
	
	var px;
	var py;
	
	for( var xCur0 = xLow;  xCur0 < xHigh;  xCur0++ )
	{
	
		for( var j = 0; j < scale2; j++ )
		{
			var xCur = xCur0 + ( ( 1 / scale2 ) * j )
			
			var yTotal = 0;
		
			for( var i = 0; i < az.length; i++ )
			{
				yTotal +=  az[i] * Math.pow( xCur, ( az.length - 1 - i ) ) 
			}
			
			//console.log( 'dcg x,y' ,xCur, yTotal )
			
			//drawCross(xCur, yTotal, 12 )
			
			joinPoints( px, py, xCur, yTotal )
			px = xCur;
			py = yTotal;
		}
	
	
	}
}




var ctx 
var midX
var midY
var width 
var height
var scale = 30


function myFunc()
{
	console.log("start" );

	$("#myCanvas").resizeCanvas($(window).width() - 40, $(window).height() - 40)
	
	
	var c = document.getElementById("myCanvas");
	ctx = c.getContext("2d");
	width = c.width
	height= c.height

	midX = width / 2
	midY = height / 2

	ctx.clearRect(0, 0, width, height);

	drawRedAxis()
	
	ctx.font = '48px serif';
	ctx.fillText('Hello world', 10, 50);
    
    ctx.beginPath();
	
	//drawCircle( 1,1,2 )
	drawCircle2( -1,-1.01,4 )
	
	
	var az = [ -1,3,0 ];
	
	drawCubicGraph3( [ -1,3,0 ] )
	drawCubicGraph3( [ 5,6,1  ] )
	drawCubicGraph3( [ 2, 5  ] )
	
	var az = [ 1, -3, -6, 8 ];
	
	drawCubicGraph3( az )
	
	console.log("\nend" );
	
	
}













