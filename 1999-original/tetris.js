/////////////////////////////////////////////////////////
//  (C) 2000 Drago Todorov,  drago@todorov.net
//  You can copy, modify and re-distribute this code freely as
//  long as referenses to above author are preserved
//
//  For more cool stuff, please visit me on the web at
//  http://www.varnaman.com
/////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////
//SHAPE DEFINITIONS
//
//each rotaion array (R) contains coordinate tuples (x,y). for example the 
//"g_aR00_0" rotation array is made of the folowing tuples:
//{0,0},{1,0},{0,1},and {1,1}
//each tuple is to be interpreted as "relative pixel coordinates". The coordinates
//are relative to some imaginary center (0,0). Each coordinate pair represents an
//active pixel. As the center gets moved by the rendering emgine, the shape is simply
//redrawn around it.
//
//each spin array (S) contains as many entries as there are spin angles in our system
//Currently we have 4 spin angles (0,90,180 and 270 deg), so each spin array is made
//of 4 entries. The entries themselves are R arrays, representing the shape's pixels
//at the corresponding rotation. So (S) is a two dimentional array.
/////////////////////////////////////////////////////////

//**********
//   X X
//   X X
//**********
var g_aR00_0 = new Array(0,0,1,0,0,1,1,1)
var g_aS00 = new Array(g_aR00_0,g_aR00_0,g_aR00_0,g_aR00_0)

//**********
//   X
//   X
//   X
//   X
//**********
var g_aR01_0 = new Array(0,-2,0,-1,0,0,0,1)
var g_aR01_1 = new Array(-2,0,-1,0,0,0,1,0)
var g_aS01 = new Array(g_aR01_0,g_aR01_1,g_aR01_0,g_aR01_1)

//**********
//   X X
//   X
//   X
//**********
var g_aR02_0 = new Array(0,-1,0,0,0,1,1,-1)
var g_aR02_1 = new Array(-1,0,0,0,1,0,1,1)
var g_aR02_2 = new Array(0,-1,0,0,0,1,-1,1)
var g_aR02_3 = new Array(-1,0,0,0,1,0,-1,-1)
var g_aS02 = new Array(g_aR02_0,g_aR02_1,g_aR02_2,g_aR02_3)

//**********
//   X X
//     X
//     X
//**********
var g_aR03_0 = new Array(0,-1,0,0,0,1,-1,-1)
var g_aR03_1 = new Array(-1,0,0,0,1,0,1,-1)
var g_aR03_2 = new Array(0,-1,0,0,0,1,1,1)
var g_aR03_3 = new Array(-1,0,0,0,1,0,-1,1)
var g_aS03 = new Array(g_aR03_0,g_aR03_1,g_aR03_2,g_aR03_3)

//**********
//   X 
//   X X
//     X
//**********
var g_aR04_0 = new Array(0,-1,0,0,1,0,1,1)
var g_aR04_1 = new Array(1,0,2,0,0,1,1,1)
var g_aS04 = new Array(g_aR04_0,g_aR04_1,g_aR04_0,g_aR04_1)

//**********
//     X 
//   X X
//   X
//**********
var g_aR05_0 = new Array(1,-1,0,0,1,0,0,1)
var g_aR05_1 = new Array(-1,0,0,0,0,1,1,1)
var g_aS05 = new Array(g_aR05_0,g_aR05_1,g_aR05_0,g_aR05_1)

//**********
//   X 
//   X X
//   X
//**********
var g_aR06_0 = new Array(0,-1,0,0,1,0,0,1)
var g_aR06_1 = new Array(-1,0,0,0,1,0,0,1)
var g_aR06_2 = new Array(0,-1,0,0,0,1,-1,0)
var g_aR06_3 = new Array(-1,0,0,0,1,0,0,-1)
var g_aS06 = new Array(g_aR06_0,g_aR06_1,g_aR06_2,g_aR06_3)

//**********
//   X X      Nonstandart shapes ...
//   X        ....  and going clockwise
//**********
var g_aR07_0 = new Array(0,0,1,0,0,1)
var g_aR07_1 = new Array(0,0,1,0,1,1)
var g_aR07_2 = new Array(0,1,1,0,1,1)
var g_aR07_3 = new Array(0,1,0,0,1,1)
var g_aS07 = new Array(g_aR07_0,g_aR07_1,g_aR07_2,g_aR07_3)

