window.onload=function () {
    let father=document.querySelectorAll("main .content-box .left ul li");
    let son=document.querySelectorAll("main .right");
    console.log(father, son);
    son[0].style.display="block";

    for(let i=0;i<father.length;i++){
        father[i].onmouseenter=function () {
            for(let j=0;j<father.length;j++){
                son[j].style.display="none";
                father[j].style.backgroundColor=null;
                father[j].style.color=null;
            }
            son[i].style.display="block";
            father[i].style.backgroundColor="rgb(7, 41, 83)";
            father[i].style.color="#fff";


        }
        father[i].onmouseleave=function () {
            father[i].style.backgroundColor=null;
            father[i].style.color=null;
        }
    }
}
