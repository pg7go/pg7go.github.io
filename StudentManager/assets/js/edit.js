
//设置多个表格可编辑    
function EditTables(){    
for(var i=0;i<arguments.length;i++){ settablecanedit(arguments[i]);="" }="" 设置表格是可编辑的="" function="" settablecanedit(table){="" for(var="" i="1;" i<table.rows.length;i++){="" setrowcanedit(table.rows[i]);="" setrowcanedit(row){="" j="0;j<row.cells.length;" j++){="" 如果当前单元格指定了编辑类型，则表示允许编辑="" var="" edittype="row.cells[j].getAttribute("EditType");" if(!edittype){="" 如果当前单元格没有指定，则查看当前列是否指定="" if(edittype){="" row.cells[j].onclick="function" (){="" editcell(this);="" 设置指定单元格可编辑="" editcell(element,="" edittype){="" ;="" 强改一波="" intype="document.getElementById("studenttable").rows[0].cells[element.cellIndex].getAttribute("InType");" switch(edittype){="" case="" "textbox":="" createtextbox(element,="" element.innerhtml,intype);="" break;="" "dropdownlist":="" createdropdownlist(element);="" "button":="" element.innerhtml="<button class=\" btn="" btn-success\"="">保存";
   	var btn=element.getElementsByTagName("a")[0];
   	btn.innerHTML="保存";
   	btn.setAttribute("onclick","");
   btn.onclick=function (){    
   		//alert("保存成功");
   		for(var i=0;i<element.parentnode.cells.length;i++) {="" console.log(element.parentnode.cells[i].getelementsbytagname("input"));="" editend(element.parentnode.cells[i]);="" }="" checkexpression(element.parentnode);="" btn.innerhtml="编辑" ;="" btn.setattribute("onclick","editthisrow(this)");="" console.log(element)="" element.parentnode.setattribute("onedit","false");="" _addtable(element.parentnode);="" break;="" default:="" 为单元格创建可编辑输入框="" function="" createtextbox(element,="" value,intype){="" 检查编辑状态，如果已经是编辑状态，跳过="" var="" editstate="element.getAttribute("EditState");" if(editstate="" !="true" ){="" 创建文本框="" textbox="document.createElement("INPUT");" if(intype="="String"){textBox.type" =="" "text";}="" else{textbox.type="number" ;}="" textbox.classname="input-inner" 设置文本框当前值="" if(!value){="" value="element.getAttribute("Value");" textbox.value="value;" 设置文本框的失去焦点事件="" textbox.onblur="function" (){="" canceleditcell(this.parentnode,="" this.value);="" 向当前单元格添加文本框="" clearchild(element);="" element.appendchild(textbox);="" textbox.focus();="" textbox.select();="" 改变状态变量="" element.setattribute("editstate",="" "true");="" element.parentnode.parentnode.setattribute("currentrow",="" element.parentnode.rowindex);="" 为单元格创建选择框="" createdropdownlist(element,="" value){="" 创建下接框="" downlist="document.createElement("Select");" downlist.classname="EditCell_DropDownList" 添加列表项="" items="element.getAttribute("DataItems");" if(!items){="" if(items){="" +="" "]");="" for(var="" i="0;" i<items.length;="" i++){="" ooption="document.createElement("OPTION");" ooption.text="items[i].text;" ooption.value="items[i].value;" downlist.options.add(ooption);="" 设置列表当前值="" downlist.value="value;" 设置创建下接框的失去焦点事件="" downlist.onblur="function" this.value,="" this.options[this.selectedindex].text);="" 向当前单元格添加创建下接框="" element.appendchild(downlist);="" downlist.focus();="" 记录状态的改变="" element.parentnode.parentnode.setattribute("lasteditrow",="" 取消单元格编辑状态="" canceleditcell(element,="" value,="" text){="" if(element.getattribute("editstate")!="true" ){return;}="" element.setattribute("value",="" value);="" if(text){="" element.innerhtml="text;" }else{="" "false");="" 检查是否有公式计算="" 清空指定对象的所有字节点="" clearchild(element){="" pad(num,="" n)="" return="" (array(n).join(0)="" num).slice(-n);="" tindex="document.getElementById("studenttable").rows.length;" 添加行="" addrow(table,="" index){="" document.getelementbyid("nofound").innerhtml="" $(table).append("<tr="" tid="0"><td></td><td></td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><a onclick="editTHisRow(this)" class="\"btn" btn-success\"="" name="\"edit\"">编辑<a onclick="delTHisRow(this)" class="\"btn" btn-danger\"="" name="\"del\"">删除</a></a></td>");
var newRow=table.rows[table.rows.length-1];
newRow.cells[0].innerHTML=pad(table.rows.length-1,3);

newRow.setAttribute("tid",tIndex++);

newRow.getElementsByTagName("a")[0].onclick();

//SetRowCanEdit(newRow);    
return newRow;    
    
}    
    
    
//删除行    
function DeleteRow(table, index){    
for(var i=table.rows.length - 1; i>0;i--){    
   var chkOrder = table.rows[i].cells[0].firstChild;    
   if(chkOrder){    
    if(chkOrder.type = "CHECKBOX"){    
     if(chkOrder.checked){    
      //执行删除    
      table.deleteRow(i);    
     }    
    }    
   }    
}    
}    
    
//提取表格的值,JSON格式    
function GetTableData(table){    
var tableData = new Array();    
alert("行数：" + table.rows.length);    
for(var i=1; i<table.rows.length;i++){ tabledata.push(getrowdata(tabproduct.rows[i]));="" }="" return="" tabledata;="" 提取指定行的数据，json格式="" function="" getrowdata(row){="" var="" rowdata="{};" for(var="" j="0;j<row.cells.length;" j++){="" name="row.parentNode.parentNode.rows[0].cells[j].getAttribute("Name");" if(name){="" value="row.cells[j].getAttribute("Value");" if(!value){="" rowdata[name]="value;" alert("productname:"="" +="" rowdata.productname);="" 或者这样：alert("productname:"="" rowdata["productname"]);="" rowdata;="" 检查当前数据行中需要运行的字段="" checkexpression(row){="" expn="row.parentNode.parentNode.rows[0].cells[j].getAttribute("Expression");" 如指定了公式则要求计算="" if(expn){="" result="Expression(row,expn);" format="row.parentNode.parentNode.rows[0].cells[j].getAttribute("Format");" if(format){="" 如指定了格式，进行字值格式化="" row.cells[j].innerhtml="formatNumber(Expression(row,expn)," format);="" }else{="" 计算需要运算的字段="" expression(row,="" expn){="" 循环代值计算="" reg="new" regexp(name,="" "i");="" rowdata[name].replace(="" \,="" g,="" ""));="" eval(expn);="" **="" *="" 格式化数字显示方式="" 用法="" formatnumber(12345.999,'#,##0.00');="" formatnumber(12345.999,'#,##0.##');="" formatnumber(123,'000000');="" @param="" num="" pattern="" 以下是范例="" formatnumber('','')="0" formatnumber(123456789012.129,null)="123456789012" formatnumber(null,null)="0" formatnumber(123456789012.129,'#,##0.00')="123,456,789,012.12" formatnumber(123456789012.129,'#,##0.##')="123,456,789,012.12" formatnumber(123456789012.129,'#0.00')="123,456,789,012.12" formatnumber(123456789012.129,'#0.##')="123,456,789,012.12" formatnumber(12.129,'0.00')="12.12" formatnumber(12.129,'0.##')="12.12" formatnumber(12,'00000')="00012" formatnumber(12,'#.##')="12" formatnumber(12,'#.00')="12.00" formatnumber(0,'#.##')="0" formatnumber(num,pattern){="" strarr="num?num.toString().split('.'):['0'];" fmtarr="pattern?pattern.split('.'):[''];" retstr="" ;="" 整数部分="" str="strarr[0];" fmt="fmtarr[0];" i="str.length-1;" comma="false;" f="fmt.length-1;f">=0;f--){      
    switch(fmt.substr(f,1)){      
      case '#':      
        if(i>=0 ) retstr = str.substr(i--,1) + retstr;      
        break;      
      case '0':      
        if(i>=0) retstr = str.substr(i--,1) + retstr;      
        else retstr = '0' + retstr;      
        break;      
      case ',':      
        comma = true;      
        retstr=','+retstr;      
        break;      
    }      
}      
if(i>=0){      
    if(comma){      
      var l = str.length;      
      for(;i>=0;i--){      
        retstr = str.substr(i,1) + retstr;      
        if(i>0 && ((l-i)%3)==0) retstr = ',' + retstr;       
      }      
    }      
    else retstr = str.substr(0,i+1) + retstr;      
}      
      
retstr = retstr+'.';      
// 处理小数部分      
str=strarr.length>1?strarr[1]:'';      
fmt=fmtarr.length>1?fmtarr[1]:'';      
i=0;      
for(var f=0;f</table.rows.length;i++){></element.parentnode.cells.length;i++)></arguments.length;i++){>