//**********
//   X
//   X
//   X
//**********
var g_aR08_0 = new Array(0,-1,0,0,0,1)
var g_aR08_1 = new Array(-1,0,0,0,1,0)
var g_aS08 = new Array(g_aR08_0,g_aR08_1,g_aR08_0,g_aR08_1)

//**********
//   X X X
//     X
//     X
//**********
var g_aR09_0 = new Array(0,-1,0,0,0,1,-1,-1,1,-1)
var g_aR09_1 = new Array(-1,0,0,0,1,0,1,-1,1,1)
var g_aR09_2 = new Array(0,-1,0,0,0,1,1,1,-1,1)
var g_aR09_3 = new Array(-1,0,0,0,1,0,-1,1,-1,-1)
var g_aS09 = new Array(g_aR09_0,g_aR09_1,g_aR09_2,g_aR09_3)

//**********
//   X 
// X X X
//   X
//**********
var g_aR10_0 = new Array(0,0,0,1,0,-1,1,0,-1,0)
var g_aS10 = new Array(g_aR10_0,g_aR10_0,g_aR10_0,g_aR10_0)

//**********
// X X X
// X   X
//**********
var g_aR11_0 = new Array(0,0, -1,0, 1,0, -1,-1, 1,-1)
var g_aR11_1 = new Array(0,0, 0,-1, 0,1, 1,-1, 1,1)
var g_aR11_2 = new Array(-1,-1, 0,-1,1,-1,-1,0,1,0)
var g_aR11_3 = new Array(0,0, 0,-1, 0,1, -1,-1, -1,1)
var g_aS11 = new Array(g_aR11_0,g_aR11_1,g_aR11_2,g_aR11_3)

//**********
// X
// X X X
//     X   
//**********
var g_aR12_0 = new Array(0,0, -1,0, 1,0, -1,-1, 1,1)
var g_aR12_1 = new Array(0,0, 0,-1, 0,1, -1,1, 1,-1)
var g_aS12 = new Array(g_aR12_0,g_aR12_1,g_aR12_0,g_aR12_1)

//**********
//     X 
// X X X
// X   
//**********
var g_aR13_0 = new Array(0,0, -1,0, 1,0, 1,-1, -1,1)
var g_aR13_1 = new Array(0,0, 0,-1, 0,1, -1,-1, 1,1)
var g_aS13 = new Array(g_aR13_0,g_aR13_1,g_aR13_0,g_aR13_1)

// -------------------------------------------
// finaly, define our shape table ...
// -------------------------------------------
var g_aShapeTable = new Array(
	g_aS00,g_aS01,g_aS02,g_aS03,g_aS04,g_aS05,g_aS06, //this is the last standart shape
	g_aS07,g_aS08,g_aS09,g_aS10,g_aS11,g_aS12,g_aS13
)


/////////////////////////////////////////////////////////
// THE GAME ENGINE
/////////////////////////////////////////////////////////

var g_ix    = 0;
var g_ixMin = 0;
var g_ixMax = 0;
//
var g_iy    = 0;
var g_iyMin = 0;
var g_iyMax = 0;
//
var g_cShapeColor  = "ID_STYLE_NULL";
var g_cNoColor     = "ID_STYLE_NULL";
var g_cSolidColor  = "Null";

// These are shown to the user
var g_iScoreCount = 0;
var g_iLineCount  = 0;
var g_iShapeCount = 0;
var g_iSpeed      = 0;

//
var g_iyTopLine = 0;      // used by the algorithm
var g_iTimerId  = null;   // Used by the algorithm
var g_iShapeIndex = 0;    // this index holds the active shape
var g_iAngle = 0;         // this index holds the active angle

// styles defined at the main html page
var g_aColorTable = new Array
(
	"ID_STYLE_0","ID_STYLE_1","ID_STYLE_2",
	"ID_STYLE_3","ID_STYLE_4","ID_STYLE_5",
	"ID_STYLE_6","ID_STYLE_7","ID_STYLE_8",
	"ID_STYLE_9"
)

//*************************************************************
// see what shape comes next
//*************************************************************
function fnGetNextShapeId()
{
	alwaysUseLastShape = false;	//for debug only ...
	if (alwaysUseLastShape)
	{
		return g_aShapeTable.length -1;
	}
	else
	{
		return Math.floor(Math.random() * g_aShapeTable.length);
	}
}

