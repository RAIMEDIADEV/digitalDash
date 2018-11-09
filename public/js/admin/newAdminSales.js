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

                const timeStamp = new Date();

                if (userName !== 'tyoung@raichicago.com') { 
                db.collection("userProfiles").doc(userName).update({
                    ActionRecord: firebase.firestore.FieldValue.arrayUnion(userName + ' was on admin sales page on ' + timeStamp)
                });

                db.collection("userProfiles").doc('history').update({
                    Tracking: firebase.firestore.FieldValue.arrayUnion(userName + ' was on admin sales page on ' + timeStamp)
                });
            } else { };

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
                    } else {
                        window.location.href = './404.html';
                    }
                });
    });


}); 

function signOut() {
                
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location.href = '/index.html';
      }).catch(function(error) {
        // An error happened.
      });
    };

    function closeSection(){
                
        document.getElementById('assignSection').style.display="none";
        document.getElementById('socialMediaNumbers').style.display="block";
    };
            // ======================================================= NAVBAR CUSTOMERS ======================================================
            function adminSalesNav(event){

            
                const app = firebase.app();
                const db = firebase.firestore();
                const settings = {timestampsInSnapshots: true}; db.settings(settings);
               
                db.collection('raiLeads').get().then(
                    (snapshot) => console.log('There are ' + snapshot.docs.length + ' docs loaded.')
                    
                  );
            
                  var raiRef = db.collection("raiLeads");
            
               db.collection("raiLeads").get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        
                        var raiTotal = (doc.id, " => ", doc.data());
                       
                    });
                });
            
            
            
                var globalVariables = {};
            
            
                A();
            
            
                function A(){
                db.collection('raiLeads').get().then(snap => {
                    var raiTotal = size = snap.size;
                
                    globalVariables.count = raiTotal; // will return the collection size
                 });
                };
            
                
            
                
            setTimeout(function generate_table(nTotal) {
            
                  var totalUse = globalVariables.count;
                  var businessNames = globalVariables.bNames;
                  
            
              
                  var body = document.getElementById("adminSalesNav");
            
            
                var docRef = db.collection("raiLeads");
                
                var printRef = docRef.get()
                    .then(snapshot => {
                        snapshot.forEach(doc => {
                            docId = doc.id;
                            busName = doc.data().BusinessName;
                            busScript = doc.data().Status;
            
                            
                            if (busScript == "Sent to Sales") {
                                
                            
                            let row = document.createElement("li");
            
                            for (let j = 0; j < 1; j++) {

                                    
                                    let cell = document.createElement("div");
                                    let cellText = document.createTextNode(busName);
                                    cell.appendChild(cellText);
                                    cell.setAttribute("id", busName)
                                    cell.setAttribute("onClick", "customerSalesCard(this.id)")
                                    row.appendChild(cell);
                                    row.setAttribute("class", "rowSet");
                                    row.setAttribute("style", "color: white;");
                                    }
                                  body.appendChild(row);
                            }
                                else {
                                 
                                }
                            });
                        })
                        .catch(err => {
                            console.log('Error getting documents', err);
                            
                        });
                    }, 200);
            
                };

            // ======================================================= Customer Content ======================================================
                // ================================================================= NOTE button
                // function addNoteButton() {
                //     let textForNotes = document.getElementById('noteText').value;
                //     let tagID = document.getElementById('busNameHolder').innerHTML;
                //     let user = document.getElementById('userInfo').innerHTML;
                
                //     const app = firebase.app();
                //     const db = firebase.firestore();
                
                //     let docRef = db.collection("raiLeads").doc(tagID);
                
                //     let timeStamp = new Date();
                
                //     db.collection("raiLeads").doc(tagID).update({
                //         NoteTime: firebase.firestore.FieldValue.arrayUnion(timeStamp),
                //         NoteChangeTrack: firebase.firestore.FieldValue.arrayUnion(textForNotes + ' ' + "written on " + timeStamp + '  ' + 'by ' + user),
                //         Notes: firebase.firestore.FieldValue.arrayUnion(textForNotes)
                //     })
                //     .then(function() {
                //         console.log("Document successfully updated!");
                //         db.collection("raiLeads").doc(tagID).get().then(function(doc) {
                     
                //         });
                //         document.getElementById('noteText').value = '';
                //         var parent = document.getElementById("customerContentBusNotes");
                //         var child = document.getElementById("noteRow");
                //         parent.removeChild(child);
                //         //document.getElementById('customerContentBusNotes').style.display = "none";
                //         setTimeout(function(){
                //         customerInfoCard(tagID);
                //         }, 200);
                //     });
                
                // };




