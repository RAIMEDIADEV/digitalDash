// ======================================================= ONSCREEN LOAD ASSIGN Content ======================================================


document.addEventListener("DOMContentLoaded", event => {

    
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

    

    
setTimeout(function generate_table() {

      var totalUse = globalVariables.count;
      var businessNames = globalVariables.bNames;
      
          
    key = [];

  
      var body = document.getElementById("bootstrap-data-table-assign");


    var docRef = db.collection("raiLeads");
    
    var raiLeads = db.collection('raiLeads');
                 var query = raiLeads
                   .where('SalesStatus', '==', "New").orderBy("DaysInSales")
                   .get()
                   .then(snapshot => {
                     snapshot.forEach(doc => {
                let docNumbers = snapshot.docs.length;
                docId = doc.id;
                busName = doc.data().BusinessName;
                companyContact = doc.data().Contact;
                let int = doc.data().ProductionStatusTime.length;
                let d = int - 1;
                let strPsT = doc.data().ProductionStatusTime[d].seconds * 1000;
                var inHouse = doc.data().RadioOrderDate.seconds * 1000;
                let wanted = new Date(strPsT);
                let str = String(wanted);
                var dateEmailed = str.slice(3, 15);

                var oneDay = 24*60*60*1000; 
                var g = new Date();
                var msec1 = Date.parse(g);
                var daysInHouse = Math.round(Math.abs(inHouse - msec1)/(oneDay)); 
                var daysInSales = Math.round(Math.abs(msec1 - strPsT)/(oneDay));

                var text = "";
                
                leadGen = doc.data().LeadGen;
              
                companyEmail = doc.data().Email;
                companyNotes = doc.data().Notes;
                globalVariables.busData = busName;

            
                const tblBody = document.createElement("tbody");


                const row = document.createElement("tr");
                row.setAttribute("id", busName)
                row.setAttribute('class','rowSet');

                //console.log(doc.data() + i);
               
                
                for (i = 0;  i < 1; i++) {
       
               
                            var cell = document.createElement("td");
                            var cellText = document.createTextNode(key++);
                            cell.setAttribute("style", "width: 15px;");
                            cell.appendChild(cellText);
                            row.appendChild(cell);
                        
                    
                        }
       

                for (var j = 0; j < 1; j++) {
                        
                          var cell1 = document.createElement("div");
                          var cell2 = document.createElement("input");
                          cell1.appendChild(cell2);
                        cell1.setAttribute("class", "form-check");
                        cell2.setAttribute("name", "employee");
                        //cell1.setAttribute("style", "margin-left: 65px;");
                        cell1.setAttribute("style", "margin-left: 35px; margin-top: 15px;");
           
                          row.appendChild(cell1);
                        cell2.setAttribute("class", "form-check-input");
                        cell2.setAttribute("id", "myCheck");
                        cell2.setAttribute("type", "checkbox");
                        cell2.setAttribute("value", busName);
                        
                        // <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked></input>
                        }

                    for (var j = 0; j < 1; j++) {
                  
                              var cell = document.createElement("td");
                              var cellText = document.createTextNode(busName);
                              cell.appendChild(cellText);
                              row.appendChild(cell);
                            }

                        for (var j = 0; j < 1; j++) {
                            
                                  var cell = document.createElement("td");
                                  var cellText = document.createTextNode(leadGen);
                                  cell.appendChild(cellText);
                                  row.appendChild(cell);
                                }

                        

                            for (var j = 0; j < 1; j++) {
                                    
                                      var cell = document.createElement("td");
                                      var cellText = document.createTextNode(dateEmailed);
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


});


// ======================================================= ASSIGN CUSTOMERS to Sales REP ======================================================

function assignClick(){

    const salesRep = document.getElementById("salesRep").value;

    console.log(salesRep);


    var coffee = document.forms[0];
    var text = "";
    var txt = "";
    var i;
    var tmp = 0;

    for (i = 0; i < coffee.length; i++) {

        if (coffee[i].checked) {
            txt = txt + coffee[i].value + ',';
            tmp++
            //tmpArr.push(i);

        } else {

        }
        
    }
    var arr = txt.split(",");
    let count = tmp;


    var timeStamp = new Date();



    for (i = 0; i < count; i++) {

        let salesAssign = arr[i];
        console.log(salesAssign);
        let assignChanger = document.getElementById('userInfo').innerHTML;

        const db = firebase.firestore();
        db.collection('sales').doc(salesRep).update({
            SalesRepAssigned: "assigned to " + salesRep,
            LeadBusName: firebase.firestore.FieldValue.arrayUnion(salesAssign),
            LeadBusNameTime: firebase.firestore.FieldValue.arrayUnion(timeStamp)
            
            }).then(function() {
                console.log("Message successfully sent!");
                document.getElementById("successMsg").style.display="block";
                //document.getElementById('messageNoteContent').value = '';

                setTimeout(function () {
                window.location.reload(true);
                }, 200);
        
            }).catch(function(error) {
                console.error("Error sending message: ", error);
                // window.location.reload(true);
            });

                db.collection('raiLeads').doc(salesAssign).update({
                    SalesStatus: "Assigned",
                    SalesRepAssign: salesRep,
                    SalesRepAssignTime: timeStamp,
                    SalesStatusTrackChange: firebase.firestore.FieldValue.arrayUnion("Assigned" + ' ' + "to " + salesRep + ' ' + timeStamp + ' ' + 'by' + ' ' + assignChanger)

                });
    }

};




function businessNameOrg(){
const app = firebase.app();
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true}; db.settings(settings);
console.log('inNew function');

document.getElementById("assignSection").style.display = "none";
document.getElementById("assignSectionNameOrg").style.display = "block";

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




setTimeout(function generate_table() {

  var totalUse = globalVariables.count;
  var businessNames = globalVariables.bNames;
  
      console.log('1');
keys = [];


  var body = document.getElementById("organizedByName");


var docRef = db.collection("raiLeads");

var raiLeads = db.collection('raiLeads');
             var query = raiLeads
               .where('SalesStatus', '==', "New").orderBy("BusinessName")
               .get()
               .then(snapshot => {
                 snapshot.forEach(doc => {
            let docNumbers = snapshot.docs.length;
            docId = doc.id;
            busName = doc.data().BusinessName;
            companyContact = doc.data().Contact;
            let int = doc.data().ProductionStatusTime.length;
            let d = int - 1;
            let strPsT = doc.data().ProductionStatusTime[d].seconds * 1000;
            var inHouse = doc.data().RadioOrderDate.seconds * 1000;
            let wanted = new Date(strPsT);
            let str = String(wanted);
            var dateEmailed = str.slice(3, 15);

            var oneDay = 24*60*60*1000; 
            var g = new Date();
            var msec1 = Date.parse(g);
            var daysInHouse = Math.round(Math.abs(inHouse - msec1)/(oneDay)); 
            var daysInSales = Math.round(Math.abs(msec1 - strPsT)/(oneDay));

            var text = "";
            
            leadGen = doc.data().LeadGen;
          
            companyEmail = doc.data().Email;
            companyNotes = doc.data().Notes;
            globalVariables.busData = busName;

          




            const row = document.createElement("tr");
            row.setAttribute("id", busName)
            row.setAttribute('class','rowSet');

            //console.log(doc.data() + i);
           
            
            for (i = 0;  i < 1; i++) {
   
           
                        var cell = document.createElement("td");
                        var cellText = document.createTextNode(keys++);
                        cell.setAttribute("style", "width: 15px;");
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                    
                
                    }
   

            for (var j = 0; j < 1; j++) {
                    
                      var cell1 = document.createElement("div");
                      var cell2 = document.createElement("input");
                      cell1.appendChild(cell2);
                    cell1.setAttribute("class", "form-check");
                    cell2.setAttribute("name", "employee");
        
                    cell1.setAttribute("style", "margin-left: 35px; margin-top: 15px;");
       
                      row.appendChild(cell1);
                    cell2.setAttribute("class", "form-check-input");
                    cell2.setAttribute("id", "myCheck");
                    cell2.setAttribute("type", "checkbox");
                    cell2.setAttribute("value", busName);
                    
                    }

                for (var j = 0; j < 1; j++) {
              
                          var cell = document.createElement("td");
                          var cellText = document.createTextNode(busName);
                          cell.appendChild(cellText);
                          row.appendChild(cell);
                        }

                    for (var j = 0; j < 1; j++) {
                        
                              var cell = document.createElement("td");
                              var cellText = document.createTextNode(leadGen);
                              cell.appendChild(cellText);
                              row.appendChild(cell);
                            }

                    

                        for (var j = 0; j < 1; j++) {
                                
                                  var cell = document.createElement("td");
                                  var cellText = document.createTextNode(dateEmailed);
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