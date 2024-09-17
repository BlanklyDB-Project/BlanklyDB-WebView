var APIUrl = "http://127.0.0.1:8081"


var Message_Service_Url = APIUrl + "/v1/feature/get/message";


var Message_Service_Req = new XMLHttpRequest();
Message_Service_Req.open('GET',Message_Service_Url);
Message_Service_Req.send();
Message_Service_Req.onload = function () {
    let Message_Service_Ele= document.getElementById("message-box");
    const Message_Service_Obj = JSON.parse(Message_Service_Req.response);
    Message_Service_Ele.innerHTML = Message_Service_Obj.data.message;
}

