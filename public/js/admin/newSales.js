
document.addEventListener("DOMContentLoaded", event => { 



    const app = firebase.app();
    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true}; db.settings(settings);
    // ======================================================================== AUTH CONTROL ==============================
    firebase.auth().onAuthStateChanged(firebaseUser => {


                const userName = firebase.auth().currentUser.email;
                var docRef = db.collection("userProfiles").doc(userName);

                docRef.get().then(function(doc) {
                    document.getElementById('userInfo').innerHTML = doc.data().userName;
                    salesRepName = doc.data().userName;
                    console.log(salesRepName); 
                    
                });

                const timeStamp = new Date();
           

                if (userName !== 'tyoung@raichicago.com') {
                db.collection("userProfiles").doc(userName).update({
                    ActionRecord: firebase.firestore.FieldValue.arrayUnion(userName + ' was on sales page on ' + timeStamp)
                });

                db.collection("userProfiles").doc('history').update({
                    Tracking: firebase.firestore.FieldValue.arrayUnion(userName + ' was on sales page on ' + timeStamp)
                });
            } else { };
    

                docRef.get().then(function(doc) {

                    const accessInfo = doc.data().Access;

                    if(accessInfo === 'admin') {
                    console.log('You have admin permission');
                    document.getElementById('salesRepSelect').style.display = "block";
                    } else if (accessInfo === 'adminSales') {
                        console.log(accessInfo);
                        console.log('You have sales admin permission');
                        document.getElementById('salesRepSelect').style.display = "block";
                        document.getElementById("scriptHeaderNav").style.display = "none";
                        document.getElementById("scriptNav").style.display = "none";
                        document.getElementById("adminHeaderNav").style.display = "none";
                        document.getElementById("adminNav").style.display = "none";
                    } else if (accessInfo === 'sales') {
                        // console.log(accessInfo);
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



    // ======================================================================== UNCALLED LEADS ON HOME =====================
    // db.collection('sales').get().then(
    //     (snapshot) => console.log('There are ' + snapshot.docs.length + ' docs loaded.')
        
    //   );

      var raiRef = db.collection("sales");



      

   db.collection("sales").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            raiTotal = (doc.id, " => ", doc.data().Leads);
            const count = doc.data().Leads;
            for (i = 0; i < 2; i++) {
                //console.log('loop');
            }


           
        });
    });



    

    setTimeout(function() {

        salesRepName = document.getElementById('userInfo').innerHTML;

       

        const db = firebase.firestore();
            db.collection("sales").doc(salesRepName).get().then(function(doc) {

                let int = doc.data().LeadBusName.length;
                //console.log(int);
                let newInt = int - 1;
                let proStart = doc.data().LeadBusName[newInt];

                //console.log(proStart);

        const lead = doc.data().LeadBusName;
        //console.log(lead);

        var body = document.getElementById("dash-busNames");
    

        const tblBody = document.createElement("tbody");
        const row = document.createElement("tr");


    for (var j = 0; j < lead.length; j++) {
              var cell = document.createElement("li");
              var cellText = document.createTextNode(lead[j]);
              cell.setAttribute('id', lead[j]);
              cell.setAttribute('class', "selector");
              cell.setAttribute('class', 'list-group-item');
              cell.setAttribute('onclick', 'customerSalesCard(this.id)');
              cell.appendChild(cellText);
              row.appendChild(cell);
            }

        body.appendChild(row);

        })
 
}, 1500);




}); 

