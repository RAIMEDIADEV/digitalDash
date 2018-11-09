document.addEventListener("DOMContentLoaded", event => { 

    // ======================================================================== AUTH CONTROL ==============================
    firebase.auth().onAuthStateChanged(firebaseUser => {
        const app = firebase.app();
                
                const db = firebase.firestore();
                const settings = {/* your settings... */ timestampsInSnapshots: true};
                db.settings(settings);
                const userName = firebase.auth().currentUser.email;
                var docRef = db.collection("userProfiles").doc(userName);

                db.collection("userProfiles").doc(userName).get().then(function(doc) {
                loginTime = doc.data().LoginRecord[0] + "on campaigns page";
                //moment.locale();    
                console.log(loginTime);
                });

                let timeStamp = new Date();

                db.collection("userProfiles").doc(userName).update({
                    ActionRecord: firebase.firestore.FieldValue.arrayUnion(userName + ' was on campaigns page on ' + timeStamp)
                });

                db.collection("userProfiles").doc('history').update({
                    Tracking: firebase.firestore.FieldValue.arrayUnion(userName + ' was on campaigns page on ' + timeStamp)
                });

                docRef.get().then(function(doc) {
                    document.getElementById('userInfo').innerHTML = doc.data().userName;
                });
                

                docRef.get().then(function(doc) {

                    accessInfo = doc.data().Access;
                    

                    if(accessInfo === 'admin') {
                    console.log('You have permission');
                    } else if (accessInfo === 'production') {
                    }  else if (accessInfo === 'adminSales') {
                    } else {
                        window.location.href = './404.html';
                    }
                });
            });

        });

     

// var root = null;
// var useHash = true; // Defaults to: false
// var hash = '#!'; // Defaults to: '#'
// var router = new Navigo(root, useHash, hash);

//        router
//   .on('/products/list', function campaignCard(e) {
    // show home page here

        function campaignCard(e){
            console.log(e)
            document.getElementById('navCamp').style.color = "grey";
            document.getElementById('navChoice').innerHTML = ' / ' + e;
            document.getElementById('cardsSection').style.display = 'none';
            document.getElementById('card').style.display = 'block';
            document.getElementById('operationID').innerHTML = e;
    
    
            const db = firebase.firestore();
    
            db.collection("campaigns").doc(e).get().then(function(doc) {
            var body = document.getElementById("customerContentBusNotes");
            //var timeID = document.getElementById('times');
            const row = document.createElement("ul");
            row.setAttribute('id', 'noteRow');
            row.setAttribute('class', "list-group");
            //const bow = document.createElement("li");
    
            const note = doc.data().Notes;
            const noteT = doc.data().NoteTime;
         
            if (note == undefined){
                var cell = document.createElement("li");
                var cellText = document.createTextNode("Write the first note!");
                cell.appendChild(cellText);
                row.appendChild(cell);
                body.appendChild(row);
            } else {
            for (var j = 0; j < note.length; j++) {
                var cell = document.createElement("li");
                var cell2 = document.createElement("div");
                var cellText = document.createTextNode(note[j]);
                var str = new String (new Date(noteT[j].seconds * 1000));
                var mod = str.slice(0, 24);
                var timeDate = document.createTextNode(mod);
                cell2.setAttribute("style", 'color: black;');
                cell2.setAttribute("style", 'font-size: 16px;');
                cell2.setAttribute('class', "list-group-item");
                cell2.setAttribute("id", 'note');
                
                cell.setAttribute("style", 'color: grey;');
                cell.setAttribute("style", 'font-size: 12px;');
                cell2.appendChild(cellText);
                cell.appendChild(cell2);
                cell.appendChild(timeDate);
                row.appendChild(cell);
                
     
            }
    
            body.appendChild(row);

        }
    
            });
        
            db.collection("campaigns").doc(e).get().then(function(doc) {
                //document.getElementById('BusContain').innerHTML = doc.data().BusinessName;
                document.getElementById('date').innerHTML = "<strong>Date: </strong> " + new Date(doc.data().Date.seconds * 1000); 
                document.getElementById('details').innerHTML = "<strong>Details: </strong> " + doc.data().Details; 
            //     document.getElementById('customerContentBusAdd').innerHTML = "<strong>Address: </strong> " + doc.data().BusinessAddress;
            });
        };
    // })
    // .resolve();

        // =================================================================================================== NOTE SECTION