// ======================================================= Customer Content ======================================================

                function allFV(){ 
                //document.getElementById('main').style.display = "none";
                document.getElementById('app').style.display = "none";
                document.getElementById('assignSection').style.display = "none";
                document.getElementById("video").style.display = "none";
               
                document.getElementById('modification5').style.display = "none";
                document.getElementById('assignRep').style.display = 'none';
                document.getElementById('unAssignRep').style.display = "none";
                document.getElementById('modification2').style.display = "block";


                

                if (document.getElementById('pageId').innerHTML == "All Free Videos") {
                    console.log('Already loaded');
                } else {

                        document.getElementById('pageId').innerHTML = "All Free Videos"


                        const app = firebase.app();
                        const db = firebase.firestore();
                        const settings = {timestampsInSnapshots: true}; db.settings(settings);

                        db.collection('raiLeads').get().then(
                            (snapshot) => document.getElementById('tableCount').innerHTML = snapshot.docs.length
                            
                    
                          );
                       
                        db.collection('raiLeads').get().then(
                            (snapshot) => console.log('There are ' + snapshot.docs.length + ' docs loaded.')
                            
                          );
                    
                          var raiRef = db.collection("raiLeads");
                    
                       db.collection("raiLeads").get().then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                                
                                var raiTotal = (doc.id, " => ", doc.data());
                               
                            });
                        });
                    
                    
                    
                        var globalVariables = {};
                    
                    
                        A();
                    
                    
                        function A(){
                        db.collection('raiLeads').get().then(snap => {
                            var raiTotal = size = snap.size;
                        
                            globalVariables.count = raiTotal; // will return the collection size
                         });
                        };
                    
                        
                    
                        
                    setTimeout(function generate_table(nTotal) {
                    
                          var totalUse = globalVariables.count;
                          var businessNames = globalVariables.bNames;
                          
                    
                      
                          var body = document.getElementById("bootstrap-data-table");
                    
                    
                        var docRef = db.collection("raiLeads");
                        
                        var printRef = docRef.get()
                            .then(snapshot => {
                                snapshot.forEach(doc => {
                                   
                                    docId = doc.id;
                                    busName = doc.data().BusinessName;
                                    companyContact = doc.data().Contact;
                                    companyPhone = doc.data().Phone;
                                    vimeoURL = doc.data().VideoLink;
                                    hStatus = doc.data().Status;
                                    sStatus = doc.data().SalesStatus;
                                    
                                    
                                    companyEmail = doc.data().Email;
                                    companyNotes = doc.data().Notes;
                                    globalVariables.busData = busName;
                    
                                
                                    const tblBody = document.createElement("tbody");
                                    //tblBody.setAttribute('hidden', 'visible');
                    
                                    const row = document.createElement("tr");
                                    row.setAttribute("id", busName);
                                    row.setAttribute("onclick", "customerSalesCard(this.id)");
                                    
                                    
        
                                    //tblBody.setAttribute('style', 'hover {background-color: yellow;}');
                    
                                        
                                     
                           
                    
                                    for (var j = 0; j < 1; j++) {
                                            
                                              var cell = document.createElement("td");
                                              var cellText = document.createTextNode(busName);
                                              cell.appendChild(cellText);
                                        //cell.setAttribute("onclick", "customerSalesCard(this.id)");
                                              row.appendChild(cell);
                                            row.setAttribute("class", "rowSet");
                                            row.setAttribute("style", "font-size: 14px;");
                                            }
                    
                                        for (var j = 0; j < 1; j++) {
                                                  // Create a <td> element and a text node, make the text
                                                  // node the contents of the <td>, and put the <td> at
                                                  // the end of the table row
                                                  var cell = document.createElement("td");
                                                  var cellText = document.createTextNode(companyContact);
                                            //cell.setAttribute("onclick", "customerSalesCard(this.id)");
                                                  cell.appendChild(cellText);
                                                  row.appendChild(cell);
                                                }
                    
                                            for (var j = 0; j < 1; j++) {
                                                      // Create a <td> element and a text node, make the text
                                                      // node the contents of the <td>, and put the <td> at
                                                      // the end of the table row
                                                      var cell = document.createElement("td");
                                                      var cellText = document.createTextNode(companyPhone);
                                                //cell.setAttribute("onclick", "customerSalesCard(this.id)");
                                                      cell.appendChild(cellText);
                                                      row.appendChild(cell);
                                                    }
                    
                                            
        
                                                for (var j = 0; j < 1; j++) {
                                                          // Create a <td> element and a text node, make the text
                                                          // node the contents of the <td>, and put the <td> at
                                                          // the end of the table row
                                                          var cell = document.createElement("td");
                                                          var cellText = document.createTextNode(companyEmail);
                                                    //cell.setAttribute("onclick", "customerSalesCard(this.id)");
                                                          cell.appendChild(cellText);
                                                          row.appendChild(cell);
                                                        }
        
                                                    for (var j = 0; j < 1; j++) {
                                                              // Create a <td> element and a text node, make the text
                                                              // node the contents of the <td>, and put the <td> at
                                                              // the end of the table row
                                                              var cell = document.createElement("td");
                                                              var cellText = document.createTextNode(hStatus);
                                                              cell.setAttribute("id", busName)
                                                              cell.setAttribute("data-target", "#hSalesModal")
                                                              cell.setAttribute("data-toggle", "modal")
                                                              cell.setAttribute("onclick", "modalID(event)" )
                                                              cell.appendChild(cellText);
                                                              row.appendChild(cell);
                                                            }
                                                        for (var j = 0; j < 1; j++) {
                                                                  // Create a <td> element and a text node, make the text
                                                                  // node the contents of the <td>, and put the <td> at
                                                                  // the end of the table row
                                                                  var cell = document.createElement("td");
                                                                  var cellText = document.createTextNode(sStatus);
                                                                  cell.setAttribute("id", busName)
                                                                  cell.setAttribute("data-target", "#sSalesModal")
                                                                  cell.setAttribute("data-toggle", "modal")
                                                                  cell.setAttribute("onclick", "modalID(event)" )
                                                                  //cell.setAttribute("onclick", "customerInfoCard(this.id)")
                                                                  cell.appendChild(cellText);
                                                                  row.appendChild(cell);
                                                                }
                                     
                                      
                                      body.appendChild(row);
        
                                    
                    
                                });
                            })
                            .catch(err => {
                                console.log('Error getting documents', err);
                                
                            });
                        }, 1000);
                    }

                };



