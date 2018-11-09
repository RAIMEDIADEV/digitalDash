

function statusChange(){
    console.log('linked');
    document.getElementById("smallModal").style.visibility = "visible";
    document.getElementById("modalContent").style.visibility = "visible";
};

function changeProductionStatus(){
    const app = firebase.app();
    const db = firebase.firestore();
    
    const timestamp = snapshot.get('created_at');
    const date = timestamp.toDate();

    var docRef = db.collection("raiLeads").doc(tagID);

    var productionStatusChange = document.getElementById('statusPro').value;

    db.collection("raiLeads").doc(tagID).update({
        ProductionStatusTime: firebase.firestore.FieldValue.arrayUnion(timeStamp + '  ' + productionStatusChange),
        ProductionStatus: productionStatusChange
    })
    .then(function() {
        console.log("Document successfully updated!");
        document.getElementById('message').innerHTML = '<strong>'+ "Document successfully saved!" + '</strong>' ;
        setTimeout(function(){
        location.reload();
    }, 1000);
        
    });
};