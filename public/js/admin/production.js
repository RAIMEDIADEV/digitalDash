document.addEventListener("DOMContentLoaded", event => { 

    // ======================================================================== AUTH CONTROL ==============================
    firebase.auth().onAuthStateChanged(firebaseUser => {
        const app = firebase.app();
                const db = firebase.firestore();
                const settings = {timestampsInSnapshots: true}; db.settings(settings);
                const userName = firebase.auth().currentUser.email;
                var docRef = db.collection("userProfiles").doc(userName);

                db.collection("userProfiles").doc(userName).get().then(function(doc) {
                loginTime = doc.data().LoginRecord[0];
                //moment.locale();    
                console.log(loginTime);
                });

                docRef.get().then(function(doc) {
                    document.getElementById('user').innerHTML = doc.data().userName;
                });

                let timeStamp = new Date();

                db.collection("userProfiles").doc(userName).update({
                    ActionRecord: firebase.firestore.FieldValue.arrayUnion(userName + ' was on production page on ' + timeStamp)
                });

                db.collection("userProfiles").doc('history').update({
                    Tracking: firebase.firestore.FieldValue.arrayUnion(userName + ' was on production page on ' + timeStamp)
                });

                docRef.get().then(function(doc) {

                    accessInfo = doc.data().Access;
                    

                    if(accessInfo === 'admin') {
                    console.log('You have permission');
                    } else if (accessInfo === 'production') {
                        
                        document.getElementById("adminHeaderNav").style.display = "none";
                        document.getElementById("adminNav").style.display = "none";
                    } else {
                        window.location.href = './404.html';
                    }
                });
            });
        });

    // ======================================================================== ROUTE CONTROL ==============================
               function productionHome(){
                document.getElementById("productionHTML").style.display="block";
                document.getElementById("customerInfo").style.display="none";
                document.getElementById("messageCard").style.display="none";
                document.getElementById("modification").style.display="block";
                
               };
               
               function customerInfo(){
                document.getElementById("modification").style.display="none";
                document.getElementById("customerInfo").style.display="block";
               };

    //======================================================================= CUSTOMER CONTENT ========================

                // ================================================================= edit button
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
                                document.getElementById('customerContentBusNotes').innerHTML = "<strong>Notes: </strong> " + doc.data().Notes;
                            });
                            document.getElementById('noteText').value = '';
                            
                        });

                };
                // ================================================================= refresh button
               function customerContentRefresh(){
                alert("What the hell are you clicking this for?")

                // function noteUpdate(){
                //     document.getElementById('notes').value = '';
                //     docRef.get().then(function(doc) {
                //             companyNotes = doc.data().Notes;
                //             document.getElementById('moreNotes').innerHTML = '<strong>' + " Notes: " + '</strong>' + '</br>'  + companyNotes;
                //     }).catch(function(error) {
                //             console.log('There was an error updating notes section.');
                //     });
                // };  
               };
                //======================================================================== showing customer info =========
               function customerContent(e) {

                document.getElementById("customerInfoCard").style.display="block";
                document.getElementById("modification").style.display="none";
                document.getElementById("allClient").style.display="none";

                let tagID = e;

                console.log(e);

                document.getElementById('customerContentBusName').innerHTML = e;

                const db = firebase.firestore();
                
                db.collection("raiLeads").doc(e).get().then(function(doc) {
                    document.getElementById('busNameHolder').innerHTML = doc.data().BusinessName;
                    document.getElementById('customerContentBusName').innerHTML = "<strong>Business Name: </strong> " + doc.data().BusinessName; 
                    document.getElementById('customerContentBusAdd').innerHTML = "<strong>Address: </strong> " + doc.data().BusinessAddress;
                    document.getElementById('customerContentBusEmail').innerHTML = "<strong>Email: </strong> " + doc.data().Email;
                    document.getElementById('customerContentBusContact').innerHTML = "<strong>Contact: </strong> " + doc.data().Contact;
                    document.getElementById('customerContentBusWeb').innerHTML = "<strong>Website: </strong>" +  doc.data().Website;
                    document.getElementById('customerContentBusVideoLink').innerHTML = `<iframe id="vidHref" style="width: 100%; height: 400px; border: none;">` +  doc.data().VideoLink + '</iframe>';
                    document.getElementById('vidHref').src = doc.data().VideoLink;
                    document.getElementById('customerContentBusNotes').innerHTML = "<strong>Notes: </strong> " + doc.data().Notes;
                    document.getElementById('customerContentBusWeb').href = doc.data().Website;
                    document.getElementById('customerContentBusVideoLink').href = doc.data().VideoLink;

                });
                };

            // ================================================================= PRODUCTION STATUS CHANGE =================

            function modalID(event){
                let tagID = event.currentTarget.id;
                console.log(tagID);
                let fatass = document.getElementById('urlCompanyTitle').innerHTML = tagID;
                console.log(fatass);

            };

            function changeProductionStatus(){
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
        
                var productionStatusChange = document.getElementById('statusPro').value;
        
                db.collection("raiLeads").doc(tagID).update({
                    ProductionStatusTime: firebase.firestore.FieldValue.arrayUnion(timeStamp),
                    ProductionStatus: productionStatusChange
                })
                .then(function() {
                    console.log("Document successfully updated!");
                    document.getElementById('inputMsg').innerHTML = '<strong>'+ "Document successfully saved!" + '</strong>' ;
                    document.getElementById("productionHTML").style.display="none";
                    document.getElementById("customerInfo").style.display="none";
                    document.getElementById("modification").style.display="block";
                    setTimeout(function(){
                        document.getElementById("productionHTML").style.display="block";
                }, 1000);
                    
                });
            };

            function urlID() {

                let tagID = document.getElementById('busNameHolder').innerHTML;
                document.getElementById("urlCompanyTitle").innerHTML = tagID;

                
                console.log(tagID);
            };

            function urlSubmit(){
                const docIDpreParse = document.getElementById('busNameHolder').innerHTML;
                var parser = new DOMParser;
                var dom = parser.parseFromString(
                    '<!doctype html><body>' + docIDpreParse,
                    'text/html');
                var tagID = dom.body.textContent;
                let link = document.getElementById('urlInput').value;
                const app = firebase.app();
                const db = firebase.firestore();
            
                let docRef = db.collection("raiLeads").doc(tagID);
            
                let timeStamp = new Date();
            
                db.collection("raiLeads").doc(tagID).update({
                    VideoLink: link
                })
                .then(function() {
                    console.log("Document successfully updated!");
                    location.reload();
                    document.getElementById('urlInfo').value = '';
                    
                });
            };


            function emailID() {

                let tagID = document.getElementById('busNameHolder').innerHTML;
                document.getElementById("urlCompanyTitle").innerHTML = tagID;

                
                console.log(tagID);
            };


            function emailSubmit(){
                const docIDpreParse = document.getElementById('busNameHolder').innerHTML;
                var parser = new DOMParser;
                var dom = parser.parseFromString(
                    '<!doctype html><body>' + docIDpreParse,
                    'text/html');
                var tagID = dom.body.textContent;
                let link = document.getElementById('emailInfo').value;
                const app = firebase.app();
                const db = firebase.firestore();
            
                let docRef = db.collection("raiLeads").doc(tagID);
            
                let timeStamp = new Date();
            
                db.collection("raiLeads").doc(tagID).update({
                    VideoLink: link
                })
                .then(function() {
                    console.log("Document successfully updated!");
                    location.reload();
                    document.getElementById('emailInfo').value = '';
                    
                });
            };
               
               //============================================= Production Data Call =======================================
               document.addEventListener("DOMContentLoaded", event => { 
               //function proInfo(){

                //document.getElementById("productionHTML").style.display="block";

                const app = firebase.app();
                const db = firebase.firestore();
                const settings = {timestampsInSnapshots: true}; db.settings(settings);
                var raiRef = db.collection("raiLeads");

                db.collection("raiLeads").get().then(function(querySnapshot) {
                     querySnapshot.forEach(function(doc) {
                         
                         var raiTotal = (doc.id, " => ", doc.data());
                        
                     });
                 });
                 setTimeout(function generate_table(nTotal) {
                 var raiLeads = db.collection('raiLeads');
                 var query = raiLeads
                   .where('Status', '==', "Production") 
               
                   .get()
                   .then(snapshot => {
                     snapshot.forEach(doc => {
                       //console.log(doc.id, '=>', doc.data());
         
         
                     var body = document.getElementById("production-data-table");
                     var docRef = db.collection("raiLeads");
                     var tblBody = document.createElement("tbody");
                     var row = document.createElement("tr");
                     const proStatus = doc.data().ProductionStatus;
                     row.setAttribute("class", "rowSet");
                     row.setAttribute("id", doc.data().BusinessName);
                     row.setAttribute("onclick", "sendRowId(this.id)")


                        // =================================== COMPANY NAME  ============================================
         
                       for (var j = 0; j < 1; j++) {
                             var cell = document.createElement("td");
                             var cellText = document.createTextNode(doc.data().BusinessName);
                             cell.setAttribute("id", doc.data().BusinessName);
                             cell.setAttribute("onclick", "customerContent(this.id)");
                             cell.appendChild(cellText);
                             row.appendChild(cell);
                            
                             }

                        // =================================== Status ============================================
                                     for (var j = 0; j < 1; j++) {
                                               var cell = document.createElement("td");
                                               var cellText = document.createTextNode(doc.data().ProductionStatus);
                                                cell.setAttribute("data-target", "#smallmodal")
                                                cell.setAttribute("data-toggle", "modal")
                                                cell.setAttribute("id", doc.data().BusinessName)
                                                cell.setAttribute("onclick", "modalID(event)" )
                                               cell.appendChild(cellText);
                                               row.appendChild(cell);
                                             }
         
                         // =================================== Script ============================================
                         for (var j = 0; j < 1; j++) {
                             if ( (proStatus === 'Script Done') || (proStatus === 'Working on Voice') || (proStatus === 'Voice Done') || (proStatus === 'Working on Graphics') || (proStatus === 'Graphics Done') || (proStatus === 'Working on Editing') || (proStatus === 'Editing Done')  ) {
                                 var cell = document.createElement("td");
                                 var cellText = document.createTextNode('');
                             cell.setAttribute("data-target", "#colorCheck")
                             cell.setAttribute("data-toggle", "modal")
                             cell.appendChild(cellText);
                             cell.setAttribute("onclick", "scriptFunk(this.id)");
                             cell.setAttribute("id", "Script");
                                 row.appendChild(cell);
                             } else if (proStatus === 'Working on Script') {
                                     var cell = document.createElement("td");
                                     var cellText = document.createTextNode('');
                                     cell.setAttribute("data-target", "#colorCheck")
                                     cell.setAttribute("data-toggle", "modal")
                                     cell.appendChild(cellText);
                                     cell.setAttribute("onclick", "scriptFunk(this.id)");
                                     cell.setAttribute("id", "Script");
                                     cell.setAttribute('style', 'font-size: 14px;');
                                     cell.setAttribute("style", 'background-color: rgb(233, 230, 87)');
                                     row.appendChild(cell);
                             } else {
                                    var cell = document.createElement("td");
                                     var cellText = document.createTextNode('');
                                     cell.setAttribute("data-target", "#colorCheck")
                                     cell.setAttribute("data-toggle", "modal")
                                     cell.appendChild(cellText);
                                     cell.setAttribute("onclick", "scriptFunk(this.id)");
                                     cell.setAttribute("id", "Script");
                                     cell.setAttribute('style', 'font-size: 14px;');
                                     cell.setAttribute("style", 'background-color: rgb(247, 93, 88);');
                                     row.appendChild(cell);
                                 }
                             }
                             // =================================== VoiceOver ============================================
                             for (var j = 0; j < 1; j++) {
                                 if ( (proStatus === 'Voice Done') || (proStatus === 'Working on Graphics') || (proStatus === 'Graphics Done') || (proStatus === 'Working on Editing') || (proStatus === 'Editing Done')  ) {
                                     var cell = document.createElement("td");
                                     var cellText = document.createTextNode('');
                                    //  cell.setAttribute("style", 'background-color: rgb(110, 255, 105);');
                                    cell.setAttribute("data-target", "#colorCheck")
                                    cell.setAttribute("data-toggle", "modal")
                                    cell.appendChild(cellText);
                                    cell.setAttribute("onclick", "scriptFunk(this.id)");
                                    cell.setAttribute("id", "Voice");
                                     cell.setAttribute("id", "Voice");
                                     row.appendChild(cell);
                                 } else if (proStatus === 'Working on Voice') {
                                         var cell = document.createElement("td");
                                         var cellText = document.createTextNode('');
                                         cell.setAttribute("data-target", "#colorCheck")
                                         cell.setAttribute("data-toggle", "modal")
                                         cell.appendChild(cellText);
                                         cell.setAttribute("onclick", "scriptFunk(this.id)");
                                         cell.setAttribute("id", "Voice");
                                         cell.setAttribute('style', 'font-size: 14px;');
                                         cell.setAttribute("style", 'background-color: rgb(233, 230, 87)');
                                         row.appendChild(cell);
                                 } else {
                                     var cell = document.createElement("td");
                                         var cellText = document.createTextNode('');
                                         cell.setAttribute("data-target", "#colorCheck")
                                         cell.setAttribute("data-toggle", "modal")
                                         cell.appendChild(cellText);
                                         cell.setAttribute("onclick", "scriptFunk(this.id)");
                                         cell.setAttribute("id", "Voice");
                                         cell.setAttribute('style', 'font-size: 14px;');
                                         cell.setAttribute("style", 'background-color: rgb(247, 93, 88);');
                                         row.appendChild(cell);
                                 }
                                     }

                                 // =================================== GRAPHICS ============================================
                                 for (var j = 0; j < 1; j++) {
                                    if (  (proStatus === 'Graphics Done') || (proStatus === 'Working on Editing') || (proStatus === 'Editing Done')  ) {
                                        var cell = document.createElement("td");
                                        var cellText = document.createTextNode('');
                                        // cell.setAttribute("style", 'background-color: rgb(110, 255, 105);');
                                        cell.appendChild(cellText);
                                        cell.setAttribute("id", "Graphics");
                                        row.appendChild(cell);
                                    } else if (proStatus === 'Working on Graphics') {
                                            var cell = document.createElement("td");
                                            var cellText = document.createTextNode('');
                                            cell.setAttribute("data-target", "#colorCheck")
                                            cell.setAttribute("data-toggle", "modal")
                                            cell.appendChild(cellText);
                                            cell.setAttribute("onclick", "scriptFunk(this.id)");
                                            cell.setAttribute("id", "Graphics");
                                            cell.setAttribute('style', 'font-size: 14px;');
                                            cell.setAttribute("style", 'background-color: rgb(233, 230, 87)');
                                            row.appendChild(cell);
                                    } else {
                                        var cell = document.createElement("td");
                                            var cellText = document.createTextNode('');
                                            cell.setAttribute("data-target", "#colorCheck")
                                            cell.setAttribute("data-toggle", "modal")
                                            cell.appendChild(cellText);
                                            cell.setAttribute("onclick", "scriptFunk(this.id)");
                                            cell.setAttribute("id", "Graphics");
                                            cell.setAttribute('style', 'font-size: 14px;');
                                            cell.setAttribute("style", 'background-color: rgb(247, 93, 88);');
                                            row.appendChild(cell);
                                    }
                                        }
                                 // =================================== Editing ============================================
                                 for (var j = 0; j < 1; j++) {
                                     if  (proStatus === 'Editing Done') {
                                         var cell = document.createElement("td");
                                         var cellText = document.createTextNode('');
                                        //  cell.setAttribute("style", 'background-color: rgb(110, 255, 105);');
                                         cell.appendChild(cellText);
                                         cell.setAttribute("id", "Editing");
                                         row.appendChild(cell);
                                     } else if (proStatus === 'Working on Editing') {
                                             var cell = document.createElement("td");
                                             var cellText = document.createTextNode('');
                                             cell.setAttribute("data-target", "#colorCheck")
                                             cell.setAttribute("data-toggle", "modal")
                                             cell.appendChild(cellText);
                                             cell.setAttribute("onclick", "scriptFunk(this.id)");
                                             cell.setAttribute("id", "Editing");
                                             cell.setAttribute('style', 'font-size: 14px;');
                                             cell.setAttribute("style", 'background-color: rgb(233, 230, 87)');
                                             row.appendChild(cell);
                                     } else {
                                         var cell = document.createElement("td");
                                             var cellText = document.createTextNode('');
                                             cell.setAttribute("data-target", "#colorCheck")
                                             cell.setAttribute("data-toggle", "modal")
                                             cell.appendChild(cellText);
                                             cell.setAttribute("onclick", "scriptFunk(this.id)");
                                             cell.setAttribute("id", "Editing");
                                             cell.setAttribute('style', 'font-size: 14px;');
                                             cell.setAttribute("style", 'background-color: rgb(247, 93, 88);');
                                             row.appendChild(cell);
                                     }
                                         }

                                     // =================================== Video Link ============================================
                                    //  for (var j = 0; j < 1; j++) {
                                    //           
         
                                    //              if( !doc.data().VideoLink ) {
                                    //                  var cell = document.createElement("td");
                                    //                    var cellText = document.createTextNode('false');
                                    //                    cell.appendChild(cellText);
                                    //                     cell.setAttribute("data-target", "#urlModal");
                                    //                     cell.setAttribute("data-toggle", "modal");
                                    //                    cell.setAttribute("onclick", "urlID(event)");
                                    //                    cell.setAttribute("id", doc.data().BusinessName);
                                    //                    row.appendChild(cell);
                                    //              } else {
                                    //                  var cell = document.createElement("td");
                                    //                  var aCell = document.createElement("a");
                                    //                    var cellText = document.createTextNode('True');
                                    //                    cell.appendChild(aCell);
                                    //                  aCell.appendChild(cellText);
                                    //                  cell.setAttribute('style', 'font-size: 14px;');
                                    //                  aCell.setAttribute('href', doc.data().VideoLink);
                                    //                  aCell.setAttribute('style', 'color: green;');
                                    //                    row.appendChild(cell);
                                    //              }
                                         
                                    //  }
         
                                     body.appendChild(row);
                                 });
                                
                             }).catch(err => {
                                                 console.log('Error getting documents', err);
                             });

                            }, 800);            
            //};
        });




        function allFV(){ 
            document.getElementById('main').style.display = "none";
            document.getElementById('productionHTML').style.display = "none";
            document.getElementById('allClient').style.display = "block";



            
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
                                row.setAttribute("onclick", "customerContent(this.id)");
                                
                                
    
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
                

            };