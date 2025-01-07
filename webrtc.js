import QRCode from "qrcode";

const servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
const peerConnection = new RTCPeerConnection(servers);
let dataChannel;

document.getElementById("generate-offer").addEventListener("click", async () => {
    dataChannel = peerConnection.createDataChannel("syncChannel");
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    QRCode.toCanvas(document.getElementById("qrcode"), JSON.stringify(offer), (err) => {
        if (err) console.error(err);
    });

    console.log("Offer generated:", offer);
});

document.getElementById("connect-peer").addEventListener("click", async () => {
    const fileInput = document.getElementById("peer-file");
    fileInput.click();

    fileInput.addEventListener("change", async () => {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = async (event) => {
            const remoteOffer = JSON.parse(event.target.result);
            await peerConnection.setRemoteDescription(remoteOffer);

            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);

            console.log("Answer created. Send this to the peer:", answer);
        };

        reader.readAsText(file);
    });
});

peerConnection.ondatachannel = (event) => {
    event.channel.onmessage = (e) => {
        console.log("Received data:", e.data);
    };
};
