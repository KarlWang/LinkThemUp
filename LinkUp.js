/**
* Ver 0.2
* 2009-09-25
*/
var Settings = {
	iRow: 		8,
	iCol:		8,
	iTotalImgs:	40
}; 

var firstVal = "";
var firstBtn = null;
var firstTD = null;
var secondVal = "";
var secondBtn = null;
var secondTD = null;
	
$(document).ready(function() {	
/* 	$("#HScanTest").click(function(){
		var TestArr = new Array();
		if (HScan("3_3", "_", TestArr))
			alert(TestArr);
	});
	
	$("#VScanTest").click(function(){
		var TestArr = new Array();
		if (VScan("5_4", "_", TestArr))
			alert(TestArr);
	});	
*/
/*	
	$("#LastPathH").click(function(){
		var AFirst = new Array();
		var ASecond = new Array();
		var TestArr = new Array();
		
		if (VScan("9_6", "_", AFirst) && VScan("2_6", "_", ASecond))
			if (LastPathH("9_6", "2_6", "_", AFirst, ASecond, TestArr))	//sFirst, sSecond, sSep, ArrayFirst, ArraySecond, ArrayOut
				alert(TestArr);
	});
	
	$("#LastPathV").click(function(){
		var AFirst = new Array();
		var ASecond = new Array();
		var TestArr = new Array();
		
		if (HScan("9_2", "_", AFirst) && HScan("1_6", "_", ASecond))
			if (LastPathV("9_2", "1_6", "_", AFirst, ASecond, TestArr))	//sFirst, sSecond, sSep, ArrayFirst, ArraySecond, ArrayOut
				$(".LVTestOut").html(TestArr + "");
	});	 */
	
	createTable("#myTable", Settings.iRow, Settings.iCol);	
	
	$("td").mouseover(function(){
		$("#showID").html("id=" + $(this).attr("id"));
		$("#showClass").html(", class=" + $(this).attr("class"));
	});
	
	$("td").attr("width", "60px");
	$("tr").attr("height", "60px");
	
	$(".TestOut span").mouseover(function(){
		$(this).css("cursor", "pointer");
	});
	
	$(".TestOut span").click(function(){
		var sClassName = $(this).html();
		sClassName = "#TestTable ." + sClassName; 
		$(sClassName).parent().css("background", "#FF0");
	});
	
	var FirstHArr = new Array();
	var FirstVArr = new Array();
	var SecondHArr = new Array();
	var SecondVArr = new Array();		
	
	$("#MainTable img").click(function(){
		if (firstVal == "")
		{
			firstBtn = $(this);
			firstVal = firstBtn.attr("class");
			firstTD = firstBtn.parent().parent();
//			firstTD.css("background", "#FF0");
			if (HScan(firstTD.attr("id"), "_", FirstHArr))
				$("#fhscanInfo").html("First HScan: " + FirstHArr);
			if (VScan(firstTD.attr("id"), "_", FirstVArr))
				$("#fvscanInfo").html("First VScan: " + FirstVArr);				
		}
		else
		{
			secondBtn = $(this);
			secondVal = secondBtn.val();
			secondTD = secondBtn.parent().parent();
//			secondTD.css("background", "#FF0");
			if (HScan(secondTD.attr("id"), "_", SecondHArr))
				$("#shscanInfo").html("Second HScan: " + SecondHArr);
			if (VScan(secondTD.attr("id"), "_", SecondVArr))
				$("#svscanInfo").html("Second VScan: " + SecondVArr);				
		}	
		
		if ((firstVal != "") && (secondVal != ""))
		{
			if ((firstVal == secondVal) && (firstTD.attr("id") != secondTD.attr("id")))
			{				
				var TestArr = new Array();
				if (ConnectThem(firstTD.attr("id"), secondTD.attr("id"), "_", TestArr))
				{
					$("#connThem").html("Connect Them: " + TestArr);
					firstBtn.hide();
					firstTD.addClass("Gone");
					secondBtn.hide();
					secondTD.addClass("Gone");	
				}
				else if (LastPathH(firstTD.attr("id"), secondTD.attr("id"), "_", FirstVArr, SecondVArr, TestArr))
				{
					$("#LastH").html("Last H Output: " + TestArr);
					firstBtn.hide();
					firstTD.addClass("Gone");
					secondBtn.hide();
					secondTD.addClass("Gone");	
				}
				else if (LastPathV(firstTD.attr("id"), secondTD.attr("id"), "_", FirstHArr, SecondHArr, TestArr))
				{
					$("#LastV").html("Last V Output: " + TestArr);
					firstBtn.hide();
					firstTD.addClass("Gone");
					secondBtn.hide();
					secondTD.addClass("Gone");	
				}
			}			
				
//			firstTD.css("background", "#FFF");
//			secondTD.css("background", "#FFF");
			firstVal = "";
			firstBtn = null;
			firstTD = null;
			secondVal = "";
			secondBtn = null;
			secondTD = null;
			FirstHArr.length=0;
			FirstVArr.length=0;
			SecondHArr.length=0;
			SecondVArr.length=0;			
		}
	});
});

