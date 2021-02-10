var z,x,y;
var gImageGroupList_	= new Array;
var gIdx_		= 0;
var gHrList_		= new Array;
var gHrIdx_		= 0;
var gHrSpanList_	= new Array;
var gHrSpanIdx_		= 0;
var hrObject;
var hrSpanObject;
var imgDivObject;
var imgDivCount 	= 0;
var printPageCount;
var printCurrentPos;
function _prHrGroupStruct(hr_obj,span_obj,start_idx,end_idx,img_ctrl_obj) {
	this.obj		= hr_obj;
	this.span		= span_obj;
	this.start_idx		= start_idx;
	this.end_idx		= end_idx;
	this.img_ctrl		= img_ctrl_obj;
}
function _prImageGroupStruct(group_size,rect_size,img_size,p_tag,tp_obj,bl_obj,ul_obj) {
	this.group		= group_size;
	this.rect		= rect_size;
	this.img		= img_size;
	this.p			= p_tag;
	this.tp			= tp_obj;
	this.bl			= bl_obj;
	this.ul			= ul_obj;
}
function _prSizeStruct(newObj,newWidth,newHeight) {
	this.obj		= newObj;
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
function _prLineTagStruct(newObj,newFromx,newFromy, newTox, newToy) {
	this.obj			= newObj;
	this.fromx		= newFromx;
	this.fromy		= newFromy;
	this.tox		= newTox;
	this.toy		= newToy;
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
	var idName;
	var groupObject;
	var jj,jjj;
	var p_cnt,tp_cnt,bl_cnt,ul_cnt;
	var str_len;
	gHrIdx_ = 0;
	hrObject = null;
	hrSpanObject = null;

	for(jj=0;jj<document.all.length;) {
		hrObject = null;
		hrSpanObject = null;
		for(;jj<document.all.length;jj++) {
			if(document.all(jj).id != null) {
				str_len = document.all(jj).id.length;
				if((str_len >= 7) && (document.all(jj).id.substr(0,7) == "hrDivId")) {
					hrSpanObject = document.all(jj);
				}
				else if((str_len >= 4) && (document.all(jj).id.substr(0,4) == "hrId")) {
					hrObject = document.all(jj);
				}
			}
			if((hrObject != null) && (hrSpanObject != null)) {
				gHrList_[gHrIdx_++] = new _prHrGroupStruct (
									hrObject,
									hrSpanObject,
									-1,-1,null
									);
				break;
			}
		}
		imgDivObject = null;
		for(;jj<document.all.length;jj++) {
			if(document.all(jj).id != null) {
				str_len = document.all(jj).id.length;
				if((str_len >= 7) && (document.all(jj).id.substr(0,7) == "hrDivId")) {
					gHrList_[gHrIdx_-1].img_ctrl = imgDivObject;
					break;
				}
				else if((str_len >= 9) && (document.all(jj).id.substr(0,9) == "prePageId")) {
					if(imgDivObject == null) {
						imgDivObject = new Array;
						imgDivCount = 0;
					}
					imgDivObject[imgDivCount] = new Array;
					imgDivObject[imgDivCount].pre = document.all(jj);
				}
				else if((str_len >= 10) && (document.all(jj).id.substr(0,10) == "postPageId")) {
					imgDivObject[imgDivCount].post = document.all(jj);
					imgDivCount++;
				}
			}
		}
	}
	if(imgDivObject != null) {
		gHrList_[gHrIdx_-1].img_ctrl = imgDivObject;
	}

	jj = 0;
	gHrIdx_ = -1;
	while(jj < document.all.length) {
		groupObject = null;
		for(;jj<document.all.length;) {
			idName = "";
			if((document.all(jj).name != null) &&
			   (document.all(jj).name.length >= 8)) {
				idName = document.all(jj).name.substr(0,8);
			}
			if(idName == "PrtGrpId") {
				groupObject = document.all(jj);
				jj++;
				break;
			}
			if(document.all(jj).id != null) {
				str_len = document.all(jj).id.length;
					if((str_len >= 7) && (document.all(jj).id.substr(0,7) == "hrDivId")) {
						gHrIdx_++;
						gHrList_[gHrIdx_].start_idx = gIdx_;
					}
			}
			jj++;
		}
		if(groupObject == null)  break;

		var groupWidth	= _prRemoveUnit(groupObject.style.width);
		var groupHeight	= _prRemoveUnit(groupObject.style.height);
		var rectObject	= null;
		for(;jj<document.all.length;) {
			idName = "";
			if((document.all(jj).name != null) &&
			   (document.all(jj).name.length >= 9)) {
				idName = document.all(jj).name.substr(0,9);
			}
			if(idName == "PrtRectId") {
				rectObject = document.all(jj);
				jj++;
				break;
			}
			jj++;
		}
		var rectWidth	= null;
		var rectHeight	= null;
		if(rectObject != null) {
			rectWidth	= _prRemoveUnit(rectObject.style.width);
			rectHeight	= _prRemoveUnit(rectObject.style.height);
		}
		var imgObject = null;
		for(;jj<document.all.length;) {
			idName = "";
			if((document.all(jj).name != null) &&
			   (document.all(jj).name.length >= 8)) {
				idName = document.all(jj).name.substr(0,8);
			}
			if(idName == "PrtImgId") {
				imgObject = document.all(jj);
				jj++;
				break;
			}
			jj++;
		}
		var imgWidth	= null;
		var imgHeight	= null;
		if(imgObject != null){
			imgWidth	= _prRemoveUnit(imgObject.style.width);
			imgHeight	= _prRemoveUnit(imgObject.style.height);
		}
		var pObject = null;
		var pTag = null;
		p_cnt = 0;
		for(jjj=jj;jjj<document.all.length;jjj++) {
			idName = "";
			if((document.all(jjj).name != null) &&
			   (document.all(jjj).name.length >= 6)) {
				idName = document.all(jjj).name.substr(0,6);
			}
			if(idName == "PrtPId") {
				pTag = document.all(jjj);
				if(pObject == null){
					pObject		= new Array();
				}
				if(pTag.prt_font_size == null){
					pObject[p_cnt++] = new _prPTagStruct(
										pTag,
										_prRemoveUnit(pTag.style.left),
										_prRemoveUnit(pTag.style.top),
										_prRemoveUnit(pTag.style.fontSize),
										_prRemoveUnit(pTag.style.fontSize),
										0.0
									);
				}
				else{
					pObject[p_cnt++] = new _prPTagStruct(
										pTag,
										_prRemoveUnit(pTag.style.left),
										_prRemoveUnit(pTag.style.top),
										_prRemoveUnit(pTag.style.fontSize),
										_prRemoveUnit(pTag.disp_font_size),
										_prRemoveUnit(pTag.prt_font_size)
									);
				}
			}
			else {
				idName = "";
				if((document.all(jjj).name != null) &&
				   (document.all(jjj).name.length >= 8)) {
					idName = document.all(jjj).name.substr(0,8);
				}
				if(idName == "PrtGrpId") {
					break;
				}
			}
		}
		var tpObject = null;
		var tpTag = null;
		tp_cnt = 0;
		for(jjj=jj;jjj<document.all.length;jjj++) {
			idName = "";
			if((document.all(jjj).name != null) &&
			   (document.all(jjj).name.length >= 7)) {
				idName = document.all(jjj).name.substr(0,7);
			}
			if(idName == "PrtTpId") {
				tpTag = document.all(jjj);
				if(tpObject == null){
					tpObject		= new Array();
				}
				tpObject[tp_cnt++] = new _prTPTagStruct(
									tpTag,
									_prRemoveUnit(tpTag.style.fontSize),
									_prRemoveUnit(tpTag.disp_font_size),
									_prRemoveUnit(tpTag.prt_font_size)
								);
			}
			else {
				idName = "";
				if((document.all(jjj).name != null) &&
				   (document.all(jjj).name.length >= 8)) {
					idName = document.all(jjj).name.substr(0,8);
				}
				if(idName == "PrtGrpId") {
					break;
				}
			}
		}
		var blObject	= null;
		var baseline = null;
		bl_cnt = 0;
		for(jjj=jj;jjj<document.all.length;jjj++) {
			idName = "";
			if((document.all(jjj).name != null) &&
			   (document.all(jjj).name.length >= 6)) {
				idName = document.all(jjj).name.substr(0,6);
			}
			if(idName == "prt_bl") {
				baseline = document.all(jjj);
				if(blObject == null){
					blObject		= new Array();
				}
				blObject[bl_cnt++] = new _prLineTagStruct(
									baseline,
									(baseline.from+'').substring(0,(baseline.from+'').indexOf(",")),
									(baseline.from+'').substring((baseline.from+'').indexOf(",")+1,(baseline.from+'').length),
									(baseline.to+'').substring(0,(baseline.to+'').indexOf(",")),
									(baseline.to+'').substring((baseline.to+'').indexOf(",")+1, (baseline.to+'').length)
								);
			}
			else {
				idName = "";
				if((document.all(jjj).name != null) &&
				   (document.all(jjj).name.length >= 8)) {
					idName = document.all(jjj).name.substr(0,8);
				}
				if(idName == "PrtGrpId") {
					break;
				}
			}
		}
		var ulObject	= null;
		var underline = null;
		ul_cnt = 0;
		for(jjj=jj;jjj<document.all.length;jjj++) {
			idName = "";
			if((document.all(jjj).name != null) &&
			   (document.all(jjj).name.length >= 6)) {
				idName = document.all(jjj).name.substr(0,6);
			}
			if(idName == "prt_ul") {
				underline = document.all(jjj);
				if(ulObject == null){
					ulObject		= new Array();
				}
				ulObject[ul_cnt++] = new _prLineTagStruct(
									underline,
									(underline.from+'').substring(0,(underline.from+'').indexOf(",",0)),
									(underline.from+'').substring((underline.from+'').indexOf(",")+1,(underline.from+'').length),
									(underline.to+'').substring(0,(underline.to+'').indexOf(",")),
									(underline.to+'').substring((underline.to+'').indexOf(",")+1, (underline.to+'').length)
								);
			}
			else {
				idName = "";
				if((document.all(jjj).name != null) &&
				   (document.all(jjj).name.length >= 8)) {
					idName = document.all(jjj).name.substr(0,8);
				}
				if(idName == "PrtGrpId") {
					break;
				}
			}
		}
		gImageGroupList_[gIdx_] = new _prImageGroupStruct (
			new _prSizeStruct(groupObject,groupWidth,groupHeight),
			new _prSizeStruct(rectObject,rectWidth,rectHeight),
			new _prSizeStruct(imgObject,imgWidth,imgHeight),
			pObject,
			tpObject,
			blObject,
			ulObject
		);
		gHrList_[gHrIdx_].end_idx = gIdx_;
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
var   totalImg = 1;
var   dispNum=1;
function ChangeImageDisplay(disp_flag){
	var strDisp,strPrt;

	if(disp_flag == true) {
		strDisp = "none";
		strPrt = "block";
	}
	else {
		strDisp = "block";
		strPrt = "none";
	}
	for(idx=0;idx<document.all.length;idx++) {
		idName = "";
		if((document.all(idx).id != null) &&
		   (document.all(idx).id.length >= 9)) {
			idName = document.all(idx).id.substr(0,9);
			if(idName == "imgDispId") {
				dispElement = document.all(idx);
				if(dispElement != null) {
					dispElement.style.display = strDisp;
				}
			}
		}
	}
	for(idx=0;idx<document.all.length;idx++) {
		idName = "";
		if((document.all(idx).id != null) &&
		   (document.all(idx).id.length >= 8)) {
			idName = document.all(idx).id.substr(0,8);
			if(idName == "imgPrtId") {
				prtElement = document.all(idx);
				if(prtElement != null) {
					prtElement.style.display = strPrt;
				}
			}
		}
	}
	var imgIdElement,idNum;
	for(idx=0;idx<document.all.length;idx++) {
		idName = "";
		if((document.all(idx).id != null) &&
		   (document.all(idx).id.length >= 6)) {
			idName = document.all(idx).id.substr(0,5);
			idNum = document.all(idx).id.substr(5,document.all(idx).id.length-5);
			if((idName == "imgId") && (idNum != 1)) {
				imgIdElement = document.all(idx);
				if(imgIdElement != null) {
					imgIdElement.style.display = strPrt;
				}
			}
		}
	}
}
function MultiPageProcess(hr_idx,start_pos,end_pos){
	var imgCtrlObj;
	var img_idx;
	var imgObject;
	var img_pos;

	if(end_pos-printCurrentPos > pageHeight) {
		if(start_pos-printCurrentPos > pageHeight*3/4) {
			hrDivObj = gHrList_[hr_idx-1].span;
			hrDivObj.style.display = "block";
			printPageCount++;
			printCurrentPos = start_pos;
		}
		else {
			imgCtrlObj = gHrList_[hr_idx-1].img_ctrl;
			if(imgCtrlObj != null) {
				img_idx = gHrList_[hr_idx-1].start_idx;
				if(img_idx >= 0) {
					imgObject = gImageGroupList_[img_idx].group;
					img_pos = imgObject.obj.offsetTop + imgObject.obj.offsetHeight;
					if(img_pos-printCurrentPos > pageHeight) {
						if(imgObject.width >= 950) {
							imgCtrlObj[imgCtrlObj.length-1].pre.style.display = "block";
							printPageCount++;
							printCurrentPos = imgObject.obj.offsetTop;
						}
						else {
							hrDivObj = gHrList_[hr_idx-1].span;
							hrDivObj.style.display = "block";
							printPageCount++;
							printCurrentPos = start_pos;
						}
					}
				}
				for(var kk=1;kk<imgCtrlObj.length;kk++) {
					imgObject = gImageGroupList_[img_idx+kk].group;
					img_pos = imgObject.obj.offsetTop + imgObject.obj.offsetHeight;
					if(img_pos - printCurrentPos > pageHeight) {
						if(imgObject.obj.offsetTop - printCurrentPos > pageHeight) {
							imgCtrlObj[kk-1].post.style.display = "block";
							var postObj = gImageGroupList_[img_idx+kk-1].group;
							printCurrentPos = postObj.obj.offsetTop + postObj.obj.offsetHeight;
						}
						else {
							imgCtrlObj[kk].pre.style.display = "block";
							printCurrentPos = imgObject.obj.offsetTop;
						}
						printPageCount++;
					}
				}
				if(end_pos-printCurrentPos > pageHeight) {
					if(imgCtrlObj.length > 0) {
						imgObject = gImageGroupList_[img_idx+imgCtrlObj.length-1].group;
						if(imgObject.width >= 950) {
							img_pos = imgObject.obj.offsetTop + imgObject.obj.offsetHeight;
							imgCtrlObj[imgCtrlObj.length-1].post.style.display = "block";
							printPageCount++;
							printCurrentPos = img_pos;
						}
						else {
							printPageCount++;
							printCurrentPos += pageHeight;
						}
					}
				}
			}
		}
	}
	while(end_pos-printCurrentPos > pageHeight) {
		printPageCount++;
		printCurrentPos += pageHeight;
	}
}
var  pobj;
function Apf()
{
	if(load_flag == false) {
		return;
	}
	var  ppp;
	var  strClick;
	var  menuObj = parent.window.MENU;
	if(menuObj == null) {
		menuObj = parent.window.SM_HISTORY;
	}
	if(menuObj != null) {
		for(ppp=0;ppp<menuObj.document.all.length;ppp++) {
			pobj = menuObj.document.all(ppp);
			if(pobj.onclick != null) {
				var str = pobj.src.split("print.png");
				if(str.length > 1) {
					pobj.style.cursor = 'wait';
					break;
				}
			}
		}
	}

	setTimeout('StandardPrint()',100);

	setTimeout("ChangeHeadCursor('hand')",100);
}
function ChangeCursor(type)
{
	document.body.style.cursor = type;
}
function ChangeHeadCursor(type)
{
	pobj.style.cursor = type;
}
function StandardPrint()
{
	_prInitImageInfo(100);
	if(gIdx_ > 0) {
		_prSetPrtFontSize();
		var  img_hei = _prResizeImage(67/100);
		var  idx;
		var dispId,dispElement;
		var prtId,prtElement;
		var orgWid,orgHei;

		orgWid = parent.document.body.offsetWidth + 8;
		orgHei = parent.document.body.offsetHeight + 58;

		ChangeImageDisplay(true);

		var  hrObj,hrDivObj,nextHrObj;
		var  pos_dis;
		var   obj_len;

		printPageCount = 1;
		printCurrentPos = 0;

		parent.resizeBy(pageWidth-orgWid,0);

		hrObj = gHrList_[0].obj;
		for(idx=1;idx<gHrList_.length;idx++) {
			nextHrObj = gHrList_[idx].obj;
			obj_len = nextHrObj.offsetTop - hrObj.offsetTop;
			if(obj_len > pageHeight*1/2) {
				MultiPageProcess(idx,hrObj.offsetTop,nextHrObj.offsetTop);
			}
			else {
				pos_dis = nextHrObj.offsetTop - printCurrentPos;
				if(pos_dis > pageHeight) {
					hrDivObj = gHrList_[idx-1].span;
					hrDivObj.style.display = "block";
					printPageCount++;
					printCurrentPos = hrObj.offsetTop;
					pos_dis = nextHrObj.offsetTop - printCurrentPos;
					while(pos_dis > pageHeight) {
						printPageCount++;
						printCurrentPos += pageHeight;
						pos_dis = nextHrObj.offsetTop - printCurrentPos;
					}
				}
			}
			hrObj = nextHrObj;
		}
		var totalHei = document.body.scrollHeight;
		if(totalHei - hrObj.offsetTop > pageHeight*1/2) {
			MultiPageProcess(idx,hrObj.offsetTop,totalHei);
		}
		else {
			pos_dis = totalHei - printCurrentPos;
			if(pos_dis > pageHeight) {
				hrDivObj = gHrList_[idx-1].span;
				hrDivObj.style.display = "block";
				printPageCount++;
			}
		}
		if(printPageCount > 1) {
			var strConf = "印刷ページ数は " + printPageCount + " ページです。 印刷しますか？";
			var res = confirm(strConf);
			if(res == true) {
				window.focus();
				window.print();
			}
		}
		else {
			window.focus();
			window.print();
		}

		ChangeImageDisplay(false);

		parent.resizeBy(orgWid-pageWidth,0);
		_prResizeImage(100/100);
		_prSetDispFontSize();
		window.scrollTo(0,0);
	}
	else {
		window.focus();
		window.print();
	}
}
