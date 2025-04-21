const cfg = {
    auth: "<your-Token>",
    clientID: "<your-Client-ID-Token>",
    broadcasterID: "<broadcaster-ID>",
    senderID: "<your-user-ID>"
}
let suffix = false;
function sendMessage() {
    let message = "!clic ";
    if(suffix) {
        message += "\u200B" + "\uFE0F";
        suffix = false;
    } else { suffix = true; }
    fetch(`https://api.twitch.tv/helix/chat/messages`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${cfg.auth}`,
            "Client-Id": `${cfg.clientID}`,
            "Content-Type": `application/json`
        },
        body: JSON.stringify({"broadcaster_id":`${cfg.broadcasterID}`,"sender_id":`${cfg.senderID}`,"message":`${message}`})
    })
    .then((res) => {
        if(res.ok) {
            setTimeout(() => {
                sendMessage();
            }, 1500);
        } else { throw new Error(`Error : ${res.status}`); }
    })
    .catch((e) => { console.error('Error :', e); });
}
sendMessage();