function LinkSuccess()
{
	firstBtn.hide();
	firstTD.addClass("Gone");
	secondBtn.hide();
	secondTD.addClass("Gone");	
}

function LastPathH(sFirst, sSecond, sSep, ArrayFirst, ArraySecond, ArrayOut)
{
	var sFirst_y = sFirst.slice(sFirst.search(sSep) + 1);
	var sSecond_x = sSecond.slice(0, sSecond.search(sSep));	
	var iFirstIndex = $.inArray(sFirst, ArrayFirst);
	var sCurSecond = "";
	var iPre = -1;
	var iNext = -1;
	var ArrayPre = new Array();
	var ArrayNext = new Array();	

	if (-1 != $.inArray((sSecond_x + sSep + sFirst_y), ArraySecond))
		if (ConnectThem(sFirst, (sSecond_x + sSep + sFirst_y), sSep, ArrayOut))
			return true;		
			
	for (var i=1;i<ArrayFirst.length;i++)
	{
		iNext = (iFirstIndex + i);
		iPre = (iFirstIndex - i);	
		if (iNext < ArrayFirst.length)
		{
			sCurSecond = sSecond_x + sSep + ArrayFirst[iNext].slice(ArrayFirst[iNext].search(sSep) + 1);
			if (-1 != $.inArray(sCurSecond, ArraySecond))
			{
				if (ConnectThem(ArrayFirst[iNext], sCurSecond, sSep, ArrayOut))
				{
					for (var j=0;j<ArrayNext.length;j++)
						ArrayOut.push(ArrayNext[j]);
					var iA = -1;
					var iB = -1;
					iA = $.inArray(sSecond, ArraySecond);
					iB = $.inArray(sCurSecond, ArraySecond);
					if (iA > iB)
						for (var j=iB+1;j<iA;j++)
							ArrayOut.push(ArraySecond[j]);
					else
						for (var j=iA+1;j<iB;j++)
							ArrayOut.push(ArraySecond[j]);
					return true;
				}
			}
			ArrayNext.push(ArrayFirst[iNext]);
		}
		if (iPre >= 0)
		{
			sCurSecond = sSecond_x + sSep + ArrayFirst[iPre].slice(ArrayFirst[iPre].search(sSep) + 1);
			if (-1 != $.inArray(sCurSecond, ArraySecond))
			{
				if (ConnectThem(ArrayFirst[iPre], sCurSecond, sSep, ArrayOut))
				{	
					for (var k=0;k<ArrayPre.length;k++)
						ArrayOut.push(ArrayPre[k]);
					var iA = -1;
					var iB = -1;
					iA = $.inArray(sSecond, ArraySecond);
					iB = $.inArray(sCurSecond, ArraySecond);
					if (iA > iB)
						for (var j=iB+1;j<iA;j++)
							ArrayOut.push(ArraySecond[j]);
					else
						for (var j=iA+1;j<iB;j++)
							ArrayOut.push(ArraySecond[j]);						
					return true;		
				}				
			}
			ArrayPre.push(ArrayFirst[iPre]);
		}		
	}
	return false;
}

