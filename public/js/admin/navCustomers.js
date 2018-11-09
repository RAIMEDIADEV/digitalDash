function navData(event){

    event.preventDefault();
    console.log('nav functioning');

    const app = firebase.app();
    const db = firebase.firestore();
    // const settings = {timestampsInSnapshots: true}; db.settings(settings);
   
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
      

  
      var body = document.getElementById("customerNav");


    var docRef = db.collection("raiLeads");
    
    var printRef = docRef.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                docId = doc.id;
                busName = doc.data().BusinessName;
                busScript = doc.data().ProductionStatus;

                
                if ((busScript === "Fresh") || (busScript === "Waiting on Script")){
                    navScriptNeeded = busName;
                
                let row = document.createElement("li");

                for (let j = 0; j < 1; j++) {
                        
                        let cell = document.createElement("div");
                        let cellText = document.createTextNode(navScriptNeeded);
                        cell.appendChild(cellText);
                        cell.setAttribute("id", navScriptNeeded)
                        cell.setAttribute("onClick", "scriptPage(this.id)")
                        row.appendChild(cell);
                        row.setAttribute("class", "rowSet");
                        row.setAttribute("style", "color: white;");
                        }
                      body.appendChild(row);
                }
                    else {
                        //console.log("doesnt have one");
                    }
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
                
            });
        }, 200);

    };