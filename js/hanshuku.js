





//实参
// Olunbo(imgs,dots,banner,5);
// imgs:要轮播的图片集合
// dots:轮播点的集合
// banner:放banner图的大盒子元素。
// activeClass:轮播点的选中效果的类名
// bannerNum:banner图的数量
// second:时间间隔函数的时间

//透明度轮播图
function Olunbo(imgs,dots,banner,leftbtn,rightbtn,activeClass="active",second="2000") {
    //透明度轮播图
    //1.移入轮播点显示对应的图片
    //2 自动轮播
    let num=0;
    let flag=true;
    imgs[0].style.opacity=1;
    dots[0].classList.add(activeClass);
    //遍历得到每一个轮播点
    for(let i=0;i<imgs.length;i++){
        //点击每一个轮播点是发生的函数
        dots[i].onclick=function () {
            //遍历的
            for(let j=0;j<imgs.length;j++){
                //清除点击以外的所有类名
                dots[j].classList.remove(activeClass);
                //清除轮播点相对应图片所添加的透明度
                imgs[j].style.opacity=0;
            }
            //给点击的轮播点添加类名
            dots[i].classList.add(activeClass);
            //给轮播点相对应的图片添加透明度
            imgs[i].style.opacity=1;
            num=i;
        }
    }

    //自动轮播
    let t=setInterval(move,second);
    function move() {
        num++;
        if(num==imgs.length){
            num=0;
        }
        for(let j=0;j<imgs.length;j++){
            dots[j].classList.remove(activeClass);
            imgs[j].style.opacity=0;
        }
        // imgs[num].style.opacity=1;
        dots[num].classList.add(activeClass);
        animate(imgs[num],{opacity:1},function () {
            flag=true;
        });
        //     animate(dots[num],{classListAdd:(activeClass)});
        //
    }
    function moveL() {
        num--;
        if(num<0){
            num=imgs.length-1;
        }
        for(let j=0;j<imgs.length;j++){
            dots[j].classList.remove(activeClass);
            imgs[j].style.opacity=0;
        }
        // imgs[num].style.opacity=1;
        dots[num].classList.add(activeClass);
        animate(imgs[num],{opacity:1},function () {
            flag=true;
        });
        // animate(dots[num],{classListAdd:(activeClass)});
    }
    leftbtn.onclick=function(){
        if(!flag){
            return;
        }
        flag=false;
        moveL();
    }
    rightbtn.onclick=function(){
        if(!flag){
            return;
        }
        flag=false;
        move();
    }
    //鼠标移入停止
    banner.onmouseover=function () {
        clearInterval(t);
    }
    //鼠标移出，继续轮播
    banner.onmouseout=function () {
        t=setInterval(move,second);
    }
    window.onfocus=function(){
        clearInterval(t);
    }
    window.onblur=function () {
        // t=setInterval(move,second);
    }
}
//双下标轮播图
// let imgs=document.querySelectorAll("img");
// let dots=document.querySelectorAll("li");
// let banner=document.querySelectorAll(".banner")[0];
// let leftBtn=document.querySelectorAll(".leftbtn")[0];
// let rightBtn=document.querySelectorAll(".rightbtn")[0];
// let widths=parseInt(getComputedStyle(imgs[0],null).width);
// console.log(widths);
// console.log(imgs,dots,banner,leftBtn,rightBtn);