/** New Version of LastPathV() */
function LastPathV(sFirst, sSecond, sSep, ArrayFirst, ArraySecond, ArrayOut)
{
	var sFirst_x = sFirst.slice(0, sFirst.search(sSep));
	var sSecond_y = sSecond.slice(sSecond.search(sSep) + 1);	
	var iFirstIndex = $.inArray(sFirst, ArrayFirst);
	var sCurSecond = "";
	var iPre = -1;
	var iNext = -1;
	var ArrayPre = new Array();
	var ArrayNext = new Array();
	
	if (-1 != $.inArray((sFirst_x + sSep + sSecond_y), ArraySecond))
		if (ConnectThem(sFirst, (sFirst_x + sSep + sSecond_y), sSep, ArrayOut))
			return true;

	for (var i=1;i<ArrayFirst.length;i++)
	{
		iNext = (iFirstIndex + i);
		iPre = (iFirstIndex - i);
		if (iNext < ArrayFirst.length)
		{
			sCurSecond = ArrayFirst[iNext].slice(0, ArrayFirst[iNext].search(sSep)) + sSep + sSecond_y;
			if (-1 != $.inArray(sCurSecond, ArraySecond))
			{
				if (ConnectThem(ArrayFirst[iNext], sCurSecond, sSep, ArrayOut))
				{
					for (var j=0;j<ArrayNext.length;j++)
						ArrayOut.push(ArrayNext[j]);
					var iA = -1;
					var iB = -1;
					iA = $.inArray(sSecond, ArraySecond);
					iB = $.inArray(sCurSecond, ArraySecond);
					if (iA > iB)
						for (var j=iB+1;j<iA;j++)
							ArrayOut.push(ArraySecond[j]);
					else
						for (var j=iA+1;j<iB;j++)
							ArrayOut.push(ArraySecond[j]);
					return true;
				}
			}
			ArrayNext.push(ArrayFirst[iNext]);
		}
		if (iPre >= 0)
		{
			sCurSecond = ArrayFirst[iPre].slice(0, ArrayFirst[iPre].search(sSep)) + sSep + sSecond_y;
			if (-1 != $.inArray(sCurSecond, ArraySecond))
			{
				if (ConnectThem(ArrayFirst[iPre], sCurSecond, sSep, ArrayOut))
				{	
					for (var k=0;k<ArrayPre.length;k++)
						ArrayOut.push(ArrayPre[k]);
					var iA = -1;
					var iB = -1;
					iA = $.inArray(sSecond, ArraySecond);
					iB = $.inArray(sCurSecond, ArraySecond);
					if (iA > iB)
						for (var j=iB+1;j<iA;j++)
							ArrayOut.push(ArraySecond[j]);
					else
						for (var j=iA+1;j<iB;j++)
							ArrayOut.push(ArraySecond[j]);						
					return true;		
				}				
			}
			ArrayPre.push(ArrayFirst[iPre]);
		}
	}
	return false;
}

