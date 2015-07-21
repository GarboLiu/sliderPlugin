/**
 * sliderPlugin 1.0.1
 * @Author   Garbo
 * @DateTime 2015-07-07T16:10:43+0800
 */
function sliderPlugin(dataJson){
    var json = {
        distanceMax : 1080,//中间那幅幻灯片的宽度
        slowTime : 1500,//幻灯片停顿时间
        fastTime : 35,//幻灯片移动时间
        arrowShow : true, //前后箭头是否出现
        hdShow : true
    }
    for(var key in dataJson){
        json[key] = dataJson[key];
    }
    this.sliderMove1 = null;
    this.slowTime = json.slowTime;//动画停顿时间
    this.fastTime = json.fastTime;//动画快速连续执行时间
    this.distance = 0;//幻灯片移动过的距离
    this.distanceMax = json.distanceMax;//幻灯片的宽度
    this.speed = this.distanceMax/10;//幻灯片移动的速度
    this.lis_index = 0;//幻灯片的初始位置
    this.divElement = json.divElement;//外层div的id
    this.ulElement = json.ulElement;//ul的id
    this.num = this.ulElement.children.length;//幻灯片个数
    this.hdShow = json.hdShow;
    this.hdElement = json.hdElement;
    this.li_onClassName = json.li_onClassName;//
    this.li_normalClassName = json.li_normalClassName;
    this.hd_ul_idName = this.divElement.id + 'hd_ul';
    this.li_distanceMax = 0;
    this.li_distance = 0;
    this.flag = 0;
    this.arrowShow = json.arrowShow;
    this.arrow_prev = json.arrowElement[0];
    this.arrow_next = json.arrowElement[1];
    this.init();
}
sliderPlugin.prototype.init = function(){
    var _self = this;
    _self.ulElement.innerHTML = _self.ulElement.innerHTML + _self.ulElement.innerHTML;
    /*添加小圆点*/
    if(_self.hdShow){
        var content = '<ul id="'+_self.hd_ul_idName+'">' ;
        for(var i=1,len = _self.num; i<=len; i++){
            content += '<li class="'+_self.li_normalClassName+'">'+i+'</li>'
        } 
        content += '</ul>'
        _self.hdElement.innerHTML = content;
        _self.hd_ul = $_id(_self.hd_ul_idName);
        _self.hd_ul.firstChild.className = _self.li_onClassName;
        _self.hd_ulOnclick();
    }

    /*添加箭头*/
    if(_self.arrowShow){
        // var prev = document.createElement('div');  
        // _self.divElement.appendChild(prev);
        // _self.arrow_prev = prev;
        // prev.className = 'prev';
        // prev.innerHTML = '<div class="black_bg"></div><a class="prev_a_nomal dn"></a>'
            _self.arrow_prev.onclick = function(){
            setTimeout(function(){_self.prevMoving()}, _self.fastTime);

        }

        // var next = document.createElement('div'); 
        // _self.divElement.appendChild(next);
        // _self.arrow_next = next;
        // next.className = 'next'
        // next.innerHTML = '<div class="black_bg"></div><a  class="next_a_nomal dn"></a>'
        _self.arrow_next.onclick = function(){
            setTimeout(function(){_self.nextMoving()}, _self.fastTime);
        }

    }
    _self.sliderMouseAction();
    _self.sliderMove1 = setTimeout(function(){_self.sliderMove()}, _self.slowTime);
}
/*幻灯片移动*/
sliderPlugin.prototype.sliderMove = function(){
    var _self = this;
    var ml = getDefaultStyle(_self.ulElement, "marginLeft"); 
    var speed = _self.speed;
    var distance = _self.distance;
    var distanceMax = _self.distanceMax;
    var slowTime = _self.slowTime;
    var mlint = getMarginLeftInt(ml);
    var distanceAll = _self.num*distanceMax;
    var slider_pic = _self.ulElement;
    if(mlint < distanceAll){
        mlint += speed;
        _self.distance += speed;
        slider_pic.style.marginLeft = "-" +mlint+"px";
        // //console.log(slider_pic.style.marginLeft);
        if(_self.distance < distanceMax){ 
            // //console.log('_self.distance'+_self.distance) 
            _self.sliderMove1 = setTimeout(function(){_self.sliderMove()}, _self.fastTime);
        }
        else{//移动了980px,要休息一下
            _self.distance = 0;
            // //console.log(slider_pic.style.marginLeft);
            lis_index = mlint/distanceMax-1;
            //console.log('lis_index'+lis_index);
            //切换小圆点
            var lis = _self.hd_ul.getElementsByTagName("li");

            if(lis_index != 0){
                lis[lis_index-1].className = _self.li_normalClassName;
                lis[lis_index].className = _self.li_onClassName;
            }else{
                lis[lis.length-1].className = _self.li_normalClassName;
                lis[0].className = _self.li_onClassName;
            }
            _self.sliderMove1 = setTimeout(function(){_self.sliderMove()}, _self.slowTime);
        }
    }else{
        // //console.log("结束");
        slider_pic.style.marginLeft = "0";
        _self.sliderMove1 = setTimeout(function(){_self.sliderMove()}, _self.fastTime); 
    }  
}
/*小圆点li点击事件*/
sliderPlugin.prototype.hd_ulOnclick = function(){
    var _self = this;
    var slider_pic = _self.ulElement;
    var lis = _self.hd_ul.getElementsByTagName("li");
    for(var i in lis){
        lis[i].onclick = function(){
            // clearTimeout(sliderMove1);
            getClass("li", _self.li_onClassName,_self.hd_ul_idName)[0].className = _self.li_normalClassName;
            this.className = _self.li_onClassName;
            // //console.log(this.innerHTML+getClass("li", "hdli_on").length);
            var marginLeftFirst = getMarginLeftInt(getDefaultStyle(slider_pic, "marginLeft"));
            var marginLeftFinal = _self.distanceMax * parseFloat(this.innerHTML);
            _self.li_distanceMax = marginLeftFinal - marginLeftFirst;
            if(_self.li_distanceMax > 0){
                _self.flag = 1;
            }else{
                _self.li_distanceMax *= -1;
                _self.flag = -1;
            }
            if(_self.li_distanceMax != 0){
            setTimeout(function(){_self.hd_ulOnclickMoving()}, _self.fastTime);
            }
        }
    }
}
/*幻灯片小蓝点动画事件*/
sliderPlugin.prototype.hd_ulOnclickMoving = function(){
    var _self = this;
    var slider_pic = _self.ulElement;
    // alert(_self)
    // alert(getDefaultStyle(slider_pic, "marginLeft"))
    var ml = getDefaultStyle(slider_pic, "marginLeft"); 
    var mlint = getMarginLeftInt(ml);
    if(_self.flag == 1){
        mlint += _self.li_distanceMax/10;
        
    }else{
        mlint -= _self.li_distanceMax/10;
    }
    _self.li_distance += _self.li_distanceMax/10;
    if(_self.li_distance > _self.li_distanceMax){
        _self.li_distance = 0;
        return;
    }
    slider_pic.style.marginLeft = "-"+ mlint +"px";  
    // //console.log(mlint);
    _self.sliderMove1 = setTimeout(function(){_self.hd_ulOnclickMoving()}, _self.fastTime); 
}
/*后退箭头*/
sliderPlugin.prototype.prevMoving = function(){
    var _self = this;
    var slider_pic = _self.ulElement;
    var speed = _self.speed;
    var distanceMax = _self.distanceMax;
    var ml = getDefaultStyle(slider_pic, "marginLeft"); 
    var mlint = getMarginLeftInt(ml);
    //console.log(mlint);
    
    _self.distance += speed;
    mlint -= speed;
    slider_pic.style.marginLeft = "-" +mlint+"px";     
    if(_self.distance < _self.distanceMax){  
        sliderMove1 = setTimeout(function(){_self.prevMoving()}, _self.fastTime);
    }
    else{//移动了980px,要休息一下
        if(mlint == 0){
        slider_pic.style.marginLeft = "-"+distanceMax*_self.num+"px";   
        } 
        _self.distance = 0;
        lis_index = (mlint+_self.distanceMax)/_self.distanceMax-1;
        //切换小圆点
        var lis = _self.hd_ul.getElementsByTagName("li");
        if(lis_index != 0){
            lis[lis_index-1].className = _self.li_onClassName;
            lis[lis_index].className = _self.li_normalClassName;
        }else{
            lis[lis.length-1].className = _self.li_onClassName;
            lis[0].className = _self.li_normalClassName;
        }
    }
}
//前进箭头
sliderPlugin.prototype.nextMoving = function(){
    var _self = this;
    var slider_pic = _self.ulElement;
    var speed = _self.speed;
    var distanceMax = _self.distanceMax;
    var ml = getDefaultStyle(slider_pic, "marginLeft"); 
    var mlint = getMarginLeftInt(ml);
    //console.log(mlint +'  '+ distanceMax*_self.num);
    
    _self.distance += speed;
    mlint += speed;
    slider_pic.style.marginLeft = "-" +mlint+"px";     
    if(_self.distance < distanceMax){  
        sliderMove1 = setTimeout(function(){_self.nextMoving()}, _self.fastTime);
    }
    else{//移动了980px,要休息一下
        if(mlint == distanceMax*(_self.num+1)){
        slider_pic.style.marginLeft = "-"+distanceMax+"px";   
        } 
        _self.distance = 0;
        lis_index = mlint/distanceMax-1;
        //切换小圆点
        var lis = _self.hd_ul.getElementsByTagName("li");
        if(lis_index != 4){
            lis[lis_index-1].className = _self.li_normalClassName;
            lis[lis_index].className = _self.li_onClassName;
        }else{
            lis[lis.length-1].className = _self.li_normalClassName;
            lis[0].className = _self.li_onClassName;
        }
    }
}
/*鼠标事件触发幻灯片的事件*/
sliderPlugin.prototype.sliderMouseAction = function(){
    var _self = this;
    var slider_pic = _self.ulElement;

    _self.divElement.onmouseover = function(){
        clearTimeout(_self.sliderMove1);
        // //console.log("鼠标进入");
        if(_self.arrowShow){
            _self.arrow_next.getElementsByTagName("a")[0].style.display = "inline";
             _self.arrow_prev.getElementsByTagName("a")[0].style.display = "inline";
        }
        var ml = getDefaultStyle(slider_pic, "marginLeft")
        var mlInt = getMarginLeftInt(getDefaultStyle(_self.ulElement, "marginLeft"));
        var distance = mlInt%_self.distanceMax;
        //console.log(ml+"   "+mlInt)
        if(distance == 0){
            return;
        }else{
            var index = getClass("li", _self.li_onClassName,_self.hd_ul_idName)[0].innerHTML;
            _self.distance = 0;
            slider_pic.style.marginLeft = "-"+_self.distanceMax*Math.round(mlInt/_self.distanceMax)+"px"; 
            if(Math.round(mlInt/_self.distanceMax) != index){
                var lis = _self.hd_ul.getElementsByTagName("li");
                if(index != 4){
                    lis[index-1].className = _self.li_normalClassName;
                    lis[index].className = _self.li_onClassName;
                }else{
                    lis[lis.length-1].className = _self.li_normalClassName;
                    lis[0].className = _self.li_onClassName;
                }
            }
        } 
    }
    _self.divElement.onmouseout = function(){
        clearTimeout(_self.sliderMove1);
        var ml = getDefaultStyle(slider_pic, "marginLeft")
        var mlInt = getMarginLeftInt(getDefaultStyle(_self.ulElement, "marginLeft"));
        var distance = mlInt%_self.distanceMax;
        if(distance == 0){
            _self.sliderMove1 = setTimeout(function(){_self.sliderMove()}, _self.slowTime);
        }else{
            var index = getClass("li", _self.li_onClassName,_self.hd_ul_idName)[0].innerHTML;
            _self.distance = 0;
            slider_pic.style.marginLeft = "-"+_self.distanceMax*parseFloat(index)+"px"; 
            //console.log(ml+"   "+mlInt+"  "+distance+"   "+slider_pic.style.marginLeft);
            //console.log(slider_pic)
        } 
        //console.log("鼠标移出");
        if(_self.arrowShow){
        _self.arrow_next.getElementsByTagName("a")[0].style.display = "none";
        _self.arrow_prev.getElementsByTagName("a")[0].style.display = "none";
        }
    }
}
function getMarginLeftInt(mlstr){
    var mlint = parseFloat(mlstr.replace(/[^0-9]+/ig, ""));
    return mlint;
}
function $_id(id){
    return document.getElementById(id);
}
/*js无法通过style直接获取js里的css值*/
function getDefaultStyle(obj,attribute){ // 返回最终样式函数，兼容IE和DOM，设置参数：元素对象、样式特性    
return obj.currentStyle?obj.currentStyle[attribute]:document.defaultView.getComputedStyle(obj,false)[attribute];    
}

function getClass(tagName,className,id) //获得某元素id,标签名为tagName,类名className的元素
{
    if(id == null || id == ''){
        var tags=document.getElementsByTagName(tagName);//获取标签
    }else{
         var tags=document.getElementById(id).getElementsByTagName(tagName);//获取标签
    }
    var tagArr=[];//用于返回类名为className的元素
    for(var i=0;i < tags.length; i++)
    {
        
        if(tags[i].className.indexOf(className) == 0)
        {
            tagArr[tagArr.length] = tags[i];//保存满足条件的元素
            // //console.log(tags[i].className +tags[i].className.indexOf(className))
        }
    }
    return tagArr;
}