# sliderPlugin
纯JS幻灯片无缝滚动，不依赖JQuery。
<img src="img/4.jpg" alt="">  
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
    .bd ul{/margin-left: -1080px;}
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
###參數

### 比如我们可以在多行文本框里输入一段代码,来一个Java版本的HelloWorld吧
    public class HelloWorld {

      /**
      * @param args
   */
   public static void main(String[] args) {
   System.out.println("HelloWorld!");

   }

    }  
### 小标题
  小标题类似html的\<h3\><br />
  小标题的格式如下 ### 小标题<br />
  注意#和标题字符中间要有空格

### 注意!!!下面所有语法的提示我都先用小标题提醒了!!! 

### 单行文本框
    这是一个单行的文本框,只要两个Tab再输入文字即可
        
### 多行文本框  
    这是一个有多行的文本框
    你可以写入代码等,每行文字只要输入两个Tab再输入文字即可
    这里你可以输入一段代码


### 链接
1.[点击这里你可以链接到www.google.com](http://www.google.com)<br />
2.[点击这里我你可以链接到我的博客](http://guoyunsky.iteye.com)<br />

###只是显示图片
![github](http://github.com/unicorn.png "github")

###想点击某个图片进入一个网页,比如我想点击github的icorn然后再进入www.github.com
[![image]](http://www.github.com/)
[image]: http://github.com/github.png "github"

### 文字被些字符包围
> 文字被些字符包围
>
> 只要再文字前面加上>空格即可
>
> 如果你要换行的话,新起一行,输入>空格即可,后面不接文字
> 但> 只能放在行首才有效

### 文字被些字符包围,多重包围
> 文字被些字符包围开始
>
> > 只要再文字前面加上>空格即可
>
>  > > 如果你要换行的话,新起一行,输入>空格即可,后面不接文字
>
> > > > 但> 只能放在行首才有效

### 特殊字符处理
有一些特殊字符如<,#等,只要在特殊字符前面加上转义字符\即可<br />
你想换行的话其实可以直接用html标签\<br /\>