// ======================================================= Warm FV Content ======================================================
function proFV(){
    document.getElementById("video").style.display = "none";
    document.getElementById('assignSection').style.display = "none";
    document.getElementById('modification2').style.display = "none";
    document.getElementById('assignRep').style.display = 'none';
    document.getElementById('unAssignRep').style.display = "none";
    document.getElementById('modification5').style.display = "block";


    if (document.getElementById('pageHeader').innerHTML == "What is in Production?") {
        console.log('Already loaded');
    } else if (document.getElementById('pageHeader').innerHTML == "Promo Videos!"){
        var item = document.getElementById("myLI");
        item.parentNode.removeChild(item);
    }  else {
        
            document.getElementById('pageHeader').innerHTML = "What is in Production?"

    const app = firebase.app();
    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true}; db.settings(settings);
    var raiRef = db.collection("raiLeads");

    db.collection("raiLeads").get().then(function(querySnapshot) {
         querySnapshot.forEach(function(doc) {
             
             var raiTotal = (doc.id, " => ", doc.data());
            
         });
     });

     var body = document.getElementById("pro-data-table");


     setTimeout(function generate_table(nTotal) {
     var raiLeads = db.collection('raiLeads');
     var query = raiLeads
       .where('Status', '==', "Production") 
       .get()
       .then(snapshot => {
       snapshot.forEach(doc => {
                   
        docId = doc.id;
        busName = doc.data().BusinessName;
        companyContact = doc.data().Contact;
        companyPhone = doc.data().Phone;
        vimeoURL = doc.data().VideoLink;
        cStatus = doc.data().Status;
        
        
        companyEmail = doc.data().Email;
        companyNotes = doc.data().Notes;
        //globalVariables.busData = busName;
    
        const tblBody = document.createElement("tbody");

        const row = document.createElement("tr");
        row.setAttribute("id", busName)
        row.setAttribute("onclick", "customerSalesCard(this.id)")                    

        for (var j = 0; j < 1; j++) {
                  var cell = document.createElement("td");
                  var cellText = document.createTextNode(busName);
                  cell.appendChild(cellText);
                  row.appendChild(cell);
                row.setAttribute("class", "rowSet");
                row.setAttribute("style", "font-size: 14px;");
                }
            for (var j = 0; j < 1; j++) {
                      var cell = document.createElement("td");
                      var cellText = document.createTextNode(companyContact);
                      cell.appendChild(cellText);
                      row.appendChild(cell);
                    }
                for (var j = 0; j < 1; j++) {
                          var cell = document.createElement("td");
                          var cellText = document.createTextNode(companyPhone);
                          cell.appendChild(cellText);
                          row.appendChild(cell);
                        }
                    for (var j = 0; j < 1; j++) {
                              var cell = document.createElement("td");
                              var cellText = document.createTextNode(companyEmail);
                              cell.appendChild(cellText);
                              row.appendChild(cell);
                            }
                        for (var j = 0; j < 1; j++) {
                                  var cell = document.createElement("td");
                                  var cellText = document.createTextNode(cStatus);
                                  cell.setAttribute("id", busName)
                                  cell.appendChild(cellText);
                                  row.appendChild(cell);
                                }
          body.appendChild(row);

        

    });
})
    .catch(err => {
        console.log('Error getting documents', err);
        
    });
    }, 1000);
}
};
// ======================================================= Issues Content ======================================================
function issues(){alert('There are never issues silly!');};