//imgs: 需要轮播的图片集合
//dots：轮播点的集合
//banner：轮播图的盒子，元素
//leftBtn: 左箭头，元素
//rightBtn: 右箭头，元素
//widths:轮播图的宽度  parseInt 数值
//activeClass: 轮播点选中的类名
//second： 轮播时间
function doublelunbo(imgs, dots, banner, leftBtn, rightBtn, widths, activeClass, second) {
    //初始值
    imgs[0].style.left = "0";
    dots[0].classList.add(activeClass);
    let now = 0;
    let next = 0;
    let flag = false;
    //now = 0    next =0

    //               ++
    // left 0          left1200
    //left-1200        left:0
    let t = setInterval(move, second);

    function move() {
        next++;
        if (next == imgs.length) {
            next = 0;
        }
        //确保下一张图的位置永远在最右侧
        imgs[next].style.left = widths + "px";
        animate(imgs[now], {left: -widths});
        animate(imgs[next], {left: 0}, function () {
            flag = true;
        });
        dots[now].classList.remove(activeClass);
        dots[next].classList.add(activeClass);
        now = next;
    }

    // clearInterval(t);

    function moveL() {
        next--;
        if (next < 0) {
            next = imgs.length - 1;
        }
        imgs[next].style.left = -widths + "px";
        animate(imgs[now], {left: widths});
        animate(imgs[next], {left: 0}, function () {
            flag = true;
        });
        dots[now].classList.remove(activeClass);
        dots[next].classList.add(activeClass);
        now = next;
    }

    leftBtn.onclick = function () {
        if (next == 0) {
            return;
        }
        if (!flag) {
            return;
        }
        flag = false;
        moveL();
        clearInterval(t);
    }

    rightBtn.onclick = function () {
        if (next == imgs.length - 1) {
            return;
        }
        if (!flag) {
            return;
        }
        flag = false;
        move();
        clearInterval(t);
    }

    //开关
    //flag=false   ！flag=true
    //防止重复点击时出现的快速轮播的现象
    //默认开关是打开的，可以点击左右箭头

    // leftBtn.onclick=function(){
    //判断开关是否开启
    //开关开启时，！flag=false
    //不执行return， 执行flag=false，move(); move执行完执行flag=true
    //开关关闭时，不要点击
    //！flag=true，执行return
    //     if(next==0){
    //         return;
    //     }
    //     if(!flag){
    //         return;
    //     }
    //
    //     flag=false;
    //     moveL();
    // }
    // rightBtn.onclick=function(){
    //     if(next==imgs.length-1){
    //         return;
    //     }
    //     if(!flag){
    //         return;
    //     }
    //     flag=false;
    //     move();
    // }
    banner.onmouseenter = function () {
        clearInterval(t);
    }
    banner.onmouseleave = function () {
        t=setInterval(move,second);
    }

    //鼠标点击，变颜色
    for (let i = 0; i < imgs.length; i++) {
        dots[i].onclick = function () {
            for (let j = 0; j < imgs.length; j++) {
                dots[j].classList.remove(activeClass);
                imgs[j].style.left = widths + "px";
            }
            dots[i].classList.add(activeClass);
            imgs[i].style.left = 0;
            now = i;
            next = i;
            clearInterval(t);
        }
    }
    //窗口失去焦点时，停止时间函数
    window.onblur = function () {
        clearInterval(t);
    }
    //窗口获得焦点时，继续时间函数
    window.onfocus = function () {
        t = setInterval(move, second);
    }


}

    //box:底部的盒子
    //cover:遮罩盒子
function Zhezhao(box,cover) {

    //遮罩
    //获取要操作的元素，注意集合问题，可以用[]下标来获取元素
    // let box=document.querySelectorAll(".box")[0];
    // let cover=document.querySelectorAll(".cover")[0];
    // console.log(cover);
    //鼠标移入，遮罩显示
    box.onmouseenter=function () {
        cover.style.display="block";
    }
    //鼠标移出，遮罩隐藏
    box.onmouseleave=function () {
        cover.style.display="none";
    }
}
function xuanxiangka(lis,son) {
    //获取元素
    // let lis=document.querySelectorAll("li");
    // let son=document.querySelectorAll(".son");
    // console.log(lis);
    // console.log(son);
    //遍历每一个li
    for(let i=0;i<lis.length;i++){
        //鼠标移入的操作
        lis[i].onmouseover=function () {
            //让其他子元素消失
            for(let j=0;j<son.length;j++){
                son[j].style.display="none";
            }
            //让当前子元素出现
            son[i].style.display="block";

            //让其他每一个对应的子元素隐藏
            lis[i].onmouseout=function () {
                for(let k=0;k<son.length;k++){
                    son[i].style.display="none";
                }
            }
        }
    }
}
function hezichange(box,sd=200) {
    //盒子自动变化
    // let box=document.querySelectorAll(".box")[0];
    //parseInt:将字符串转化为数值。
    // console.log(num);
    let t=setInterval(big,100);
    let speed=sd;
    function big() {
        let num=parseInt(getComputedStyle(box,null).width);
        let newwidth=num+speed;
        console.log(newwidth);
        if(newwidth>800){
            speed*=-1;
        }else if(newwidth<200){
            speed*=-1;
        }
        box.style.width=newwidth+"px";
    }
}

function shangou(button,miList,w) {
    // let button=document.querySelectorAll(".button");
    // let miList=document.querySelector(".miList");
    // let w=parseInt(getComputedStyle(miList,null).width)/3;
    // console.log(button,miList,w);
    let time=0;
    button[1].onclick=function () {
        time++;
        if(time==3){
            time=2;
        }
        miList.style.transform=`translate(${(-w*time)}px)`;
    }
    button[0].onclick=function () {
        time--;
        if(time==-1){
            time=0;
        }
        miList.style.transform=`translate(${(-w*time)}px)`;
    }
}
function backs(back) {
        back.onclick = function () {
        animate(document.body, {scrollTop: 0}, 600);
        animate(document.documentElement, {scrollTop: 0}, 600);
        // document.body.scrollTop=0;
        // document.documentElement.scrollTop=0;
    }
}