//*************************************************************
// see what color comes next
//*************************************************************
function fnGetNextColorId()
{
	colorID = Math.floor( Math.random() * g_aColorTable.length );
	return g_aColorTable[colorID];
}

//*************************************************************
// put pixel on the virtual device context
//*************************************************************
function fnPutPixel(x,y,Color)
{
   board = document.getElementById('TRT_ID_BOARD')
   board.rows[y].cells[x].className = Color;
}

//*************************************************************
// read pixel from our virtual device context
//*************************************************************
function fnGetPixel(x,y)
{
    //parameter validation - borders are "solid" ...
   if  ( (x < 0) || (x >= g_ixMax ) || (y < 0) || (y >= g_iyMax ) )
    return( g_cSolidColor );
   
   board = document.getElementById('TRT_ID_BOARD')   
   return( board.rows[y].cells[x].className );
}

//*************************************************************
// paint a shape
//*************************************************************
function fnPaintShape(Color)
{
  for ( var i = 0; i < g_aShapeTable[g_iShapeIndex][g_iAngle].length; i+=2 )
  {
    var dx = g_aShapeTable[g_iShapeIndex][g_iAngle][i];
    var dy = g_aShapeTable[g_iShapeIndex][g_iAngle][i+1];
    fnPutPixel( g_ix + dx, g_iy + dy, Color );
  }
}

//*************************************************************
// tick == 1 game step
//*************************************************************
function fnTick()
{
   var i = TRT_fnStep(0,1);	//move the shape one step down
   if ( i == 0 )
   {
      //this shape has hit the bottom
      fnCompact();
      g_iScoreCount = g_iLineCount * 10;
	  TRT_fnRefreshScoreCounts();	  

      //drop our next shape
      i = fnDropNewShape( fnGetNextShapeId() );
      if ( i == 0 )
      {
		 //this shape too hits the bottom - the game is over
         if (g_iTimerId)
		 {
		 	//stop the timer, so that we are not called over and over again
		 	clearTimeout(g_iTimerId);
		 }
		top_area = document.getElementById('TRT_ID_STATUS')
		TRT_fnSetInnerText(top_area,'Game Over!');
		top_area.bgColor ="Red";
      }
   }
}

//*************************************************************
// refresh score counts
//*************************************************************
function TRT_fnRefreshScoreCounts()
{ 
	TRT_fnSetInnerText(document.getElementById('TRT_ID_SHAPECOUNT'),g_iShapeCount);
	TRT_fnSetInnerText(document.getElementById('TRT_ID_LINECOUNT'),g_iLineCount);
	TRT_fnSetInnerText(document.getElementById('TRT_ID_SCORECOUNT'),g_iScoreCount);      
	TRT_fnSetInnerText(document.getElementById('TRT_ID_LEVELCOUNT'),g_iSpeed);  
}

//*************************************************************
// clear all globals and start a new game
//*************************************************************
function TRT_fnRestartGame()
{ 
  //just to demonstrate how to do this dynamically ...
  board = document.getElementById('TRT_ID_BOARD')
  g_iyMax = board.rows.length;  
  g_ixMax = board.rows[0].cells.length;
 
  //clear the DC
  for (var x=0; x < g_ixMax; x++)
  { 
    for (var y=0; y <g_iyMax; y++)
    {
      fnPutPixel( x, y, g_cNoColor );  
    }
  }

  //
  g_iyTopLine = g_iyMax;
  g_iScoreCount = 0;
  g_iLineCount  = 0;
  g_iShapeCount = 0;
  g_iSpeed = 1;

  //update the top area
  top_area = document.getElementById('TRT_ID_STATUS')
  TRT_fnSetInnerText(top_area,'Playing...');
  top_area.bgColor ="LightGreen";
  
  //refresh the score counts
  TRT_fnRefreshScoreCounts();

  //drop our next shape
  fnDropNewShape( fnGetNextShapeId() )

  //clear the timer
  if(g_iTimerId)
    clearTimeout(g_iTimerId);
	
  //fire up the tick
  g_iTimeout = 1000;
  g_iTimerId = setInterval("fnTick();", 1000 - g_iSpeed*100 );
}