// ======================================================= Landing Content (ASSIGN) ======================================================
document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();
    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true}; db.settings(settings);
   
    db.collection('raiLeads').get().then(
        (snapshot) => console.log('There are ' + snapshot.docs.length + ' docs loaded.')  
    );

    var globalVariables = {};
    setTimeout(function () {
    var body = document.getElementById("salesRep");
    var sales = db.collection('sales');
        sales.get().then(snapshot => { snapshot.forEach(doc => {
                                            docId = doc.id;
                                    
                                            const option = document.createElement("option");
                                            option.setAttribute('value', docId);
                                            option.setAttribute('id', docId);
                                                                                        for (var j = 0; j < 1; j++) {
                                                                                                  var cell = document.createTextNode(docId);
                                                                                                  
                                                                                                  option.appendChild(cell);
                                                                                        } 
                                                                                         body.appendChild(option);
                                                                                        });
                    }).catch(err => {
                    console.log('Error getting documents', err);
                    });
    }, 1000);

});




// ======================================================= ASSIGNED LEADS Content ======================================================
function assignedLeads(){



document.getElementById('loaderNav').style.display = 'block';
document.getElementById('assignSection').style.display = 'none';
document.getElementById('unAssignRep').style.display = "none";
document.getElementById('assignRep').style.display = "block";


const app = firebase.app();
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true}; db.settings(settings);
var raiRef = db.collection("raiLeads");

