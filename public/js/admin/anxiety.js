document.addEventListener("DOMContentLoaded", event => { 
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
       .where('Status', '==', "Nothing") 
       .get()
       .then(snapshot => {
         snapshot.forEach(doc => {
           


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
                 cell.setAttribute("onclick", "customerContent(event)");
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
                 if ( (proStatus === 'Script Done') || (proStatus === 'Working on Voice') || (proStatus === 'Voice Done') || (proStatus === 'Working on Graphics') || (proStatus === 'Graphics Done') || (proStatus === 'Working on Editing') || (proStatus === 'Done')  ) {
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

                         body.appendChild(row);
                     });
                    
                 }).catch(err => {
                                     console.log('Error getting documents', err);
                 });

                }, 800);            




});