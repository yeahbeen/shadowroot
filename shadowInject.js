//把inject script 插到页面
const injectedScript = document.createElement('script');
injectedScript.src = chrome.extension.getURL('injected.js');
(document.head || document.documentElement).appendChild(injectedScript);
//接收popup的消息，并发送到inject script
console.log("in content script")
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log("in message")
    if(request.cmd == "test"){ 
        // alert(request.value)
        sendResponse("i got your message")
        window.postMessage(request,"*")
    }
})
chrome.storage.local.set({'state': 'start'})