function signOut() {
                
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location.href = '/index.html';
      }).catch(function(error) {
        // An error happened.
      });
    };



    //=============================================== GETTING CUSTOMER CARD ====================================
    // function customerInfoCard(e){
    //     var list = document.getElementById("holding");   
    //     list.removeChild(list.childNodes[0]);
    //     document.getElementById('busNameHolder').innerHTML = e;
    //      clickColorChange();
    //      function clickColorChange() {
    //         var x = document.getElementById("dash-busNames");
    //         var y = x.getElementsByClassName("list-group-item");
    //         var i;
    //         for (i = 0; i < y.length; i++) {
    //             y[i].style.color = "black";
    //         }
    //     };


    //     const db = firebase.firestore();

    //     db.collection("raiLeads").doc(e).get().then(function(doc) {
    //     var body = document.getElementById("holding");
    //     //var timeID = document.getElementById('times');
    //     const row = document.createElement("ul");
    //     row.setAttribute('class', "list-group");
    //     row.setAttribute('id', "listUL");
    //     //const bow = document.createElement("li");

    //     const note = doc.data().Notes;
    //     const noteT = doc.data().NoteTime;
        

    //     for (var j = 0; j < note.length; j++) {
    //         var cell = document.createElement("li");
    //         var cell2 = document.createElement("div");
    //         var cellText = document.createTextNode(note[j]);
    //         var str = new String (new Date(noteT[j].seconds * 1000));
    //         var mod = str.slice(0, 24);
    //         var timeDate = document.createTextNode(mod);
    //         cell2.setAttribute("style", 'color: black;');
    //         cell2.setAttribute("style", 'font-size: 16px;');
    //         cell2.setAttribute('class', "list-group-item");
    //         cell2.setAttribute("id", 'note');
    //         cell.setAttribute("style", 'color: grey;');
    //         cell.setAttribute("style", 'font-size: 12px;');
    //         cell2.appendChild(cellText);
    //         cell.appendChild(cell2);
    //         cell.appendChild(timeDate);
    //         row.appendChild(cell);
            
 
    //     }



    //     //body.appendChild(bow);
    //     body.appendChild(row);

    //     });

    //     //src="http://player.vimeo.com/video/63534746"
        
    //     db.collection("raiLeads").doc(e).get().then(function(doc) {
    //         let a = "thisthis";
    //         document.getElementById('BusContain').innerHTML = doc.data().BusinessName;
    //         document.getElementById('customerContentBusName').innerHTML = "<strong>Business Name: </strong> " + doc.data().BusinessName; 
    //         document.getElementById('customerContentBusAdd').innerHTML = "<strong>Address: </strong> " + doc.data().BusinessAddress;
    //         document.getElementById('customerContentBusEmail').innerHTML = "<strong>Email: </strong> " + doc.data().Email;
    //         document.getElementById('customerContentBusContact').innerHTML = "<strong>Contact: </strong> " + doc.data().Contact;
    //         document.getElementById('customerContentBusPhone').innerHTML = "<strong>Phone: </strong> " + doc.data().Phone;
    //         document.getElementById('customerContentBusWeb').innerHTML = "<strong>Website: </strong>" +  doc.data().Website;
    //         document.getElementById('customerContentBusVideoLink').innerHTML = `<iframe id="vidHref" style="width: 100%; height: 400px; border: none;">` +  doc.data().VideoLink + '</iframe>';
    //         document.getElementById('vidHref').src = doc.data().VideoLink;
    //         document.getElementById('customerContentBusWeb').href = doc.data().Website;
    //         //document.getElementById('customerContentBusNotes').innerHTML = "<strong>Notes: </strong> " + doc.data().Notes;
    //         //document.getElementById('customerContentSalesStatus').innerHTML = "<strong>Sales Status: </strong> " + doc.data().SalesStatus;
    //         //document.getElementById('customerContentSalesStatus').innerHTML = "<strong>Date assigned: </strong> " + doc.data().LeadBusNameTime;

    //         checker2 = document.getElementById('BusContain').innerHTML;
    //         //console.log(checker2);
    //         checker = doc.data().BusinessName;
    //         //console.log(checker);

    //         var parser = new DOMParser;
    //         var dom = parser.parseFromString(
    //             '<!doctype html><body>' + checker2,
    //             'text/html');
    //         var decodedString = dom.body.textContent;


    //             document.getElementById(e).style.color = 'blue';
    //             document.getElementById(e).style.color = 'bold';






    //     });
    // };

        // ======================================================================== Modifying Users =====================
    function changeSalesRep(){
        let salesRepChoice = document.getElementById("salesRep").value;
        //console.log(salesRepChoice);
         document.getElementById('userInfo').innerHTML = salesRepChoice;

         if (document.getElementById('changeSet').innerHTML == 'changed'){
             reset();
         } else {
         document.getElementById('changeSet').innerHTML = "changed";
         }

       
         setTimeout(function() {
            refreshSalesDash();
         }, 500);
    };

    function reset(){
        var child = document.getElementById("childMaker");
        var parent = document.getElementById("dash-busNames");
        parent.removeChild(child);
    };

    function refreshSalesDash(){

        const app = firebase.app();
        const db = firebase.firestore();

        // db.collection('sales').get().then(
        //     (snapshot) => console.log('There are ' + snapshot.docs.length + ' docs loaded.')
            
        //   );
    
          var raiRef = db.collection("sales");
    
       db.collection("sales").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                raiTotal = (doc.id, " => ", doc.data().Leads);
                const count = doc.data().Leads;
                for (i = 0; i < 2; i++) {
                    // console.log('loop');
                }
    
    
               
            });
        });
    
    
        setTimeout(function() {

            salesRepName = document.getElementById('userInfo').innerHTML;

            console.log(salesRepName);
    
            const db = firebase.firestore();
                db.collection("sales").doc(salesRepName).get().then(function(doc) {

                    let int = doc.data().LeadBusName.length;
                   // console.log(int);
                    let newInt = int - 1;
                    let proStart = doc.data().LeadBusName[newInt];

                    //console.log(proStart);
    
            const lead = doc.data().LeadBusName;
            //console.log(lead);
    
            var body = document.getElementById("dash-busNames");
        
    
            const tblBody = document.createElement("tbody");
            const row = document.createElement("tr");
            row.setAttribute('id', 'childMaker');
    
    
        for (var j = 0; j < lead.length; j++) {
                  var cell = document.createElement("li");
                  var cellText = document.createTextNode(lead[j]);
                  cell.setAttribute('id', lead[j]);
                  cell.setAttribute('class', "selector");
                  cell.setAttribute('class', "list-group-item");
                  cell.setAttribute('onclick', 'customerSalesCard(this.id)');
                  cell.appendChild(cellText);
                  row.appendChild(cell);
                }
    
            body.appendChild(row);
    
            })
     
    }, 1500);
        
    
    //     setTimeout(function() {
    
    //         salesRepName = document.getElementById('userInfo').innerHTML;
    
    //     const docRef = db.collection(salesRepName);
    //     docRef.get().then(snapshot => {
    //         snapshot.forEach(doc => {
    
    //         const lead = doc.id;
    
    //         var body = document.getElementById("dash-busNames");
    //         //const row = document.createElement("div");
    
    //         const tblBody = document.createElement("tbody");
    //         const row = document.createElement("tr");
    
    
    //     for (var j = 0; j < 1; j++) {
    //               var cell = document.createElement("td");
    //               var cellText = document.createTextNode(lead);
    //               cell.setAttribute('id', lead);
    //               cell.setAttribute('class', "selector");
    //               cell.setAttribute('onclick', 'customerInfoCard(this.id)');
    //               cell.appendChild(cellText);
    //               row.appendChild(cell);
    //             }
    
    //         body.appendChild(row);
    
    //         })
    //     });
    // }, 1500);

};