function createTable(output, row, col)
{
	var totalgrids = row * col;
	var out = $(output);
	var _td = "</td>";
	var td = "";
	var tr_ = "<tr>";
	var _tr = "</tr>";	
	var tr = "";
	var table = "";
	
	var iIndexArray = new Array();
	var iIndex = -1;
	var sRemoved = "";
	var iNewArray = new Array();	
	var c = 0;
	
	for (var i=0;i<(row * col / 2);i++)
	{
		iIndex = randomizeMe(this, {maxNumber: Settings.iTotalImgs, exempt: []});
		iIndexArray.push(iIndex);
		iIndexArray.push(iIndex);
	}
	
	//For Testing
	for (var i=0;i<(row * col);i++)
	{
		$(".TestOut").append("<span class='" + iIndexArray[i] + "'>" + iIndexArray[i] + "</span> | ");	
	}
	
	for (var i=0;i<=(row+1);i++)
	{
 		if ((0 == i) || ((row+1) == i))
			for (var k=0;k<=(col+1);k++)
				td = td + "<td align='center' id='" + k + "_" + i + "' class='Gone'><div class='normal'></div>" + _td;
		else
			for (j=0;j<=(col+1);j++)
			{
				if ((0 == j) || ((col+1) == j))
					td = td + "<td align='center' id='" + j + "_" + i + "' class='Gone'><div class='normal'></div>" + _td;
				else
				{
					sRemoved = iIndexArray.splice(randomizeMe(this, {maxNumber: (totalgrids - c), exempt: []}), 1);
					td = td + "<td align='center' id='" + j + "_" + i + "'><div class='normal'>" + "<img class='" + sRemoved + "' src='Face/" + ArrayFace[sRemoved] + "' //></div>" + _td;
					c++;
				}
			}
		tr = tr_ + td + _tr;
		table = table + tr;
		tr = "";
		td = "";
	}
	table = "<table align='center' style='border-style:dashed; border-width:medium;' id='MainTable' border='1'>" + table + "</table>";
	out.html(table);	
}

function HScan(sPointIn, sSep, ArrayOut)
{
	var sCurrent = "";
	var iPointIn_x = parseInt(sPointIn.slice(0, sPointIn.search(sSep)) , 10);
	var sPointIn_y = sPointIn.slice(sPointIn.search(sSep) + 1);
	for (var i=0;i<=Settings.iCol+1;i++)
	{
		sCurrent = i + sSep + sPointIn_y;
		if (i < iPointIn_x)
		{
			if ("Gone" == $("#" + sCurrent).attr("class"))	
				ArrayOut.push(sCurrent);
			else
				ArrayOut.length = 0;
		}
		else if (i == iPointIn_x)
			ArrayOut.push(sCurrent);
		else if (i == (Settings.iCol + 1))
		{
			ArrayOut.push(sCurrent);
			return true;
		}
		else
		{
			if ("Gone" == $("#" + sCurrent).attr("class"))	
				ArrayOut.push(sCurrent);
			else
				return true;
		}	
	}
	ArrayOut.length = 0;
	return false;
}

function VScan(sPointIn, sSep, ArrayOut)
{
	var sCurrent = "";
	var sPointIn_x = sPointIn.slice(0, sPointIn.search(sSep));
	var iPointIn_y = parseInt(sPointIn.slice(sPointIn.search(sSep) + 1), 10);
	for (var i=0;i<=Settings.iRow+1;i++)
	{
		sCurrent = sPointIn_x + sSep + i;
		if (i < iPointIn_y)
		{
			if ("Gone" == $("#" + sCurrent).attr("class"))	
				ArrayOut.push(sCurrent);
			else
				ArrayOut.length = 0;			
		}
		else if (i == iPointIn_y)
			ArrayOut.push(sCurrent);
		else if (i == (Settings.iRow + 1))
		{
			ArrayOut.push(sCurrent);
			return true;
		}
		else
		{
			if ("Gone" == $("#" + sCurrent).attr("class"))	
				ArrayOut.push(sCurrent);
			else
				return true;
		}
	}
	ArrayOut.length = 0;
	return false;
} 

