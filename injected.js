//设置shadowroot
Element.prototype._attachShadow = Element.prototype.attachShadow;
Element.prototype.attachShadow = function(){
    console.log('attachShadow');
    return this._attachShadow({mode: "open"});
}

/*先不要了，用playwright实现

//百度视频，设置高清、点击下一集
localStorage.setItem("needinit",true)
var fn = function() {
    console.log("in interval----------");
    try{
        var player = document.querySelector("#video-root").shadowRoot.querySelector("#html5player")
    }
    catch{
        console.log("not ready,return")
        return;
    }
    if(!player){
        console.log("not ready,return")
        return;
    }
    //刚打开，初始化
    if(localStorage.getItem("needinit") === "true"){
        console.log("initing...");
        localStorage.setItem("needinit",false)
        //设置高清
        var quality = document.querySelector("#video-root").shadowRoot.querySelectorAll(".vjs-menu-item")
        if(quality.length != 0){ 
            console.log("设置高清");
            quality[0].click()
        } 
    }
    //结束跳到下一集
    if(player.getAttribute("class").includes("vjs-ended")){
        console.log("in end")
        var next = document.querySelector(".clearfix.video-item.currentplay").nextSibling
        var href = window.location.href
        var title = next.getAttribute("title")
        console.log(title);
        if(/^.*path=(.*)&t=(\d+)/.test(href)){
            var path = RegExp.$1;
            var index = RegExp.$2;
            console.log(path);
            console.log(index);
            var file = path.split("%2F").pop()
            console.log(file);
            var newhref = href.replace(file,window.encodeURI(title)).replace("t="+index,"t="+(Number(index)+1));
            console.log(newhref);
            window.location.href = newhref; 
        }else{
            console.log("something wrong")
        }
    }
}
fn(); //先执行一次
var c = setInterval(fn,10000);

//接收content script的消息，开始或停止
window.addEventListener("message",function(e){
    console.log(e.data);
    if(e.data.cmd == "test"){
        if(e.data.value == "stop") clearInterval(c);
        if(e.data.value == "start") c = setInterval(fn,10000);
    }
},false)

*/