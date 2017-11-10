var mytable=document.getElementById("studenttable").cloneNode(true);
anlyzeAll();

$(document).ready(function() {
    refresh();
});


function saveTable(){mytable=document.getElementById("studenttable").cloneNode(true);}
function getbackTable()
{
	document.getElementById("nofound").innerHTML="";
	saveAllValues();
	document.getElementById("studenttable").innerHTML=mytable.innerHTML;
}

function _addTable(row)
{
	var newrow=row.cloneNode(true);
	mytable.tBodies[0].appendChild(newrow);
	refresh();
}
function _delTable(row)
{
	for(var i=1;i<mytable.rows.length;i++)
	{
		if(mytable.rows[i].getAttribute("tid")==row.getAttribute("tid"))
		{
			mytable.deleteRow(i);
			return;
		}
	}
	refresh();
}

function searchByName()
{
	saveAllValues();
	id=document.getElementById("input").value;
	var rows=new Array();
	var index=0;
	for(var i=1;i<mytable.rows.length;i++)
	{
		if(mytable.rows[i].cells[1].innerHTML.search(eval("/"+id+"/i"))!=-1)
		{
			rows[index++]=mytable.rows[i];
		}
	}

	showWhatFinded(rows);
}
function searchById()
{
	saveAllValues();
	id=document.getElementById("input").value;
	var rows=new Array();
	var index=0;
	for(var i=1;i<mytable.rows.length;i++)
	{
		if(mytable.rows[i].cells[0].innerHTML.search(eval("/"+id+"/i"))!=-1)
		{
			rows[index++]=mytable.rows[i];
		}
	}
	showWhatFinded(rows);
}
function showWhatFinded(rows)
{
	var table=document.getElementById("studenttable");
	table.tBodies[0].innerText="";
	if(rows==0)
	{
		document.getElementById("nofound").innerHTML="没有找到相关信息";
	}
	else
	{
		document.getElementById("nofound").innerHTML="";
		for(var i=0;i<rows.length;i++)
		{
			var newRoll=rows[i].cloneNode(true);
			table.tBodies[0].appendChild(newRoll);
		}
	}
	$("#studenttable").tablesorter();
}

function getScoreSum(row)
{
	var a=0
	var table=document.getElementById("studenttable");
		for(var i=1;i<table.rows.length;i++)
		{
			var num=table.rows[i].cells[row].innerHTML;
			a+=(num*1.0);
		}
	return "课程总分："+a+"   平均："+(a/(table.rows.length-1)).toFixed(2);
}

function getScoreData(row)
{
	var a=0,b=0,c=0,d=0,e=0;
	var table=document.getElementById("studenttable");
		for(var i=1;i<table.rows.length;i++)
		{
			var num=table.rows[i].cells[row].innerHTML;
			if(num>=90)
			a++;
			else if(num>=80)
			b++;
			else if(num>=70)
			c++;
			else if(num>=60)
			d++;
			else {e++;}
		}
	var data="";
	data+="优秀："+a+"人   比例："+(a*100/(table.rows.length-1)).toFixed(2)+"%<br>";
	data+="良好："+b+"人   比例："+(b*100/(table.rows.length-1)).toFixed(2)+"%<br>";
	data+="中等："+c+"人   比例："+(c*100/(table.rows.length-1)).toFixed(2)+"%<br>";
	data+="及格："+d+"人   比例："+(d*100/(table.rows.length-1)).toFixed(2)+"%<br>";
	data+="不及格："+e+"人   比例："+(e*100/(table.rows.length-1)).toFixed(2)+"%<br>";
	return data;
}

function refresh(){anlyzeAll();$("#studenttable").tablesorter(); }

function anlyzeAll()
{
	document.getElementById("a-a").innerHTML= getScoreData(2);
	document.getElementById("b-a").innerHTML= getScoreData(3);
	document.getElementById("c-a").innerHTML= getScoreData(4);
	
	document.getElementById("a-b").innerHTML= getScoreSum(2);
	document.getElementById("b-b").innerHTML= getScoreSum(3);
	document.getElementById("c-b").innerHTML= getScoreSum(4);

}

var BlobBuilder = BlobBuilder;
var URL = URL || webkitURL || window;
function saveAs(blob, filename) {
    var type = blob.type;
    var force_saveable_type = 'application/octet-stream';
    if (type && type != force_saveable_type) { // 强制下载，而非在浏览器中打开
        var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
        blob = slice.call(blob, 0, blob.size, force_saveable_type);
    }
    var url = URL.createObjectURL(blob);
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = url;
    save_link.download = filename;
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
    URL.revokeObjectURL(url);
}




function tsaveAs()
{
    var content = mytable.innerHTML;
    var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "学生管理系统.data");//saveAs(blob,filename)
}
function tloadFrom()
{
	$("#upload").click();
}

  document.querySelector('#upload').addEventListener('change', function(e){
    handFile(e.target.files[0]);
  });
 
  function handFile(file){

    var reader = new FileReader();
    reader.onload = function(e){
      document.getElementById("studenttable").innerHTML = e.target.result;
      saveTable();
      refresh();
    };
    reader.readAsText(file);
  }