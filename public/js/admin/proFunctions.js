            //================================================================ PRODUCTION MODIFICATION FUNCTIONS ==============================================

            function scriptFunk(id){
                colID = id; 
            };

            function sendRowId(row){
                col = document.getElementById('task').innerHTML = colID;
                console.log(row);
                tagID = row; 
            };

            //============================================================================= WORKING FUNCTION========================
            function working(){
                
                const app = firebase.app();
                const db = firebase.firestore();

                var docRef = db.collection("raiLeads").doc(tagID);

                let timeStamp = new Date();

                let productionStatusChange = "Working on" + ' ' + col;
                console.log(productionStatusChange);


                console.log(col);
                console.log(tagID);

                db.collection("raiLeads").doc(tagID).update({
                    ProductionStatusTime: firebase.firestore.FieldValue.arrayUnion(timeStamp),
                    ProductionStatus: productionStatusChange
                })
                .then(function() {

                    document.getElementById('task').style.backgroundColor = "yellow";

                    setTimeout(function(){
                        document.getElementById("productionHTML").style.display="block";
                }, 1000);
                    
                });


                function reload(){
                    var container = document.getElementById(colID);
                    console.log(container);
                    var content = container.innerHTML;
                    container.innerHTML= content; 
                    console.log("Refreshed"); 
                };



                setTimeout(function () {
                    location.reload();
            }, 200);
            };

            //============================================================================= DONE FUNCTION========================
            function done(){
                
                const app = firebase.app();
                const db = firebase.firestore();

                var docRef = db.collection("raiLeads").doc(tagID);

                let timeStamp = new Date();

                let productionStatusChange = col + ' ' + "Done";
                console.log(productionStatusChange);


                console.log(col);
                console.log(tagID);

                db.collection("raiLeads").doc(tagID).update({
                    ProductionStatusTime: firebase.firestore.FieldValue.arrayUnion(timeStamp),
                    ProductionStatus: productionStatusChange
                })
                .then(function() {

                    setTimeout(function(){
                        document.getElementById("productionHTML").style.display="block";
                }, 1000);
                    
                });


                function reload(){
                    var container = document.getElementById(colID);
                    var content = container.innerHTML;
                    container.innerHTML= content; 
                    console.log("Refreshed"); 
                };



                setTimeout(function () {
                    location.reload();
                }, 200);
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
                    ProductionStatus: productionStatusChange,
                })
                .then(function() {
                    console.log("Document successfully updated!");
                    document.getElementById('inputMsg').innerHTML = '<strong>'+ "Document successfully saved!" + '</strong>' ;
                        setTimeout(function () {
                            location.reload();
                    }, 300);
                    
                });
            };