//*************************************************************
//
//*************************************************************
function TRT_fnRotate( Direction )
{
  var iNewAngle;
  var dx;
  var dy;

  fnPaintShape( g_cNoColor );
  
  if ( Direction==1 )
  {
    if ( g_iAngle == 0 )
	  iNewAngle = 3;
    else
      iNewAngle = g_iAngle-1;
  }
  else
  {
    if ( g_iAngle == 3 )
	  iNewAngle = 0;
    else
      iNewAngle = g_iAngle+1;
  }

  //check
  for ( var i = 0; i < g_aShapeTable[g_iShapeIndex][iNewAngle].length; i+=2 )
  {
    dx = g_aShapeTable[g_iShapeIndex][iNewAngle][i];
    dy = g_aShapeTable[g_iShapeIndex][iNewAngle][i+1];
    
    if ( fnGetPixel( g_ix + dx , g_iy + dy ) != g_cNoColor )
    {
       //rotation impossible
       fnPaintShape( g_cShapeColor );
       return;
    }
  }
  
  g_iAngle = iNewAngle;
  
  fnPaintShape( g_cShapeColor ); 
}


//*************************************************************
// try to perform a single step ( left, right, bottom). Return
// value: 
//			0: step was not performed because of collision or 
//				boundary condition
//			1: step was performed
//*************************************************************
function TRT_fnStep( dx, dy )
{  
  // erase the shape from the board by painting it with the 
  // background color
  fnPaintShape( g_cNoColor );
  
  // check the proposed new pixels for collisions. 
  for ( var i = 0; i < g_aShapeTable[g_iShapeIndex][g_iAngle].length; i+=2 )
  {
    var ix = g_ix + g_aShapeTable[g_iShapeIndex][g_iAngle][i] + dx;
    var iy = g_iy + g_aShapeTable[g_iShapeIndex][g_iAngle][i+1] + dy;
    
    if ( fnGetPixel( ix, iy ) != g_cNoColor )
    {
	   // collision was found - restore the shape where it was and 
	   // return zero
       fnPaintShape( g_cShapeColor );
       return(0);
    }
  }

  // no collisions. update the shape coordinates and paint with 
  // the "visible"
  g_ix += dx;
  g_iy += dy;  
  fnPaintShape( g_cShapeColor );
  
  // return 1 to indicate the step was performed
  return(1); 
}


//*************************************************************
//
//*************************************************************
function TRT_fnDrop()
{  
  fnPaintShape( g_cNoColor );
  
  for ( var iyBase = g_iy; iyBase < g_iyMax; iyBase++)
  {
   for ( var i = 0; i < g_aShapeTable[g_iShapeIndex][g_iAngle].length; i+=2 )
   {
     var ix = g_ix + g_aShapeTable[g_iShapeIndex][g_iAngle][i];
     var iy = iyBase + g_aShapeTable[g_iShapeIndex][g_iAngle][i+1] + 1;
    
     if ( fnGetPixel( ix, iy ) != g_cNoColor )
     {
        g_iy = iyBase;
        fnPaintShape( g_cShapeColor );
        return;
     }
   }
  }
}