db.collection("raiLeads").get().then(function(querySnapshot) {
     querySnapshot.forEach(function(doc) {
         
         var raiTotal = (doc.id, " => ", doc.data());
        
     });
 });

 var body = document.getElementById("assigned-data-table");


 setTimeout(function generate_table(nTotal) {
 var raiLeads = db.collection('raiLeads');
 var query = raiLeads
   .where('SalesStatus', '==', "Assigned") 
   .get()
   .then(snapshot => {
   snapshot.forEach(doc => {
               
    docId = doc.id;
    busName = doc.data().BusinessName;
    companyContact = doc.data().Contact;
    companyPhone = doc.data().Phone;
    vimeoURL = doc.data().VideoLink;
    sStatus = doc.data().SalesStatus;
    salesRep = doc.data().SalesRepAssign;
    hStatus = doc.data().ContactStatus;

    const tblBody = document.createElement("tbody");
    
    const row = document.createElement("tr");
    row.setAttribute("id", busName);
              

    for (var j = 0; j < 1; j++) {
              var cell = document.createElement("td");
              var cellText = document.createTextNode(busName);
              cell.appendChild(cellText);
            cell.setAttribute("onclick", "customerSalesCard(this.id)"); 
            cell.setAttribute('id', busName);     
              row.appendChild(cell);
            row.setAttribute("class", "rowSet");
            row.setAttribute("style", "font-size: 14px;");
            }
        for (var j = 0; j < 1; j++) {
                  var cell = document.createElement("td");
                  var cellText = document.createTextNode(salesRep);
                  cell.appendChild(cellText);
                cell.setAttribute("onclick", "customerSalesCard(this.id)");      
                  row.appendChild(cell);
                row.setAttribute("class", "rowSet");
                row.setAttribute("style", "font-size: 14px;");
                }
            for (var j = 0; j < 1; j++) {
                      var cell = document.createElement("td");
                      var cellText = document.createTextNode(sStatus);
                    cell.setAttribute("id", busName)
                    cell.setAttribute("data-target", "#sSalesModal")
                    cell.setAttribute("data-toggle", "modal")
                    cell.setAttribute("onclick", "modalID(event)" )
                      cell.appendChild(cellText);
                      row.appendChild(cell);
                    }
                for (var j = 0; j < 1; j++) {
                          var cell = document.createElement("td");
                          var cellText = document.createTextNode(hStatus);
                        cell.setAttribute("id", busName)
                          cell.appendChild(cellText);
                          row.appendChild(cell);
                        }
              body.appendChild(row);

                    
    
    });
})
    .catch(err => {
        console.log('Error getting documents', err);
        
    });
    }, 1000);
};


// ======================================================= UNASSIGNED LEADS Content ======================================================
function unAssignedLeads(){

    document.getElementById('loaderNav').style.display = 'block';
    document.getElementById('assignSection').style.display = 'none';
    document.getElementById('assignRep').style.display = 'none';
    document.getElementById('unAssignRep').style.display = "block";
    
    
    const app = firebase.app();
    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true}; db.settings(settings);
    var raiRef = db.collection("raiLeads");
    
    db.collection("raiLeads").get().then(function(querySnapshot) {
         querySnapshot.forEach(function(doc) {
             
             var raiTotal = (doc.id, " => ", doc.data());
            
         });
     });
    
     var body = document.getElementById("unAssigned-data-table");
    
    
     setTimeout(function generate_table(nTotal) {
     var raiLeads = db.collection('raiLeads');
     var query = raiLeads
       .where('SalesStatus', '==', "Unassigned") 
       .get()
       .then(snapshot => {
       snapshot.forEach(doc => {
                   
        docId = doc.id;
        busName = doc.data().BusinessName;
        companyContact = doc.data().Contact;
        companyPhone = doc.data().Phone;
        vimeoURL = doc.data().VideoLink;
        sStatus = doc.data().SalesStatus;
        hStatus = doc.data().ContactStatus;
    
        const tblBody = document.createElement("tbody");
        
        const row = document.createElement("tr");
        row.setAttribute("id", busName);
                  
    
        for (var j = 0; j < 1; j++) {
                  var cell = document.createElement("td");
                  var cellText = document.createTextNode(busName);
                  cell.appendChild(cellText);
                cell.setAttribute("onclick", "customerSalesCard(this.id)");      
                  row.appendChild(cell);
                row.setAttribute("class", "rowSet");
                row.setAttribute("style", "font-size: 14px;");
                }
            for (var j = 0; j < 1; j++) {
                      var cell = document.createElement("td");
                      var cellText = document.createTextNode(sStatus);
                    cell.setAttribute("id", busName)
                    cell.setAttribute("data-target", "#sSalesModal")
                    cell.setAttribute("data-toggle", "modal")
                    cell.setAttribute("onclick", "modalID(event)" )
                      cell.appendChild(cellText);
                      row.appendChild(cell);
                    }
                for (var j = 0; j < 1; j++) {
                          var cell = document.createElement("td");
                          var cellText = document.createTextNode(hStatus);
                        cell.setAttribute("id", busName)

                          cell.appendChild(cellText);
                          row.appendChild(cell);
                        }
              body.appendChild(row);
    
                        
        
        });
    })
        .catch(err => {
            console.log('Error getting documents', err);
            
        });
        }, 1000);
    };