function ConnectThem(sFrom, sTo, sSep, ArrayOut)
{
	var iFrom_x = -1;
	var iFrom_y = -1;
	var iTo_x = -1;
	var iTo_y = -1;
	var sCurrent = "";
	var usindex = sFrom.search(sSep);
	
	if (-1 == usindex)
		return false;
	iFrom_x = parseInt(sFrom.slice(0, usindex), 10);
	iFrom_y = parseInt(sFrom.slice(usindex + 1), 10);
	
	usindex = sTo.search(sSep);
	if (-1 == usindex)
		return false;	
	iTo_x = parseInt(sTo.slice(0, usindex), 10);
	iTo_y = parseInt(sTo.slice(usindex + 1), 10);	
	
	if (iFrom_x == iTo_x)
	{	
		ArrayOut.push(sFrom);
		var iTimes = Math.abs(iTo_y - iFrom_y);
		for (var i=1;i<iTimes;i++)
		{	
			if (iTo_y > iFrom_y)
				sCurrent = iFrom_x + sSep + (iFrom_y + i);
			else
				sCurrent = iFrom_x + sSep + (iFrom_y - i);
			if ($("#" + sCurrent).attr("class") == "Gone")
				ArrayOut.push(sCurrent);
			else
			{
				ArrayOut.length = 0;
				return false;		
			}
		}
		ArrayOut.push(sTo);
		return true;
	}
	else if (iFrom_y == iTo_y)
	{
		ArrayOut.push(sFrom);
		var iTimes = Math.abs(iTo_x - iFrom_x);
		for (var i=1;i<iTimes;i++)
		{
			if (iTo_x > iFrom_x)	
				sCurrent = (iFrom_x + i) + sSep + iFrom_y;
			else
				sCurrent = (iFrom_x - i) + sSep + iFrom_y;				
			if ($("#" + sCurrent).attr("class") == "Gone")
				ArrayOut.push(sCurrent);
			else
			{
				ArrayOut.length = 0;
				return false;
			}
		}
		ArrayOut.push(sTo);
		return true;
	}
	ArrayOut.length = 0;
	return false;
}

function randomizeMe(me, options){
    var options = options || {}; // setup the options
    var imExempt = options.exempt || null; // capture the exempt numbers
    var maxNum = options.maxNumber || 0; // capture the maximum number to randomize	
    var rand_no = Math.floor(Math.random()*maxNum); // run the random numbers
    
    if(imExempt != null){ // check to see if there are any exempt numbers
        imExempt = imExempt.toString(); // turn the exemptions into a string
        for(i=0; i <= maxNum; i++){ // loop throught the set number
            if(imExempt.search(rand_no) != -1){ // check for exempt numbers			
                return randomizeMe(me, {exempt: imExempt, maxNumber: maxNum}); // start over 
            }
        }
    }    
    return rand_no;
} 

function ArrayShuffle(arr) 
{
    for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
}

var ArrayFace = new Array();;
ArrayFace[0] = "Airplane.JPG";
ArrayFace[1] = "Cactus.JPG";
ArrayFace[2] = "Alien.JPG";
ArrayFace[3] = "AlienHead.JPG";
ArrayFace[4] = "AngryCat.JPG";
ArrayFace[5] = "AngryDog.JPG";
ArrayFace[6] = "balloon.JPG";
ArrayFace[7] = "Baseball.JPG";
ArrayFace[8] = "Basketball.JPG";
ArrayFace[9] = "beachball.JPG";
ArrayFace[10] = "BlueDragon.JPG";
ArrayFace[11] = "BlueFish.JPG";
ArrayFace[12] = "boat.JPG";
ArrayFace[13] = "Buddha.JPG";
ArrayFace[14] = "";
ArrayFace[15] = "";
ArrayFace[16] = "";
ArrayFace[17] = "";
ArrayFace[18] = "";
ArrayFace[19] = "";
ArrayFace[20] = "";
ArrayFace[21] = "";
ArrayFace[22] = "";
ArrayFace[23] = "";
ArrayFace[24] = "";
ArrayFace[25] = "";
ArrayFace[26] = "";
ArrayFace[27] = "";
ArrayFace[28] = "";
ArrayFace[29] = "";
ArrayFace[30] = "";
ArrayFace[31] = "";
ArrayFace[32] = "";
ArrayFace[33] = "";
ArrayFace[34] = "";
ArrayFace[35] = "";
ArrayFace[36] = "";
ArrayFace[37] = "";
ArrayFace[38] = "";
ArrayFace[39] = "";
ArrayFace[40] = "";
ArrayFace[41] = "";
ArrayFace[42] = "";
ArrayFace[43] = "";
ArrayFace[44] = "";
ArrayFace[45] = "";
ArrayFace[46] = "";
ArrayFace[47] = "";
ArrayFace[48] = "";
ArrayFace[49] = "";
ArrayFace[50] = "";
ArrayFace[51] = "";