//*************************************************************
//
//*************************************************************
function fnDropNewShape(iShapeIndex)
{
  var i=0;
  var dx=0;
  var dy=0;
  
  //load the new shape
  g_iShapeIndex = iShapeIndex;

  //Chose random angle
  g_iAngle = Math.floor( Math.random() * 3 );

  //determine the shape's dimensions
  var ixMin=g_aShapeTable[g_iShapeIndex][g_iAngle][0];
  var ixMax=g_aShapeTable[g_iShapeIndex][g_iAngle][0];
  var iyMin=g_aShapeTable[g_iShapeIndex][g_iAngle][1];
  var iyMax=g_aShapeTable[g_iShapeIndex][g_iAngle][1];
  for (i = 0; i < g_aShapeTable[g_iShapeIndex][g_iAngle].length; i+=2 )
  {
    if ( ixMin > g_aShapeTable[g_iShapeIndex][g_iAngle][i] )
      ixMin = g_aShapeTable[g_iShapeIndex][g_iAngle][i];
    else if ( ixMax < g_aShapeTable[g_iShapeIndex][g_iAngle][i] )
      ixMax = g_aShapeTable[g_iShapeIndex][g_iAngle][i];
   
    if ( iyMin > g_aShapeTable[g_iShapeIndex][g_iAngle][i+1] )
      iyMin = g_aShapeTable[g_iShapeIndex][g_iAngle][i+1];
    else if ( iyMax < g_aShapeTable[g_iShapeIndex][g_iAngle][i+1] )
      iyMax = g_aShapeTable[g_iShapeIndex][g_iAngle][i+1];
  }
 
  //based on above dimensions - determine the startup position...
  g_iy = g_iyMin + Math.max(0,-1*iyMin);
  g_ix = g_ixMin + Math.max(0,-1*ixMin);

  //randomize x
  var ixShiftRange = ( g_ixMax -1 - g_ixMin - Math.max(0,-1*ixMin) - ixMax );
  ixShiftRange = Math.max(ixShiftRange,0);
  g_ix +=Math.floor( Math.random() * ixShiftRange );

  //chose its color
  g_cShapeColor =  fnGetNextColorId()

  //no more space ?!
  for (i = 0; i < g_aShapeTable[g_iShapeIndex][g_iAngle].length; i+=2 )
  {
    dx = g_aShapeTable[g_iShapeIndex][g_iAngle][i];
    dy = g_aShapeTable[g_iShapeIndex][g_iAngle][i+1];
    
    if ( fnGetPixel( g_ix + dx, g_iy + dy ) != g_cNoColor )
    {
       fnPaintShape( g_cShapeColor );
       return(0);
    }
  }

  fnPaintShape( g_cShapeColor );
  
  //increment and return successfully
  g_iShapeCount++;
  return(1);
}


//*************************************************************
//
//*************************************************************
function fnIsFull(y)
{
  for (var x=0; x < g_ixMax; x++)
  { 
    if ( fnGetPixel( x, y ) == g_cNoColor  )
    {
     return(0);
    }
  }
  return(1);
}

//*************************************************************
//
//*************************************************************
function fnShiftBlock(iYend)
{
  var x;
  var y;

  for (y = iYend; y > g_iyTopLine; y-- )
  {
    for (x=0; x < g_ixMax; x++)
    { 
      fnPutPixel( x, y, fnGetPixel( x, y-1 ) );
    }
  }
  for (x=0; x < g_ixMax; x++)
  { 
    fnPutPixel( x, g_iyTopLine, g_cNoColor );
  }
  g_iyTopLine++;
}  
 

//*************************************************************
//
//*************************************************************
function fnCompact()
{
  var iyBottom = g_iy;
  
  //determine g_iyTopLine and iyBottom. Note that g_iyTop is a global value

  for ( var i = 0; i < g_aShapeTable[g_iShapeIndex][g_iAngle].length; i+=2 )
  {
    var dy = g_aShapeTable[g_iShapeIndex][g_iAngle][i+1];
    
    if ( ( g_iy + dy ) < g_iyTopLine )
       g_iyTopLine  = g_iy + dy;
    
    if ( ( g_iy + dy ) > iyBottom )
       iyBottom  = g_iy + dy;
  }

  //
  for ( var y = g_iyTopLine; y <= iyBottom; y++ )
  { 
     if ( fnIsFull(y) == 1 )
     {
       fnShiftBlock(y);
   
       switch (g_iLineCount++)
       {
         case 10:
         case 20:
         case 30:
         case 40: 
         case 50:
         case 60:
         case 70:
         case 80:
          if(g_iTimerId)
             clearTimeout(g_iTimerId);

          if ( g_iSpeed < 10 )
             g_iSpeed++;

          g_iTimerId = setInterval("fnTick();", ( 1000 - g_iSpeed*100 ) );
          TRT_fnRefreshScoreCounts();
          break;
      }

     }
  }
}

/////////////////////////////////////////////////////////
// THE UI BUILDER
/////////////////////////////////////////////////////////