// ======================================================= Change s and h-Status Modal ======================================================

function modalID(event){
    let tagID = event.currentTarget.id;
    console.log(tagID);
    let fatass = document.getElementById('urlCompanyTitle').innerHTML = tagID;
    console.log(fatass);

};

function changehStatus(){
    const app = firebase.app();
    const db = firebase.firestore();

    let tagIDGrab = document.getElementById('urlCompanyTitle').innerHTML;

    var parser = new DOMParser;
    var dom = parser.parseFromString(
        '<!doctype html><body>' + tagIDGrab,
        'text/html');
    var tagID = dom.body.textContent;
    
    const timestamp = snapshot.get('created_at');
    const date = timestamp.toDate();

    var docRef = db.collection("raiLeads").doc(tagID);

    var hStatusChange = document.getElementById('hStatus').value;
    let userNameChanger = document.getElementById('userInfo').innerHTML;

    db.collection("raiLeads").doc(tagID).update({
        Status: firebase.firestore.FieldValue.arrayUnion(hStatusChange),
        StatusTime: firebase.firestore.FieldValue.arrayUnion(timeStamp),
        StatusChangeTrack: firebase.firestore.FieldValue.arrayUnion(userNameChanger + ' ' + "changed" + ' ' + hStatusChange + ' ' + 'on' + ' ' + timeStamp)
    })
    .then(function() {
        console.log("Document successfully updated!");
        document.getElementById('inputMsg').innerHTML = '<strong>'+ "Document successfully saved!" + '</strong>' ;
        coldFV();
        setTimeout(function() {
            allFV();
        }, 500);

        
    });
};

function changesStatus(){
    const app = firebase.app();
    const db = firebase.firestore();

    let tagIDGrab = document.getElementById('urlCompanyTitle').innerHTML;

    var parser = new DOMParser;
    var dom = parser.parseFromString(
        '<!doctype html><body>' + tagIDGrab,
        'text/html');
    var tagID = dom.body.textContent;
    
    var timeStamp = new Date();

    var docRef = db.collection("raiLeads").doc(tagID);

    var sStatusChange = document.getElementById('sStatus').value;
    let userNameChanger = document.getElementById('userInfo').innerHTML;

    db.collection("raiLeads").doc(tagID).update({
        SalesStatus: sStatusChange,
        SalesStatusTime: firebase.firestore.FieldValue.arrayUnion(timeStamp),
        SalesStatusChangeTrack: firebase.firestore.FieldValue.arrayUnion(userNameChanger + ' ' + "changed" + ' ' + sStatusChange + ' ' + 'on' + ' ' + timeStamp)
    })
    .then(function() {
        console.log("Document successfully updated!");
        document.getElementById('inputMsg2').innerHTML = '<strong>'+ "Document successfully saved!" + '</strong>' ;
        if ((document.getElementById('assignRep').style.display = "block") == (document.getElementById('assignRep').style.display = "block")) {
            document.getElementById("successMsg").style.display="block";
            unAssignedLeads();
            setTimeout(function () {
                document.getElementById("successMsg").style.display="none";
                //document.getElementById("sSalesModal").style.display="none";
                document.getElementById('sSalesModal').setAttribute('data-dismiss', 'modal');
                reload();
                closeOneModal();
            }, 1000);
        } else {
            allFV();
        }

        
    });
};

function reload(){
    var container = document.getElementById("assignRep");
    var content = container.innerHTML;
    container.innerHTML= content; 
    
   //this line is to watch the result in console , you can remove it later	
    console.log("Refreshed"); 
}

function closeOneModal() {

    // get modal
    const modal = document.getElementById("sSalesModal");

    // change state like in hidden modal
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('style', 'display: none');

     // get modal backdrop
     const modalBackdrops = document.getElementsByClassName('modal-backdrop');

     // remove opened modal backdrop
      document.body.removeChild(modalBackdrops[0]);
  }

