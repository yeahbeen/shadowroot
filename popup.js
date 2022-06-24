(function(){
    //获取当前状态
    chrome.storage.local.get('state',(data) => {
        if(!data.state||data.state == "start"){
            startbtn.value = "stop"
        }else if(data.state == "stop"){
            startbtn.value = "start"
        }
    })
    //发送消息到conten script
    function sendToInject(msg,callback){
        chrome.tabs.query({active: true, currentWindow: true},function(tabs){
            chrome.tabs.sendMessage(tabs[0].id,msg,function(response){
                if(callback) {callback(response)}
            })
        })
    }

    var startbtn = document.getElementById("start");
    startbtn.addEventListener("click", function(){
        chrome.storage.local.get('state',(data) => {
            console.log("get data")
            console.log(data.state)
            if(!data.state||data.state == "start"){
                console.log("stop")
                sendToInject({cmd: "test",value: "stop"},function(response){
                    console.log("response from inject:" + response)
                })
                startbtn.value = "start"
                chrome.storage.local.set({'state': 'stop'})
            }else if(data.state == "stop"){
                console.log("start")
                sendToInject({cmd: "test",value: "start"},function(response){
                    console.log("response from inject:" + response)
                })
                startbtn.value = "stop"
                chrome.storage.local.set({'state': 'start'})
            }
        })        
    })
})();