//*************************************************************
//
//*************************************************************
function TRT_fnRend(iXmax,iYmax)
{
	//build the board
	 board = document.getElementById('TRT_ID_BOARD')
	 for ( var iRow=0; iRow < iYmax; iRow++ )
	 {
	   var newRow = board.insertRow(0);	   
	   for ( var iCol=0; iCol < iXmax; iCol++ )
	   {
		var newCell  = newRow.insertCell(0);
		newCell.setAttribute("CLASS", "ID_STYLE_NULL");
	   }	   
	 }
	 
	 //build the controller
	 tb2 = document.getElementById('TRT_ID_CONTROLLER');   
	 //line 11
	 tr2x11 = document.createElement("tr");
	 th2x11 = document.createElement("th"); 
	 th2x11.setAttribute("COLSPAN", "3");
	 tr2x11.insertBefore(th2x11, null);
	 tb2.insertBefore(tr2x11, null);
	 //line 10
	 tr2x10 = document.createElement("tr");
	 th2x10x1 = document.createElement("th"); 
	 th2x10x2 = document.createElement("th");
	 th2x10x2.setAttribute("bordercolor", "White");
	 btn = document.createElement("a");
	 btn.setAttribute("href", "JavaScript:TRT_fnRestartGame()");
	 TRT_fnSetInnerText(btn,'Space Bar')
	 th2x10x2.insertBefore(btn, null); 
	 th2x10x3 = document.createElement("th");  
	 tr2x10.insertBefore(th2x10x3, null);
	 tr2x10.insertBefore(th2x10x2, th2x10x3);
	 tr2x10.insertBefore(th2x10x1, th2x10x2);
	 tb2.insertBefore(tr2x10, tr2x11);
	 //line 9
	 tr2x9 = document.createElement("tr");
	 th2x9x3 = document.createElement("th"); 
	 th2x9x3.setAttribute("id", "TRT_ID_LEVELCOUNT");
	 TRT_fnSetInnerText(th2x9x3,'0')
	 th2x9x2 = document.createElement("th"); 
	 th2x9x2.setAttribute("COLSPAN", "2");
	 TRT_fnSetInnerText(th2x9x2,'Level')
	 tr2x9.insertBefore(th2x9x3, null);
	 tr2x9.insertBefore(th2x9x2, th2x9x3);
	 tb2.insertBefore(tr2x9, tr2x10); 
	 //line 8
	 tr2x8 = document.createElement("tr");
	 th2x8x3 = document.createElement("th"); 
	 th2x8x3.setAttribute("id", "TRT_ID_SCORECOUNT");
	 TRT_fnSetInnerText(th2x8x3,'0')
	 th2x8x2 = document.createElement("th"); 
	 th2x8x2.setAttribute("COLSPAN", "2");
	 TRT_fnSetInnerText(th2x8x2,'Score')
	 tr2x8.insertBefore(th2x8x3, null);
	 tr2x8.insertBefore(th2x8x2, th2x8x3);
	 tb2.insertBefore(tr2x8, tr2x9);
	 //line 7
	 tr2x7 = document.createElement("tr");
	 th2x7x3 = document.createElement("th"); 
	 th2x7x3.setAttribute("id", "TRT_ID_LINECOUNT");
	 TRT_fnSetInnerText(th2x7x3,'0')
	 th2x7x2 = document.createElement("th"); 
	 th2x7x2.setAttribute("COLSPAN", "2");
	 TRT_fnSetInnerText(th2x7x2,'Lines')
	 tr2x7.insertBefore(th2x7x3, null);
	 tr2x7.insertBefore(th2x7x2, th2x7x3);
	 tb2.insertBefore(tr2x7, tr2x8);
	 //line 6
	 tr2x6 = document.createElement("tr");
	 th2x6x3 = document.createElement("th"); 
	 th2x6x3.setAttribute("id", "TRT_ID_SHAPECOUNT");
	 TRT_fnSetInnerText(th2x6x3,'0')
	 th2x6x2 = document.createElement("th"); 
	 th2x6x2.setAttribute("COLSPAN", "2");
	 TRT_fnSetInnerText(th2x6x2,'Elements')
	 tr2x6.insertBefore(th2x6x3, null);
	 tr2x6.insertBefore(th2x6x2, th2x6x3);
	 tb2.insertBefore(tr2x6, tr2x7);
	 //line 5
	 tr2x5 = document.createElement("tr");
	 th2x5x1 = document.createElement("th"); 
	 th2x5x2 = document.createElement("th");
	 th2x5x2.setAttribute("bordercolor", "White");
	 btn = document.createElement("a");
	 btn.setAttribute("href", "JavaScript:TRT_fnDropLink()");
	 TRT_fnSetInnerText(btn,'Down')
	 th2x5x2.insertBefore(btn, null); 
	 th2x5x3 = document.createElement("th");  
	 tr2x5.insertBefore(th2x5x3, null);
	 tr2x5.insertBefore(th2x5x2, th2x5x3);
	 tr2x5.insertBefore(th2x5x1, th2x5x2);
	 tb2.insertBefore(tr2x5, tr2x6);
	 //line 4
	 tr2x4 = document.createElement("tr");
	 th2x4x1 = document.createElement("th"); 
	 th2x4x1.setAttribute("bordercolor", "White");
	 btn = document.createElement("a");
	 btn.setAttribute("href", "JavaScript:TRT_fnStepLeftLink()");
	 TRT_fnSetInnerText(btn,'Left')
	 th2x4x1.insertBefore(btn, null);  
	 th2x4x2 = document.createElement("th");  
	 th2x4x3 = document.createElement("th");  
	 th2x4x3.setAttribute("bordercolor", "White");
	 btn = document.createElement("a");
	 btn.setAttribute("href", "JavaScript:TRT_fnStepRightLink()");
	 TRT_fnSetInnerText(btn,'Right')
	 th2x4x3.insertBefore(btn, null); 
	 tr2x4.insertBefore(th2x4x3, null);
	 tr2x4.insertBefore(th2x4x2, th2x4x3);
	 tr2x4.insertBefore(th2x4x1, th2x4x2);
	 tb2.insertBefore(tr2x4, tr2x5); 
	 //line 3
	 tr2x3 = document.createElement("tr");
	 th2x3x1 = document.createElement("th"); 
	 th2x3x2 = document.createElement("th");
	 th2x3x2.setAttribute("bordercolor", "White");
	 btn = document.createElement("a");
	 btn.setAttribute("href", "JavaScript:TRT_fnRotateLeftLink()");
	 TRT_fnSetInnerText(btn,'Up')
	 th2x3x2.insertBefore(btn, null); 
	 th2x3x3 = document.createElement("th");  
	 tr2x3.insertBefore(th2x3x3, null);
	 tr2x3.insertBefore(th2x3x2, th2x3x3);
	 tr2x3.insertBefore(th2x3x1, th2x3x2);
	 tb2.insertBefore(tr2x3, tr2x4);
	 //line 2
	 tr2x2 = document.createElement("tr");
	 th2x2 = document.createElement("th"); 
	 th2x2.setAttribute("COLSPAN", "3");
	 tr2x2.insertBefore(th2x2, null);
	 tb2.insertBefore(tr2x2, tr2x3);
	 //line 1
	 tr2x1 = document.createElement("tr");
	 th2x1 = document.createElement("th"); 
	 th2x1.setAttribute("id", "TRT_ID_STATUS");
	 th2x1.setAttribute("COLSPAN", "3");
	 th2x1.setAttribute("bgcolor", "LightBlue");
	 TRT_fnSetInnerText(th2x1,'Game Ready!')
	 tr2x1.insertBefore(th2x1, null);
	 tb2.insertBefore(tr2x1, tr2x2);    
}


