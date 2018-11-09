document.addEventListener("DOMContentLoaded", event => {  

    
    firebase.auth().onAuthStateChanged(firebaseUser => {
        const app = firebase.app();
        const firestore = firebase.firestore();
        const db = firebase.firestore();
        const settings = {/* your settings... */ timestampsInSnapshots: true};
        firestore.settings(settings);
                const user = firebase.auth().currentUser.email;
                var docRef = db.collection("userProfiles").doc(user);
                var docDash = db.collection("raiLeads").doc();

                // db.collection("userProfiles").doc(userName).get().then(function(doc) {
                //     loginTime = doc.data().LoginRecord[0];
                //     //moment.locale();    
                //     console.log(loginTime);
                //     });


                docRef.get().then(function(doc) {
                    document.getElementById('userInfo').innerHTML = doc.data().userName;
                });

                const timeStamp = new Date();
                //const date = timestamp.toDate();

                if (user !== 'tyoung@raichicago.com') { 
                db.collection("userProfiles").doc(user).update({
                    ActionRecord: firebase.firestore.FieldValue.arrayUnion(user + ' was on admin page on ' + timeStamp)
                });

                db.collection("userProfiles").doc('history').update({
                    Tracking: firebase.firestore.FieldValue.arrayUnion(user + ' was on admin page page on ' + timeStamp)
                });
            } else { };

                //document.getElementById('user').innerHTML = 

                docRef.get().then(function(doc) {

                    accessInfo = doc.data().Access;
                    console.log(accessInfo);

                    if(accessInfo === 'admin') {
                    console.log('You have permission');
                    } else {
                        window.location.href = './404.html';
                    }
                });

        });    
        
        setTimeout(function() {
           
            const db = firebase.firestore();
            var raiLeads = db.collection('raiLeads');
            var query = raiLeads
              .where('ProductionStatus', '==', "Editing Done") 
          
              .get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                
    
    
                var body = document.getElementById("toDoList");
                var docRef = db.collection("raiLeads");
                var tblBody = document.createElement("tbody");
                var row = document.createElement("tr");
                const proStatus = doc.data().ProductionStatus;
                row.setAttribute("class", "rowSet");
                row.setAttribute("id", doc.data().BusinessName);
                row.setAttribute("onclick", "customerSalesCard(this.id)")

                  for (var j = 0; j < 1; j++) {
                        var cell = document.createElement("td");
                        var cellText = document.createTextNode(doc.data().BusinessName);
                        //cell.setAttribute("id", doc.data().BusinessName);
                        cell.setAttribute("style", "background-color: black;")
                        //cell.setAttribute("onclick", "customerInfoCard(this.id)");
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                       
                        }
                        for (var j = 0; j < 1; j++) {
                                  var cell = document.createElement("td");
                                  var cellText = document.createTextNode(doc.data().ProductionStatus);
                                cell.setAttribute("style", "background-color: black;")
                           
                                //cell.setAttribute("id", doc.data().BusinessName)
                                //cell.setAttribute("onclick", "customerInfoCard(this.id)" )
                                  cell.appendChild(cellText);
                                  row.appendChild(cell);
                                }
                            for (var j = 0; j < 1; j++) {
                                      var cell = document.createElement("td");
                                      var cellText = document.createTextNode(doc.data().Status);
                                cell.setAttribute("style", "background-color: black;")
                                    
                                    //cell.setAttribute("id", doc.data().BusinessName)
                                    //cell.setAttribute("onclick", "customerInfoCard(this.id)" )
                                      cell.appendChild(cellText);
                                      row.appendChild(cell);
                                    }

                        body.appendChild(row);
                    });
                }).catch(err => {
                            console.log('Error getting documents', err);
                });

                var query = raiLeads
                .where('ProductionStatus', '==', "Editing Done") 
            
                .get()
                .then(snapshot => {
                  snapshot.forEach(doc => {
                  
      
      
                  var body = document.getElementById("payingCLientList");
                  var docRef = db.collection("raiLeads");
                  var tblBody = document.createElement("tbody");
                  var row = document.createElement("tr");
                  const proStatus = doc.data().ProductionStatus;
                  row.setAttribute("class", "rowSet");
                  row.setAttribute("id", doc.data().BusinessName);
                  row.setAttribute("onclick", "customerSalesCard(this.id)")
  
                    for (var j = 0; j < 1; j++) {
                          var cell = document.createElement("td");
                          var cellText = document.createTextNode(doc.data().BusinessName);
                          //cell.setAttribute("id", doc.data().BusinessName);
                          cell.setAttribute("style", "background-color: black;")
                          //cell.setAttribute("onclick", "customerInfoCard(this.id)");
                          cell.appendChild(cellText);
                          row.appendChild(cell);
                         
                          }
                          for (var j = 0; j < 1; j++) {
                                    var cell = document.createElement("td");
                                    var cellText = document.createTextNode(doc.data().ProductionStatus);
                                  cell.setAttribute("style", "background-color: black;")
                             
                                  //cell.setAttribute("id", doc.data().BusinessName)
                                  //cell.setAttribute("onclick", "customerInfoCard(this.id)" )
                                    cell.appendChild(cellText);
                                    row.appendChild(cell);
                                  }
                              for (var j = 0; j < 1; j++) {
                                        var cell = document.createElement("td");
                                        var cellText = document.createTextNode(doc.data().Status);
                                  cell.setAttribute("style", "background-color: black;")
                                      
                                      //cell.setAttribute("id", doc.data().BusinessName)
                                      //cell.setAttribute("onclick", "customerInfoCard(this.id)" )
                                        cell.appendChild(cellText);
                                        row.appendChild(cell);
                                      }
                                  for (var j = 0; j < 1; j++) {
                                          var cell = document.createElement("td");
                                          var cellText = document.createTextNode(doc.data().Status);
                                    cell.setAttribute("style", "background-color: black;")
                                        
                                        //cell.setAttribute("id", doc.data().BusinessName)
                                        //cell.setAttribute("onclick", "customerInfoCard(this.id)" )
                                          cell.appendChild(cellText);
                                          row.appendChild(cell);
                                        }
  
                          body.appendChild(row);
                      });
                  }).catch(err => {
                              console.log('Error getting documents', err);
                  });

                  
                }, 800);  

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
                
                document.getElementById('toDoListContainer').style.display="none";
            };
    //=============================================== NAV FUNCTIONS ====================================


                function getAllClients(){
                    document.getElementById("modification").style.display="none";
                    document.getElementById("app").style.display="none";
                    document.getElementById("inputScript").style.display="none";
                    document.getElementById("modification2").style.display="block";
                    data();
                };

                function justGoHome(){
                    document.getElementById("modification").style.display="block";
                    document.getElementById("modification2").style.display="none";
                    document.getElementById("customerInfoCard").style.display="none";
                    document.getElementById("inputNewClient").style.display="none";
                    document.getElementById("inputScript").style.display="none";
                };

                function inputScript(){
                    document.getElementById("modification").style.display="none";
                    document.getElementById("modification2").style.display="none";
                    document.getElementById("customerInfoCard").style.display="none";
                    document.getElementById("inputNewClient").style.display="none";
                    document.getElementById("inputScript").style.display="block";
                    // scriptPage();
                };


    //=============================================== GETTING ALL CUSTOMERS ====================================
                function data(){
                    console.log('Things are functioning');
            
                    const app = firebase.app();
                    const db = firebase.firestore();

                   
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
                                cStatus = doc.data().Status;
                                
                                
                                companyEmail = doc.data().Email;
                                companyNotes = doc.data().Notes;
                                globalVariables.busData = busName;
                
                            
                                const tblBody = document.createElement("tbody");
                                //tblBody.setAttribute('hidden', 'visible');
                
                                const row = document.createElement("tr");
                                row.setAttribute("id", busName)
                                row.setAttribute("onclick", "customerSalesCard(this.id)")
                                
    
                                //tblBody.setAttribute('style', 'hover {background-color: yellow;}');
                
                                    
                                 
                       
                
                                for (var j = 0; j < 1; j++) {
                                        
                                          var cell = document.createElement("td");
                                          var cellText = document.createTextNode(busName);
                                          cell.appendChild(cellText);
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
                                              cell.appendChild(cellText);
                                              row.appendChild(cell);
                                            }
                
                                        for (var j = 0; j < 1; j++) {
                                                  // Create a <td> element and a text node, make the text
                                                  // node the contents of the <td>, and put the <td> at
                                                  // the end of the table row
                                                  var cell = document.createElement("td");
                                                  var cellText = document.createTextNode(companyPhone);
                                                  cell.appendChild(cellText);
                                                  row.appendChild(cell);
                                                }
                
                                        
    
                                            for (var j = 0; j < 1; j++) {
                                                      // Create a <td> element and a text node, make the text
                                                      // node the contents of the <td>, and put the <td> at
                                                      // the end of the table row
                                                      var cell = document.createElement("td");
                                                      var cellText = document.createTextNode(companyEmail);
                                                      cell.appendChild(cellText);
                                                      row.appendChild(cell);
                                                    }
    
                                                for (var j = 0; j < 1; j++) {
                                                          // Create a <td> element and a text node, make the text
                                                          // node the contents of the <td>, and put the <td> at
                                                          // the end of the table row
                                                          var cell = document.createElement("td");
                                                          var cellText = document.createTextNode(cStatus);
                                                          cell.setAttribute("id", busName)
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
                };

    //=============================================== GETTING CUSTOMER CARD ====================================

 

                function changeStatus(){
                    const app = firebase.app();
                    const db = firebase.firestore();
                    
                   
                    const docIDpreParse = document.getElementById('companyInfoHeader').innerHTML;
                    console.log(docIDpreParse);
                    var parser = new DOMParser;
                    var dom = parser.parseFromString(
                        '<!doctype html><body>' + docIDpreParse,
                        'text/html');
                    var tagID = dom.body.textContent;
                    

                    const timeStamp = new Date();
            
                    let docRef = db.collection("raiLeads").doc(tagID);
            
                    let statusChange = document.getElementById('statusInput').value;

                    let assignChanger = document.getElementById('userInfo').innerHTML;

                    

                    if (statusChange == 'Sent to Sales'){
                        db.collection("raiLeads").doc(tagID).update({
                            ProductionStatusTime: firebase.firestore.FieldValue.arrayUnion(timeStamp),
                            ProductionStatusTrackChange: firebase.firestore.FieldValue.arrayUnion("Done" + ' ' + "changed on " + ' ' + timeStamp + ' ' + 'by' + ' ' + assignChanger),                     
                            ProductionStatus: "Done",

                            StatusTime: firebase.firestore.FieldValue.arrayUnion(timeStamp),
                            StatusTimeInfo: firebase.firestore.FieldValue.arrayUnion(statusChange + ' ' + "changed on " + ' ' + timeStamp + ' ' + 'by' + ' ' + assignChanger),
                            Status: statusChange,
    
                            SalesStatusTime: firebase.firestore.FieldValue.arrayUnion(timeStamp),
                            SalesStatus: "New",
                            SalesStatusTrackChange: firebase.firestore.FieldValue.arrayUnion("New" + ' ' + "changed on " + ' ' + timeStamp + ' ' + 'by' + ' ' + assignChanger)
                        })
                        .then(function() {
    
                            console.log("Document successfully updated!");
                            document.getElementById('inputpMsg').innerHTML = '<strong>'+ "Document successfully saved!" + '</strong>' ;
    
                            db.collection("raiLeads").doc(tagID).get().then(function(doc) {
                                document.getElementById('customerContentpStatus').innerHTML = "<strong>p-Status: </strong> " + doc.data().ProductionStatus;
                                document.getElementById('customerContentSalesStatus').innerHTML = "<strong>Sales Status: </strong> " + doc.data().SalesStatus;
                                //document.getElementById('customerContentStatus').innerHTML = "<strong>Status: </strong> " + doc.data().Status;
    
                            });
                         
                            
                        });
                    } else {
            
                        db.collection("raiLeads").doc(tagID).update({
                        
                            StatusTime: firebase.firestore.FieldValue.arrayUnion(timeStamp),
                            StatusTimeInfo: firebase.firestore.FieldValue.arrayUnion(statusChange + ' ' + "changed on " + ' ' + timeStamp + ' ' + 'by' + ' ' + assignChanger),
                            Status: statusChange
                        })
                        .then(function() {
                            console.log("Document successfully updated!");
                            document.getElementById('inputMsg').innerHTML = '<strong>'+ "Document successfully saved!" + '</strong>' ;

                            db.collection("raiLeads").doc(tagID).get().then(function(doc) {
                                document.getElementById('customerContentStatus').innerHTML = "<strong>Status: </strong> " + doc.data().Status;
                            });

                            //location.reload();
                            
                            
                        });
                    }
                };

                function change_p_Status(){
                    const app = firebase.app();
                    const db = firebase.firestore();
                    
                    let docIDpreParse = document.getElementById('busNameHolder').innerHTML;

                    var parser = new DOMParser;
                    var dom = parser.parseFromString(
                        '<!doctype html><body>' + docIDpreParse,
                        'text/html');
                    var tagID = dom.body.textContent;
                    

                    const timestamp = snapshot.get('created_at');
                    const date = timestamp.toDate();
            
                    let docRef = db.collection("raiLeads").doc(tagID);
            
                    let pStatusChange = document.getElementById('pStatus-input').value;

                    let assignChanger = document.getElementById('userInfo').innerHTML;
            
                    db.collection("raiLeads").doc(tagID).update({
                        ProductionStatusTime: firebase.firestore.FieldValue.arrayUnion(timeStamp),
                        ProductionStatusTrackChange: firebase.firestore.FieldValue.arrayUnion(pStatusChange + ' ' + "changed on " + ' ' + timeStamp + ' ' + 'by' + ' ' + assignChanger),                     
                        ProductionStatus: pStatusChange
                    })
                    .then(function() {
                        console.log("Document successfully updated!");
                        document.getElementById('inputpMsg').innerHTML = '<strong>'+ "Document successfully saved!" + '</strong>' ;

                        db.collection("raiLeads").doc(tagID).get().then(function(doc) {
                            document.getElementById('customerContentpStatus').innerHTML = "<strong>p-Status: </strong> " + doc.data().ProductionStatus;

                        });
                     
                        
                    });
                };

                function changeSalesStatus(){
                    const app = firebase.app();
                    const db = firebase.firestore();
                    
                    let docIDpreParse = document.getElementById('busNameHolder').innerHTML;

                    var parser = new DOMParser;
                    var dom = parser.parseFromString(
                        '<!doctype html><body>' + docIDpreParse,
                        'text/html');
                    var tagID = dom.body.textContent;

                    let docRef = db.collection("raiLeads").doc(tagID);
                    
                    let timeStamp = new Date();
            
                    let salesStatusChange = document.getElementById('salesStatusInput').value;

                    let assignChanger = document.getElementById('userInfo').innerHTML;
            
                    db.collection("raiLeads").doc(tagID).update({
                        ProductionStatusTime: firebase.firestore.FieldValue.arrayUnion(timeStamp),
                        ProductionStatusTrackChange: firebase.firestore.FieldValue.arrayUnion("Done" + ' ' + "changed on " + ' ' + timeStamp + ' ' + 'by' + ' ' + assignChanger),                     
                        ProductionStatus: "Done",

                        SalesStatusTime: firebase.firestore.FieldValue.arrayUnion(timeStamp),
                        SalesStatus: salesStatusChange,
                        SalesStatusTrackChange: firebase.firestore.FieldValue.arrayUnion(salesStatusChange + ' ' + "changed on " + ' ' + timeStamp + ' ' + 'by' + ' ' + assignChanger)
                    })
                    .then(function() {

                        console.log("Document successfully updated!");
                        document.getElementById('inputpMsg').innerHTML = '<strong>'+ "Document successfully saved!" + '</strong>' ;

                        db.collection("raiLeads").doc(tagID).get().then(function(doc) {
                            document.getElementById('customerContentpStatus').innerHTML = "<strong>p-Status: </strong> " + doc.data().ProductionStatus;
                            document.getElementById('customerContentSalesStatus').innerHTML = "<strong>Sales Status: </strong> " + doc.data().SalesStatus;

                        });
                     
                        
                    });
                };

                // ================================================================= edit button

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


                // =================================== Lead Genisis Input ============================================
                        function leadGenSubmit(){
                            const app = firebase.app();
                            const db = firebase.firestore();
                            const leadGenInput = document.getElementById("leadGenInfo").value;
                            const timestamp = snapshot.get('created_at');
                            const date = timestamp.toDate();

                            db.collection("raiLeads").doc(tagID).update({
                            LeadGen: leadGenInput,
                            LeadGenTime: firebase.firestore.FieldValue.arrayUnion(timeStamp + '  ' + leadGenInput)
                            }).then(function() {
                                console.log("Document successfully saved!");
                                document.getElementById('message').innerHTML = '<strong>'+ "Document successfully saved!" + '</strong>' ;
                                
                                document.getElementById("leadGenInfo").value = '';
                                document.getElementById("leadGenInfo").setAttribute('aria-hidden', 'true');
                                
                                location.reload();
                            }).catch(function(error) {
                                console.error("Error writing document: ", error);
                                document.getElementById('message-error').innerHTML = '<strong>'+ "Error writing document: ", error + '</strong>' ;
                                //document.getElementById("videoLinkIn").reset();
                                //nameEdit();

                            });
                        };

                        window.onclick = function(event) {
                            if (event.target == smallmodalLeadGen) {
                                smallmodalLeadGen.style.display = "none";
                            }
                        };



            
                        function urlSubmit(){
                            const docIDpreParse = document.getElementById('busNameHolder').innerHTML;
                            var parser = new DOMParser;
                            var dom = parser.parseFromString(
                                '<!doctype html><body>' + docIDpreParse,
                                'text/html');
                            var tagID = dom.body.textContent;
                            let link = document.getElementById('urlInfo').value;
                            const app = firebase.app();
                            const db = firebase.firestore();
                        
                            let docRef = db.collection("raiLeads").doc(tagID);
                        
                            let timeStamp = new Date();
                        
                            db.collection("raiLeads").doc(tagID).update({
                                VideoLink: link
                            })
                            .then(function() {
                                console.log("Document successfully updated!");
                                document.getElementById('urlInfo').value = '';

                                db.collection("raiLeads").doc(tagID).get().then(function(doc) {
                                document.getElementById('customerContentBusVideoLink').innerHTML = "<strong>Video Url: </strong>" + '<a>' + doc.data().VideoLink + '</a>';
                                });
                                
                                
                            });
                        };
                           