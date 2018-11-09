document.addEventListener("DOMContentLoaded", event => { 



});

function messages(){
    document.getElementById("modification").style.display="none";
    document.getElementById("messageCard").style.display="block";
    

};


function submitMsg(){
    let where = document.getElementById('messageRoute').value;
    let what = document.getElementById('messageNoteContent').value;

    console.log(what);
    console.log(where);

    const app = firebase.app();
    const db = firebase.firestore();

    const timestamp = snapshot.get('created_at');
    const date = timestamp.toDate();

    db.collection("messaging").doc(where).update({
        Message: firebase.firestore.FieldValue.arrayUnion(what),
        MessageTime: firebase.firestore.FieldValue.arrayUnion(timeStamp + '  ' + what)
        }).then(function() {
            console.log("Message successfully sent!");
            document.getElementById("successMsg").style.display="block";
            document.getElementById('messageNoteContent').value = '';
    
        }).catch(function(error) {
            console.error("Error sending message: ", error);
            document.getElementById('errorMsg').style.display = "block";
        });

};

function showProductionMessages(){
    document.getElementById("messageContent").style.display="block";

    const app = firebase.app();
    const db = firebase.firestore();

    db.collection("messaging").doc('production').get().then(function(doc) {
        document.getElementById('productionMessageContent0').innerHTML = doc.data().Message[0];
        document.getElementById('productionMessageContent1').innerHTML = doc.data().Message[1];
        document.getElementById('productionMessageContent2').innerHTML = doc.data().Message[2];
        document.getElementById('productionMessageContent3').innerHTML = doc.data().Message[3];
        document.getElementById('productionMessageContent4').innerHTML = doc.data().Message[4];
    });
};

function showMarketingMessages(){
    document.getElementById("messageContent").style.display="block";

    const app = firebase.app();
    const db = firebase.firestore();

    db.collection("messaging").doc('marketing').get().then(function(doc) {
        document.getElementById('marketingMessageContent0').innerHTML = doc.data().Message[0];
        document.getElementById('marketingMessageContent1').innerHTML = doc.data().Message[1];
        document.getElementById('marketingMessageContent2').innerHTML = doc.data().Message[2];
        document.getElementById('marketingMessageContent3').innerHTML = doc.data().Message[3];
        document.getElementById('marketingMessageContent4').innerHTML = doc.data().Message[4];
    });
};