document.addEventListener("DOMContentLoaded", event => { 

    // ======================================================================== AUTH CONTROL ==============================
    firebase.auth().onAuthStateChanged(firebaseUser => {
        const app = firebase.app();
                const db = firebase.firestore();
                const settings = {timestampsInSnapshots: true}; db.settings(settings);
                const userName = firebase.auth().currentUser.email;
                var docRef = db.collection("userProfiles").doc(userName);

                console.log(userName);

                docRef.get().then(function(doc) {
                    document.getElementById('userInfo').innerHTML = doc.data().userName;
                });

                let timeStamp = new Date();

                db.collection("userProfiles").doc(userName).update({
                    LoginRecord: firebase.firestore.FieldValue.arrayUnion(userName + ' was on Sales page on ' + timeStamp)
                });
    

                docRef.get().then(function(doc) {

                    accessInfo = doc.data().Access;
                    console.log(accessInfo);

                    if(accessInfo === 'admin') {
                    console.log('You have permission');
                    } else if (accessInfo === 'adminSales') {
                        console.log(accessInfo);
                        document.getElementById("scriptHeaderNav").style.display = "none";
                        document.getElementById("scriptNav").style.display = "none";
                        document.getElementById("adminHeaderNav").style.display = "none";
                        document.getElementById("adminNav").style.display = "none";
                    } else if (accessInfo === 'sales') {
                        console.log(accessInfo);
                        console.log('You have sales permission');
                        document.getElementById("scriptHeaderNav").style.display = "none";
                        document.getElementById("scriptNav").style.display = "none";
                        document.getElementById("adminHeaderNav").style.display = "none";
                        document.getElementById("adminNav").style.display = "none";
                    } else {
                        window.location.href = './404.html';
                    }
            
                });
    });


}); 

setTimeout(function() {

    salesRepName = 'mike';
    //document.getElementById('userInfo').innerHTML;

    console.log(salesRepName);

    const db = firebase.firestore();
        db.collection("sales").doc(salesRepName).get().then(function(doc) {

            let int = doc.data().LeadBusName.length;
            console.log(int);
            let newInt = int - 1;
            let proStart = doc.data().LeadBusName[newInt];

            console.log(proStart);

    const lead = doc.data().LeadBusName;
    console.log(lead);

    var body = document.getElementById("info");


    const tblBody = document.createElement("tbody");
    const row = document.createElement("tr");


for (var j = 0; j < lead.length; j++) {
          var cell = document.createElement("li");
          var cellText = document.createTextNode(lead[j]);
          cell.setAttribute('id', lead[j]);
          cell.setAttribute('class', "selector");
          cell.setAttribute('class', 'list-group-item');
          cell.setAttribute('onclick', 'customerInfoCard(this.id)');
          cell.appendChild(cellText);
          row.appendChild(cell);
        }

    body.appendChild(row);

    })

}, 1500);
