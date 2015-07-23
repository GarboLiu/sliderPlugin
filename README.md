# sliderPlugin
纯JS幻灯片无缝滚动，不依赖JQuery。有3种样式可选择，可以自己修改样式，变成所需的类型。
<img src="img/show.png" alt="">  
<img src="img/show2.png" alt=""> 
<img src="img/show3.png" alt=""> 
##快速上手
###HTML
###
    <div class="slider" id="slider">
        <div class="bd">
            <ul id="slider_pic">
                <li><a href=""><img src="img/4.jpg" alt=""></a></li>
                <li><a href=""><img src="img/1.jpg" alt=""></a></li>
                <li><a href=""><img src="img/2.jpg" alt=""></a></li>
                <li><a href=""><img src="img/3.jpg" alt=""></a></li>
            </ul>
            <div id="prev" class="prev"><div class="black_bg"></div><a class="prev_a_nomal dn"></a></div>
            <div id="next" class="next"><div class="black_bg"></div><a  class="next_a_nomal dn"></a></div>
        </div>
        <div class="hd" id="hd_div"></div>
    </div>
###CSS
###
    /*标签的高度和宽度可以自己调整，根据需求调整成所需的宽度*/
    .slider{width: 100%;height: 335px;min-width: 1080px;}
    .bd{width:1080px;left: 50%;margin-left: -540px;}
    .bd ul{margin-left: -1080px;}
    .bd img{width: 1080px;}
    /******************************/
###JS
###
    var sliderPlugin1 = new sliderPlugin({
        divElement: slider, //最外层div的id(必填)
        ulElement: slider_pic, //ul的id(必填)
        hdShow: true, //小圆点是否出现(默认值为true)
        hdElement: hd_div, //小圆点的外层标签的id
        li_onClassName: 'hdli_on', //小圆点选中样式(必填)
        li_normalClassName: 'hdli_nomal', //小圆点普通样式名称(必填)
        distanceMax: 1080, //中间那幅幻灯片的宽度(默认值1080)
        slowTime: 1500, //幻灯片停顿时间(默认值1500ms)
        fastTime: 30, //幻灯片移动时间(默认值35ms)
        arrowShow: true, //前后箭头是否出现(默认值true)
        arrowElement: [prev, next] //箭头id[前箭头，后箭头]
    });
###参数
<table>
<tr>
<td>divElement</td>
<td>最外层div的id(必填)</td>
</tr>
<tr>
<td>ulElement</td>
<td>ul的id(必填)</td>
</tr>
<tr>
<td>distanceMax</td>
<td>幻灯片每次移动的最大距离距离，跟css样式中的bd有关(默认值1080)</td>
</tr>
<tr>
<td>slowTime</td>
<td>幻灯片停顿时间(默认值1500ms)</td>
</tr>
<tr>
<td>fastTime</td>
<td>幻灯片移动时间(默认值35ms)</td>
</tr>
<tr>
<td>hdShow</td>
<td>小圆点是否出现(默认值为true)</td>
</tr>
<tr>
<td>hdElement</td>
<td>小圆点的外层标签的id，若hdShow為true,必填</td>
</tr>
<tr>
<td>li_onClassName</td>
<td>小圆点选中样式，若hdShow為true,必填</td>
</tr>
<tr>
<td>li_normalClassName</td>
<td>小圆点普通样式名称，若hdShow為true,必填</td>
</tr>
<td>arrowShow</td>
<td>前后箭头是否出现(默认值true)</td>
</tr>
<td>arrowElement</td>
<td>箭头id[前箭头，后箭头]，若arrowShow為true,必填</td>
</tr>
<td>arrowInside</td>
<td>箭头位置，位于图片内部为true(默认值),外部为false</td>
</tr>
</table>

