function jsResetImage() {
	_prResetPosition();
	_prResetImage();
	return;
}
function jsResizeImage(rate) {
	_prResizeImage(rate);
	return;
}
var z,x,y;
var gImageGroupList_	= new Array;
var gIdx_				= 0;
function _prImageGroupStruct(group_size,rect_size,img_size,p_tag,gaiji_obj,tp_obj,bl_obj,ul_obj,sh_obj,st_obj) {
	this.group		= group_size;
	this.rect		= rect_size;
	this.img		= img_size;
	this.p			= p_tag;
	this.gaiji		= gaiji_obj;
	this.tp			= tp_obj;
	this.bl			= bl_obj;
	this.ul			= ul_obj;
	this.sh			= sh_obj;
	this.st			= st_obj;
}
function _prSizeStruct(newObj,newWidth,newHeight) {
	this.obj		= newObj;
	this.width		= newWidth;
	this.height		= newHeight;
}
function _prImageStruct(newObj,newLeft,newTop,newWidth,newHeight) {
	this.obj		= newObj;
	this.left		= newLeft;
	this.top		= newTop;
	this.width		= newWidth;
	this.height		= newHeight;
}
function _prPTagStruct(newObj,newLeft,newTop,newFontSize,newDispSize,newPrtSize) {
	this.obj		= newObj;
	this.left		= newLeft;
	this.top		= newTop;
	this.fontsize	= newFontSize;
	this.dispsize	= newDispSize;
	this.prtsize	= newPrtSize;
}
function _prGaijiStruct(newObj,newHeight) {
	this.obj		= newObj;
	this.height		= newHeight;
}
function _prLineTagStruct(newObj,newFromx,newFromy, newTox, newToy) {
	this.obj			= newObj;
	this.fromx		= newFromx;
	this.fromy		= newFromy;
	this.tox		= newTox;
	this.toy		= newToy;
}
function _prShapeTagStruct(newObj,newWidth,newHeight,newPath) {
	this.obj			= newObj;
	this.width		= newWidth;
	this.height		= newHeight;
	this.path = new Array;
	this.path = newPath.value.split(" ");
}
function _prStrokeTagStruct(newObj,newWeight) {
	this.obj		= newObj;
	this.weight	= newWeight;
}
function _prTPTagStruct(newObj,newFontSize,newDispSize,newPrtSize) {
	this.obj		= newObj;
	this.fontsize	= newFontSize;
	this.dispsize	= newDispSize;
	this.prtsize	= newPrtSize;
}
function _prInitImageInfo(rate) {
	var endFlag = false;
	gDefaultRate_ = rate;
	gIdx_ = 0;
	var save_i;
	var iii = 100;
	for(var i = 1; !endFlag; i++){
		save_i = i;
		var groupObject = document.getElementById("group" + i);
		if(groupObject == null){
			groupObject = document.getElementById("group" + iii);
			if(groupObject == null){
				groupObject = document.getElementById("group" + i + "_noresize");
				if(groupObject == null){
					endFlag = true;	
					break;
				}
				continue;
			}
			else {
				i = iii
				iii++;
			}
		}
		var groupWidth	= _prRemoveUnit(groupObject.style.width);
		var groupHeight	= _prRemoveUnit(groupObject.style.height);
		var rectObject	= document.getElementById("rect" + i);
		var rectWidth	= null;
		var rectHeight	= null;
		if(rectObject != null){
			rectWidth	= _prRemoveUnit(rectObject.style.width);
			rectHeight	= _prRemoveUnit(rectObject.style.height);
		}
		var imgObject	= document.getElementById("img" + i);
		var imgLeft		= null;
		var imgTop		= null;
		var imgWidth	= null;
		var imgHeight	= null;
		if(imgObject != null){
			imgLeft		= _prRemoveUnit(imgObject.style.left);
			imgTop		= _prRemoveUnit(imgObject.style.top);
			imgWidth	= _prRemoveUnit(imgObject.style.width);
			imgHeight	= _prRemoveUnit(imgObject.style.height);
		}
		var pObject		= null;
		for(var j = 1; !endFlag; j++){
			var pTag = document.getElementById("p" + i + "_" + j);
			if(pTag == null){
				if(j == 1){
					endFlag = true;
				}
				break;
			}
			if(j == 1){
				pObject		= new Array();
			}
			if(pTag.prt_font_size == null){
				pObject[j-1] = new _prPTagStruct(
									pTag,
									_prRemoveUnit(pTag.style.left),
									_prRemoveUnit(pTag.style.top),
									_prRemoveUnit(pTag.style.fontSize),
									_prRemoveUnit(pTag.style.fontSize),
									0.0
								);
			}
			else{
				pObject[j-1] = new _prPTagStruct(
									pTag,
									_prRemoveUnit(pTag.style.left),
									_prRemoveUnit(pTag.style.top),
									_prRemoveUnit(pTag.style.fontSize),
									_prRemoveUnit(pTag.disp_font_size),
									_prRemoveUnit(pTag.prt_font_size)
								);
			}
		}
		var gaijiObject		= null;
		var gaijiList		= document.all.item("gi" + i);
		if(gaijiList != null){
			gaijiObject		= new Array();
			for(var j = 0; j<gaijiList.length; j++){
				var gTag = gaijiList[j];
				gaijiObject[j] = new _prGaijiStruct(
									gTag,
									_prRemoveUnit(gTag.style.height)
								);
			}
		}
		endFlag = false;
		var tpObject		= null;
		for(var j = 1; !endFlag; j++){
			var tpTag = document.getElementById("tp" + i + "_" + j);
			if(tpTag == null){
				if(j == 1){
					endFlag = true;  
				}
				break;
			}
			if(j == 1){
				tpObject		= new Array();
			}
			tpObject[j-1] = new _prTPTagStruct(
									tpTag,
									_prRemoveUnit(tpTag.style.fontSize),
									_prRemoveUnit(tpTag.disp_font_size),
									_prRemoveUnit(tpTag.prt_font_size)
								);
		}
		endFlag = false;
		var blObject		= null;
		for(var j = 1; !endFlag; j++){
			var baseline = document.getElementById("bl" + i + "_" + j);
			if(baseline == null){
				if(j == 1){
					endFlag = true;  
				}
				break;
			}
			if(j == 1){
				blObject		= new Array();
			}
			blObject[j-1] = new _prLineTagStruct(
									baseline,
									(baseline.from+'').substring(0,(baseline.from+'').indexOf(",")),
									(baseline.from+'').substring((baseline.from+'').indexOf(",")+1,(baseline.from+'').length),
									(baseline.to+'').substring(0,(baseline.to+'').indexOf(",")),
									(baseline.to+'').substring((baseline.to+'').indexOf(",")+1, (baseline.to+'').length)
								);
		}
		endFlag = false;
		var shObject		= null;
		for(var j = 1; !endFlag; j++){
			var baseline = document.getElementById("sh" + i + "_" + j);
			if(baseline == null){
				if(j == 1){
					endFlag = true;  
				}
				break;
			}
			if(j == 1){
				shObject		= new Array();
			}
			shObject[j-1] = new _prShapeTagStruct(
									baseline,
									_prRemoveUnit(baseline.style.width),
									_prRemoveUnit(baseline.style.height),
									baseline.path
								);
		}
		endFlag = false;
		var stObject		= null;
		for(var j = 1; !endFlag; j++){
			var baseline = document.getElementById("st" + i + "_" + j);
			if(baseline == null){
				if(j == 1){
					endFlag = true;  
				}
				break;
			}
			if(j == 1){
				stObject		= new Array();
			}
			stObject[j-1] = new _prStrokeTagStruct(
									baseline,
									baseline.weight
								);
		}
		endFlag = false;
		var ulObject		= null;
		for(var j = 1; !endFlag; j++){
			var underline = document.getElementById("ul" + i + "_" + j);
			if(underline == null){
				if(j == 1){
					endFlag = true;  
				}
				break;
			}
			if(j == 1){
				ulObject		= new Array();
			}
			ulObject[j-1] = new _prLineTagStruct(
									underline,
									(underline.from+'').substring(0,(underline.from+'').indexOf(",",0)),
									(underline.from+'').substring((underline.from+'').indexOf(",")+1,(underline.from+'').length),
									(underline.to+'').substring(0,(underline.to+'').indexOf(",")),
									(underline.to+'').substring((underline.to+'').indexOf(",")+1, (underline.to+'').length)
								);
		}
		endFlag = false;
		gImageGroupList_[gIdx_] = new _prImageGroupStruct (
			new _prSizeStruct(groupObject,groupWidth,groupHeight),
			new _prSizeStruct(rectObject,rectWidth,rectHeight),
			new _prImageStruct(imgObject,imgLeft,imgTop,imgWidth,imgHeight),
			pObject,
			gaijiObject,
			tpObject,
			blObject,
			ulObject,
			shObject,
			stObject
		);
		gIdx_++;
		i = save_i;
	}
	return ;
}
function _prResizeImage(rate) {
	var  hei = 0;
	for(var i=0; i<gImageGroupList_.length; i++){
		if(gImageGroupList_[i].group != null){
			var obj = gImageGroupList_[i].group;
			obj.obj.style.width = (obj.width * rate) + 'px';
			obj.obj.style.height = (obj.height * rate) + 'px';
			obj.obj.coordsize = (obj.width * rate) + ',' + (obj.height * rate);
			hei = obj.height * rate
		}
		if(gImageGroupList_[i].rect != null){
			var obj = gImageGroupList_[i].rect;
			obj.obj.style.width = (obj.width * rate) + 'px';
			obj.obj.style.height = (obj.height * rate) + 'px';
		}
		if(gImageGroupList_[i].img != null){
			var obj = gImageGroupList_[i].img;
			obj.obj.style.left = (obj.left * rate) + 'px';
			obj.obj.style.top = (obj.top * rate) + 'px';
			obj.obj.style.width = (obj.width * rate) + 'px';
			obj.obj.style.height = (obj.height * rate) + 'px';
		}
		if(gImageGroupList_[i].p != null){
			var obj = gImageGroupList_[i].p;
			for(var j=0; j<obj.length; j++){
				var p = obj[j];
				if(p.left != ""){
					p.obj.style.left		= (p.left * rate) + 'px';
				}
				if(p.top != ""){
					p.obj.style.top			= (p.top * rate) + 'px';
				}
				if(p.fontsize != ""){
					p.obj.style.fontSize	= (p.fontsize * rate) + 'pt';
				}
			}
		}
		if(gImageGroupList_[i].gaiji != null){
			var obj = gImageGroupList_[i].gaiji;
			for(var j=0; j<obj.length; j++){
				var g = obj[j];
				g.obj.style.height = (g.height * rate) + 'px';
			}
		}
		if(gImageGroupList_[i].tp != null){
			var obj = gImageGroupList_[i].tp;
			for(var j=0; j<obj.length; j++){
				var tp = obj[j];
				if(tp.fontsize != ""){
					if(tp.fontsize*rate < 5.5){
						tp.obj.style.fontSize	= '5.5pt';
					}
					else{
						tp.obj.style.fontSize	= (tp.fontsize * rate) + 'pt';
					}
				}
			}
		}
		if(gImageGroupList_[i].bl != null){
			var obj = gImageGroupList_[i].bl;
			for(var j=0; j<obj.length; j++){
				var bl = obj[j];
				var fromx,tox;
				if(bl.fromx != ""){
					fromx = bl.fromx * rate;
					bl.obj.from	= fromx + "," + (bl.fromy * rate);
				}
				if(bl.tox != ""){
					tox = bl.tox * rate;
					if((0 >=tox-fromx) && (fromx-tox) < 1) {
						tox = tox-1;
					}
					if((0 <= tox-fromx) && (tox-fromx) < 1) {
						tox = tox+1;
					}
					bl.obj.to	= tox + "," + (bl.toy * rate);
				}
			}
		}
		if(gImageGroupList_[i].ul != null){
			var obj = gImageGroupList_[i].ul;
			for(var j=0; j<obj.length; j++){
				var ul = obj[j];
				if(ul.fromx != ""){
					ul.obj.from	= (ul.fromx * rate) + "," + (ul.fromy * rate);
				}
				if(ul.tox != ""){
					ul.obj.to	= (ul.tox * rate) + "," + (ul.toy * rate);
				}
			}
		}
		if(gImageGroupList_[i].sh != null){
			var obj = gImageGroupList_[i].sh;
			for(var j=0; j<obj.length; j++){
				var sh = obj[j];
				sh.obj.style.width = (sh.width * rate) + 'px';
				sh.obj.style.height = (sh.height * rate) + 'px';
				var strPathBuf="";
				for(var k=0; k<sh.path.length; k++){
					if((sh.path[k] == "0") || (sh.path[k] > 0)){
						strPathBuf += sh.path[k] * rate;
					}
					else {
						strPathBuf += sh.path[k];
					}
					strPathBuf += " ";
				}
				sh.obj.path = strPathBuf;
			}
		}
		if(gImageGroupList_[i].st != null){
			var obj = gImageGroupList_[i].st;
			for(var j=0; j<obj.length; j++){
				var st = obj[j];
				if(st.weight != ""){
					st.obj.weight	= st.weight + 'px';
				}
			}
		}
	}
	return hei;
}
function _prResizeImageAt(idx,rate) {
	var  hei = 0;
		if(gImageGroupList_[idx].group != null){
			var obj = gImageGroupList_[idx].group;
			obj.obj.style.width = (obj.width * rate) + 'px';
			obj.obj.style.height = (obj.height * rate) + 'px';
			obj.obj.coordsize = (obj.width * rate) + ',' + (obj.height * rate);
			hei = obj.height * rate
		}
		if(gImageGroupList_[idx].rect != null){
			var obj = gImageGroupList_[idx].rect;
			obj.obj.style.width = (obj.width * rate) + 'px';
			obj.obj.style.height = (obj.height * rate) + 'px';
		}
		if(gImageGroupList_[idx].img != null){
			var obj = gImageGroupList_[idx].img;
			obj.obj.style.left = (obj.left * rate) + 'px';
			obj.obj.style.top = (obj.top * rate) + 'px';
			obj.obj.style.width = (obj.width * rate) + 'px';
			obj.obj.style.height = (obj.height * rate) + 'px';
		}
		if(gImageGroupList_[idx].p != null){
			var obj = gImageGroupList_[idx].p;
			for(var j=0; j<obj.length; j++){
				var p = obj[j];
				if(p.left != ""){
					p.obj.style.left		= (p.left * rate) + 'px';
				}
				if(p.top != ""){
					p.obj.style.top			= (p.top * rate) + 'px';
				}
				if(p.fontsize != ""){
					p.obj.style.fontSize	= (p.fontsize * rate) + 'pt';
				}
			}
		}
		if(gImageGroupList_[idx].gaiji != null){
			var obj = gImageGroupList_[idx].gaiji;
			for(var j=0; j<obj.length; j++){
				var g = obj[j];
				g.obj.style.height = (g.height * rate) + 'px';
			}
		}
		if(gImageGroupList_[idx].tp != null){
			var obj = gImageGroupList_[idx].tp;
			for(var j=0; j<obj.length; j++){
				var tp = obj[j];
				if(tp.fontsize != ""){
					if(tp.fontsize*rate < 5.5){
						tp.obj.style.fontSize	= '5.5pt';
					}
					else{
						tp.obj.style.fontSize	= (tp.fontsize * rate) + 'pt';
					}
				}
			}
		}
		if(gImageGroupList_[idx].bl != null){
			var obj = gImageGroupList_[idx].bl;
			for(var j=0; j<obj.length; j++){
				var bl = obj[j];
				var fromx,tox;
				if(bl.fromx != ""){
					fromx = bl.fromx * rate;
					bl.obj.from	= fromx + "," + (bl.fromy * rate);
				}
				if(bl.tox != ""){
					tox = bl.tox * rate;
					if((0 >=tox-fromx) && (fromx-tox) < 1) {
						tox = tox-1;
					}
					if((0 <= tox-fromx) && (tox-fromx) < 1) {
						tox = tox+1;
					}
					bl.obj.to	= tox + "," + (bl.toy * rate);
				}
			}
		}
		if(gImageGroupList_[idx].ul != null){
			var obj = gImageGroupList_[idx].ul;
			for(var j=0; j<obj.length; j++){
				var ul = obj[j];
				if(ul.fromx != ""){
					ul.obj.from	= (ul.fromx * rate) + "," + (ul.fromy * rate);
				}
				if(ul.tox != ""){
					ul.obj.to	= (ul.tox * rate) + "," + (ul.toy * rate);
				}
			}
		}
		if(gImageGroupList_[idx].sh != null){
			var obj = gImageGroupList_[idx].sh;
			for(var j=0; j<obj.length; j++){
				var sh = obj[j];
				sh.obj.style.width = (sh.width * rate) + 'px';
				sh.obj.style.height = (sh.height * rate) + 'px';
				var strPathBuf="";
				for(var k=0; k<sh.path.length; k++){
					if((sh.path[k] == "0") || (sh.path[k] > 0)){
						strPathBuf += sh.path[k] * rate;
					}
					else {
						strPathBuf += sh.path[k];
					}
					strPathBuf += " ";
				}
				sh.obj.path = strPathBuf;
			}
		}
		if(gImageGroupList_[idx].st != null){
			var obj = gImageGroupList_[idx].st;
			for(var j=0; j<obj.length; j++){
				var st = obj[j];
				if(st.weight != ""){
					st.obj.weight	= st.weight + 'px';
				}
			}
		}
	return hei;
}
function _prRemoveUnit(src){
	var dst = src.substring(0,src.length-2);
	return dst;
}
function _prSetPrtFontSize(){
	for(var i=0; i<gImageGroupList_.length; i++){
		if(gImageGroupList_[i].p != null){
			var obj = gImageGroupList_[i].p;
			for(var j=0; j<obj.length; j++){
				var p = obj[j];
				if(p.dispsize != 0.0){
					p.fontsize	= p.prtsize;
				}
			}
		}
		if(gImageGroupList_[i].tp != null){
			var obj = gImageGroupList_[i].tp;
			for(var j=0; j<obj.length; j++){
				var tp = obj[j];
				if(tp.dispsize != 0.0){
					tp.fontsize	= tp.prtsize;
				}
			}
		}
	}
}
function _prSetDispFontSize(){
	for(var i=0; i<gImageGroupList_.length; i++){
		if(gImageGroupList_[i].p != null){
			var obj = gImageGroupList_[i].p;
			for(var j=0; j<obj.length; j++){
				var p = obj[j];
				if(p.dispsize != 0.0){
					p.obj.style.fontSize	= p.dispsize + 'pt';
				}
			}
		}
		if(gImageGroupList_[i].tp != null){
			var obj = gImageGroupList_[i].tp;
			for(var j=0; j<obj.length; j++){
				var tp = obj[j];
				if(tp.dispsize != 0.0){
					tp.obj.style.fontSize	= tp.dispsize + 'pt';
				}
			}
		}
	}
}