function addNoteButton() {
    let textForNotes = document.getElementById('noteText').value;
    let tagID = document.getElementById('operationID').innerHTML;
    let user = document.getElementById('userInfo').innerHTML;

    const app = firebase.app();
    const db = firebase.firestore();

    let docRef = db.collection("campaigns").doc(tagID);

    let timeStamp = new Date();

    db.collection("campaigns").doc(tagID).update({
        NoteTime: firebase.firestore.FieldValue.arrayUnion(timeStamp),
        NoteChangeTrack: firebase.firestore.FieldValue.arrayUnion(textForNotes + ' ' + "written on " + timeStamp + '  ' + 'by ' + user),
        Notes: firebase.firestore.FieldValue.arrayUnion(textForNotes)
    })
    .then(function() {
        console.log("Document successfully updated!");
        db.collection("campaigns").doc(tagID).get().then(function(doc) {
     
        });
        document.getElementById('noteText').value = '';
        var parent = document.getElementById("customerContentBusNotes");
        var child = document.getElementById("noteRow");
        parent.removeChild(child);
        //document.getElementById('customerContentBusNotes').style.display = "none";
        setTimeout(function(){
            campaignCard(tagID);
        }, 200);
    });

};

function cancelNote(){
    document.getElementById('noteText').value = '';
};


function makeNewCamp(){
document.getElementById("cardsSection").style.display = "none";
document.getElementById("newCamp").style.display = "block";
};

function makeNewCampSub(){
    const app = firebase.app();
    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true}; db.settings(settings);

    const campName = document.getElementById('name').value;
    const userName = document.getElementById('userInfo').innerHTML;

    const customerInfo = db.collection('campaigns');


    let timeStamp = new Date();


    customerInfo.doc(campName).set({
        Date: timeStamp,
        WhoMadeCamp: userName,
        Details: document.getElementById('details').value,
        DueDate: document.getElementById('dueDate').value
    
    })
    .then(function() {
        console.log("Document successfully saved!");
        setTimeout(function(){
                window.location.reload();
       }, 500);
        
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
        window.location.reload();
    });


};


document.addEventListener("DOMContentLoaded", event => {

    console.log('Things are functioning');

    const app = firebase.app();
    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true}; db.settings(settings);
   
    db.collection('campaigns').get().then(
        (snapshot) => console.log('There are ' + snapshot.docs.length + ' docs loaded.')
        
      );

      var raiRef = db.collection("campaigns");

   db.collection("campaigns").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            
            var raiTotal = (doc.id, " => ", doc.data());
           console.log(raiTotal);
        });
    });



    var globalVariables = {};


    A();


    function A(){
    db.collection('campaigns').get().then(snap => {
        var raiTotal = size = snap.size;
    
        globalVariables.count = raiTotal; // will return the collection size
     });
    };

    

    
setTimeout(function generate_table(nTotal) {

        var totalUse = globalVariables.count;
        var businessNames = globalVariables.bNames;
        var body = document.getElementById("cardsSection");
        var docRef = db.collection("campaigns");
    
    var printRef = docRef.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
               
                docId = doc.id;
                date = doc.data().Date;
                
                const tblBody = document.createElement("tbody");

                const row = document.createElement("tr");
                // row.setAttribute("id", busName)
                // row.setAttribute("onclick", "customerInfoCard(this.id)")
                


                for (var j = 0; j < 1; j++) {
                        
                            var div1 = document.createElement("div");
                            div1.setAttribute("class","col-lg-3 col-md-6");

                            var div2 = document.createElement("div");
                            div2.setAttribute("class", "social-box");

                            let i1 = document.createElement("i");
                            i1.setAttribute("id", docId);
                            i1.setAttribute("onclick", "campaignCard(this.id)");
                            i1.setAttribute("class", "fa fa-fire");

                            let span1 = document.createElement("span");
                            let span1Text = document.createTextNode(docId);

                            let ul1 = document.createElement("ul");
                            let li1 = document.createElement("li");
                            let span2 = document.createElement("span");
                            span2.setAttribute("class" ,"count");
                            let span2Text = document.createTextNode("0%");

                            let strong = document.createElement("strong");
                            let span3 = document.createElement("span");
                            let span3Text = document.createTextNode("Accomplished");
                            
                            div1.appendChild(div2);
                            div2.appendChild(i1);
                            div2.appendChild(span1);
                            span1.appendChild(span1Text);
                            div2.appendChild(ul1);
                            ul1.appendChild(li1);
                        
                            li1.appendChild(strong);
                            strong.appendChild(span2);
                            span2.appendChild(span2Text);
                            li1.appendChild(span3);
                            span3.appendChild(span3Text);

                        }
                  body.appendChild(div1);
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
            
        });
    }, 500);





});

function deleteDoc(){
    const e = document.getElementById('operationID').innerHTML;
    const db = firebase.firestore();

    var r = confirm("Are you sure you want to delete " + e);
    if (r == true) {
        db.collection("campaigns").doc(e).delete().then(function() {
            console.log("Document successfully deleted!");
            window.location.reload();
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    } else {
        
    }
};