//*************************************************************
//
//*************************************************************
function TRT_fnOnKeyDown(keyCode)
{
  switch (keyCode)
  {
    case 40:
      TRT_fnDropLink(); //drop
      break;
    case 39:
      TRT_fnStep(1,0); //right
      break;
    case 37:
      TRT_fnStep(-1,0); //left
      break;
    case 38:
      TRT_fnRotate(1);
      break;
    case 32:
      TRT_fnRestartGame();
      break;
    default:
      //alert(keyCode);
      break;
  }	
}

//*************************************************************
// helper function ensures browser portability
//*************************************************************
function TRT_fnSetInnerText(dom_object,inner_text)
{
  if (dom_object.textContent==null)
  {
	//IE
	dom_object.innerText = inner_text
  }
  else
  {
  	//Mozilla Firefox
    dom_object.textContent = inner_text
  }
}

//*************************************************************
//
//*************************************************************
function TRT_fnStepDownLink()
{
   TRT_fnStep(0,1);
}

function TRT_fnStepLeftLink()
{
  TRT_fnStep(-1,0);
}

function TRT_fnStepRightLink()
{
   TRT_fnStep(1,0);
}

function TRT_fnRotateLeftLink()
{
  TRT_fnRotate(1);
}

function TRT_fnDropLink()
{
  TRT_fnDrop();
}