document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();
    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true}; db.settings(settings);
   
    // db.collection('raiLeads').get().then(
    //     (snapshot) => console.log('There are ' + snapshot.docs.length + ' docs loaded.')  
    // );

    var globalVariables = {};
    setTimeout(function () {
    var body = document.getElementById("salesRep");
    var sales = db.collection('sales');
        sales.get().then(snapshot => { snapshot.forEach(doc => {
                                            docId = doc.id;
                                    
                                            const option = document.createElement("option");
                                        
                                            option.setAttribute('id', 'salesRepChoice');
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


// =================================================================================================== NOTE SECTION
function addNoteButton() {
    let textForNotes = document.getElementById('noteText').value;
    let tagID = document.getElementById('busNameHolder').innerHTML;
    let user = document.getElementById('userInfo').innerHTML;

    const app = firebase.app();
    const db = firebase.firestore();

    let docRef = db.collection("raiLeads").doc(tagID);

    let timeStamp = new Date();

    db.collection("raiLeads").doc(tagID).update({
        NoteTime: firebase.firestore.FieldValue.arrayUnion(timeStamp),
        NoteChangeTrack: firebase.firestore.FieldValue.arrayUnion(textForNotes + ' ' + "written on " + timeStamp + '  ' + 'by ' + user),
        Notes: firebase.firestore.FieldValue.arrayUnion(textForNotes)
    })
    .then(function() {
        console.log("Document successfully updated!");
        db.collection("raiLeads").doc(tagID).get().then(function(doc) {
     
        });
        document.getElementById('noteText').value = '';
        var parent = document.getElementById("noteDiv");
        var child = document.getElementById("customerContentBusNotes");
        parent.removeChild(child);
        //document.getElementById('customerContentBusNotes').style.display = "none";
        setTimeout(function(){
            customerSalesCard(tagID);
        }, 200);
    });

};

function cancelNote(){
    document.getElementById('noteText').value = '';
};