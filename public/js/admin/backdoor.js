document.addEventListener("DOMContentLoaded", event => { 

    // ======================================================================== AUTH CONTROL ==============================
    firebase.auth().onAuthStateChanged(firebaseUser => {
        const app = firebase.app();
                const db = firebase.firestore();
                // const settings = {timestampsInSnapshots: true}; db.settings(settings);
                const userName = firebase.auth().currentUser.email;
                var docRef = db.collection("userProfiles").doc(userName);
        const timeStamp = new Date();
                console.log(userName);

                docRef.get().then(function(doc) {
                    document.getElementById('userInfo').innerHTML = doc.data().userName;
                });
    
                db.collection("userProfiles").doc(userName).update({
                    ActionRecord: firebase.firestore.FieldValue.arrayUnion(userName + ' was on backdoor page on ' + timeStamp)
                });

                db.collection("userProfiles").doc('history').update({
                    Tracking: firebase.firestore.FieldValue.arrayUnion(userName + ' was on backdoor page on ' + timeStamp)
                });

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




});



document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();
    const db = firebase.firestore();
    // const settings = {timestampsInSnapshots: true}; db.settings(settings);

   
    db.collection('raiLeads').get().then(
        (snapshot) => console.log('There are ' + snapshot.docs.length + ' docs loaded.')  
    );

    var globalVariables = {};
    setTimeout(function () {
    var body = document.getElementById("clientSelect");
    var raiLeads = db.collection('raiLeads');
        raiLeads.get().then(snapshot => { snapshot.forEach(doc => {
                                            docId = doc.id;
                                            busName = doc.data().BusinessName;
                                            globalVariables.busData = busName;
                                            const option = document.createElement("option");
                                            //option.setAttribute("id", busName);
                                            option.setAttribute('value', busName);
                                            option.setAttribute('class','optionSet');
                                                                                        for (var j = 0; j < 1; j++) {
                                                                                                  var cell = document.createTextNode(busName);
                                                                                                  option.appendChild(cell);
                                                                                        } 
                                                                                         body.appendChild(option);
                                                                                        });
                    }).catch(err => {
                    console.log('Error getting documents', err);
                    });
    }, 1000);

});

function timeRun(){

    const client = document.getElementById("clientSelect").value;
    console.log(client);

    const db = firebase.firestore();
    
    db.collection("raiLeads").doc(client).get().then(function(doc) {

 //===================================================================================== IN HOUSE
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var inHouse = doc.data().RadioOrderDate.seconds * 1000;
    var d = new Date();
    var msec1 = Date.parse(d);

     var daysInHouse = Math.round(Math.abs(inHouse - msec1)/(oneDay)); 

         //===================================================================================== PRODUCTION

    let int = doc.data().ProductionStatusTime.length;
    let newInt = int - 1;
    let proStart = doc.data().ProductionStatusTime[0].seconds * 1000;
    let strPsT = doc.data().ProductionStatusTime[newInt].seconds * 1000;

    var daysInPro = Math.round(Math.abs(strPsT - proStart)/(oneDay));



    //===================================================================================== PRODUCTION

    var daysInSales = Math.round(Math.abs(msec1 - strPsT)/(oneDay));


    //=================================================================================

     gV.inHouseMove = daysInHouse;
     gV.inProMove = daysInPro;
     gV.inSalesMove = daysInSales;


    });
    const gV = {};

    setTimeout(function() {
        db.collection('raiLeads').doc(client).update({
            DaysInHouse: gV.inHouseMove,
            DaysInPro: gV.inProMove,
            DaysInSales: gV.inSalesMove
        });

    }, 500);
};

function reset(client){
    document.getElementById('clickValid').innerHTML = 'reset';
    var parent = document.getElementById("customerInfoCard");
    var child = document.getElementById("customerInfoCardChild");
    parent.removeChild(child);
    findClientInfo(client);
};

function findClientInfo(){

    const valid = document.getElementById('clickValid').innerHTML;
    if (valid == 'valid'){
    reset(e);
    } else {


    const client = document.getElementById("clientSelect").value;
    document.getElementById('clientCardContainer').style.display = "block";

    const db = firebase.firestore();
    
    db.collection("raiLeads").doc(client).get().then(function(doc) {

 //===================================================================================== IN HOUSE
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var inHouse = doc.data().RadioOrderDate.seconds * 1000;
    var d = new Date();
    var msec1 = Date.parse(d);

     var daysInHouse = Math.round(Math.abs(inHouse - msec1)/(oneDay)); 

         //===================================================================================== PRODUCTION

    let int = doc.data().ProductionStatusTime.length;
    let newInt = int - 1;
    let proStart = doc.data().ProductionStatusTime[0].seconds * 1000;
    let strPsT = doc.data().ProductionStatusTime[newInt].seconds * 1000;

    var daysInPro = Math.round(Math.abs(strPsT - proStart)/(oneDay));



    //===================================================================================== PRODUCTION

    var daysInSales = Math.round(Math.abs(msec1 - strPsT)/(oneDay));


    //=================================================================================

     gV.inHouseMove = daysInHouse;
     gV.inProMove = daysInPro;
     gV.inSalesMove = daysInSales;


    });
    const gV = {};

    setTimeout(function() {
        db.collection('raiLeads').doc(client).update({
            DaysInHouse: gV.inHouseMove,
            DaysInPro: gV.inProMove,
            DaysInSales: gV.inSalesMove
        });

    }, 500);


    setTimeout(function() {

    db.collection("raiLeads").doc(client).get().then(function(doc) {
        document.getElementById('busNameHolder').innerHTML = doc.data().BusinessName;
        document.getElementById('customerContentBusName').innerHTML = "<strong>Business Name: </strong> " + doc.data().BusinessName; 
        document.getElementById('customerContentBusAdd').innerHTML = "<strong>Address: </strong> " + doc.data().BusinessAddress;
        document.getElementById('customerContentBusEmail').innerHTML = "<strong>Email: </strong> " + doc.data().Email;
        document.getElementById('customerContentBusContact').innerHTML = "<strong>Contact: </strong> " + doc.data().Contact;
        document.getElementById('customerContentBusPhone').innerHTML = "<strong>Phone: </strong> " + doc.data().Phone;
        document.getElementById('leadGen').innerHTML = "<strong>Lead Genisis: </strong> " + doc.data().LeadGen;
        document.getElementById('customerContentBusWeb').innerHTML = "<strong>Website: </strong>" +  doc.data().Website;
        document.getElementById('customerContentBusVideoLink').innerHTML = "<strong>Video Url: </strong>" +  doc.data().VideoLink;
        // document.getElementById('customerContentBusNotes').innerHTML = "<strong>Notes: </strong> " + doc.data().Notes;
        document.getElementById('customerContentStatus').innerHTML = "<strong>Status: </strong> " +  doc.data().Status;
        document.getElementById('customerContentpStatus').innerHTML = "<strong>P Status: </strong> " + doc.data().ProductionStatus;
        document.getElementById('contactStatus').innerHTML = "<strong>Contact Status: </strong> " + doc.data().ContactStatus;
        document.getElementById('dateEmailed').innerHTML = "<strong>Date Emailed: </strong> " + new Date(doc.data().ContactStatusTime[0].seconds * 1000);
        document.getElementById('SalesStatus').innerHTML = "<strong>Sales Status: </strong> " + doc.data().SalesStatus;
        let tDate = doc.data().Time.seconds * 1000;
        let newTimeFormat = new Date(tDate);
        document.getElementById('customerContentpDateTimeCreated').innerHTML = "<strong>Date.Time: </strong> " + newTimeFormat;

        document.getElementById('radioAmount').innerHTML = "<strong>Radio Order Amount: </strong> " + '$' + "<span id='rAmount'>" + doc.data().RadioOrderAmount + '</span>';

        let rDate = doc.data().RadioOrderDate.seconds * 1000;
        let newRadioDateFormat = new Date(rDate);
        document.getElementById('radioDate').innerHTML = "<strong>Radio Order Date: </strong> " + newRadioDateFormat;
        document.getElementById('radioOrderNumber').innerHTML = "<strong>Radio Order Number: </strong> " + "<span id='rNumber'>" + doc.data().RadioOrderNumber + '</span>';
        
        
        document.getElementById('timeInHouse').innerHTML = "<strong>In house: </strong> " + doc.data().DaysInHouse + " days";
        document.getElementById('timeInProduction').innerHTML = "<strong>In production: </strong> " + doc.data().DaysInPro + " days";
        document.getElementById('timeInSales').innerHTML = "<strong>In sales: </strong> " + doc.data().DaysInSales + " days";

        document.getElementById('customerContentBusWeb').href = doc.data().Website;
        document.getElementById('customerContentBusVideoLink').href = doc.data().VideoLink;

        document.getElementById('salesStatusChanges').innerHTML = "<strong>Sales Track: </strong> " + doc.data().SalesStatusChangeTrack;
        document.getElementById('houseStatusChanges').innerHTML = "<strong>House Track: </strong> " + doc.data().StatusChangeTrack;
        document.getElementById('contactStatusChanges').innerHTML = "<strong>Contact Track: </strong> " + doc.data().ContactStatusTrackChange;




    });








    db.collection("raiLeads").doc(client).get().then(function(doc) {
        var body = document.getElementById("customerContentBusNotes");
        const row = document.createElement("ul");
        row.setAttribute('class', "list-group");
        row.setAttribute('id', "noteRow");

        const note = doc.data().Notes;
        const noteT = doc.data().NoteTime;
        

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
            cell.setAttribute("id", 'noteParent');
            cell.setAttribute("style", 'color: grey;');
            cell.setAttribute("style", 'font-size: 12px;');
            cell2.appendChild(cellText);
            cell.appendChild(cell2);
            
            cell.appendChild(timeDate);
            row.appendChild(cell);
            
 
        }

        body.appendChild(row);

        });

        

    }, 1000);

}
};

// need to build a loop (or if/else) function that checks what KEY to sort by - variable KEY:VALUE not working in object. 



function changeClientInfo(SalesStatus, radioOrderDateYear, radioOrderDateMonth, radioOrderDateDay, RadioOrderNumber){
    const docIDpreParse = document.getElementById('busNameHolder').innerHTML;
    var parser = new DOMParser;
    var dom = parser.parseFromString(
        '<!doctype html><body>' + docIDpreParse,
        'text/html');
    var docID = dom.body.textContent;
    const salesStatus = SalesStatus.value;
    const radioOrderAmount = RadioOrderAmount.value;
    const year = radioOrderDateYear.value;
    const month = radioOrderDateMonth.value;
    const monthFormat = month - 01; 
    const day = radioOrderDateDay.value;
    var d = new Date(year, monthFormat, day);
    //const date = d.toString();

    const radioOrderNumber = RadioOrderNumber.value;
    const db = firebase.firestore();
    const timeStamp = new Date();

    setTimeout(function(field){
    db.collection("raiLeads").doc(docID).update({
        SalesStatus: salesStatus,
        RadioOrderAmount: radioOrderAmount,
        RadioOrderDate: d,
        RadioOrderNumber: radioOrderNumber
        
        }).then(function() {
            console.log("Message successfully sent!");
            document.getElementById("successMsg").style.display="block";
            setTimeout(function () {
                document.getElementById("successMsg").style.display="none";
                findClientInfo();
            }, 1000);
    
        });

    }, 1000);


};

function productionDoneDate(){
    const docIDpreParse = document.getElementById('busNameHolder').innerHTML;
    var parser = new DOMParser;
    var dom = parser.parseFromString(
        '<!doctype html><body>' + docIDpreParse,
        'text/html');
    var docID = dom.body.textContent;
    const year = productionDoneYear.value;
    const month = productionDoneMonth.value;
    const monthFormat = month - 01; 
    const day = productionDoneDay.value;
    var d = new Date(year, monthFormat, day);
    const db = firebase.firestore();
    const timeStamp = new Date();

    setTimeout(function(field){
    db.collection("raiLeads").doc(docID).update({
        ProductionStatusTime: firebase.firestore.FieldValue.arrayUnion(d)
        
        }).then(function() {
            console.log("Message successfully sent!");
            document.getElementById("successMsg").style.display="block";
            setTimeout(function () {
                document.getElementById("successMsg").style.display="none";
                findClientInfo();
            }, 1000);
    
        });

    }, 1000);

};

function submitCStatus(){
    console.log('in the funk');
    const docIDpreParse = document.getElementById('busNameHolder').innerHTML;
    const parser = new DOMParser;
    const dom = parser.parseFromString(
        '<!doctype html><body>' + docIDpreParse,
        'text/html');
    const docID = dom.body.textContent;
    const cStatus = document.getElementById('cStatusSelect').value;
    let userNameChanger = document.getElementById('userInfo').innerHTML;

    const db = firebase.firestore();
    const timeStamp = new Date();

    setTimeout(function(field){
    db.collection("raiLeads").doc(docID).update({
        ContactStatus: cStatus,
        ContactStatusTime: firebase.firestore.FieldValue.arrayUnion(timeStamp),
        ContactStatusTrackChange: firebase.firestore.FieldValue.arrayUnion(userNameChanger + ' ' + "changed" + ' ' + cStatus + ' ' + 'on' + ' ' + timeStamp)
        
        }).then(function() {
            console.log("Message successfully sent!");
            document.getElementById("successMsg").style.display="block";
            setTimeout(function () {
                document.getElementById("successMsg").style.display="none";
                findClientInfo();
            }, 1000);
    
        });

    }, 1000);

};



function change(e){

    const docIDpreParse = document.getElementById('busNameHolder').innerHTML;
    const parser = new DOMParser;
    const dom = parser.parseFromString(
        '<!doctype html><body>' + docIDpreParse,
        'text/html');
    const docID = dom.body.textContent;

    if (e == 'customerContentStatus'){
        if (document.getElementById('modalLabel').innerHTML === 'House Status'){
            body.removeChild(select);
        } else {
        document.getElementById('modalLabel').innerHTML = "House Status";
        var body = document.getElementById("modalBody");
        const select = document.createElement("select");
        select.setAttribute('id',"modalCreated");
        const optionSales = document.createElement("option");
        const optionMarketing = document.createElement("option");
        select.setAttribute('class',"custom-select")
        select.appendChild(optionSales);
        select.appendChild(optionMarketing);
        var marketing = document.createTextNode("Marketing");
        var sales = document.createTextNode("Sales");
        optionMarketing.appendChild(marketing);
        optionSales.appendChild(sales);
        body.appendChild(select);
        }
    } else if (e == 'customerContentpStatus') {
        if (document.getElementById('modalLabel').innerHTML === 'Production Status'){
            body.removeChild(select);
        } else {
        document.getElementById('modalLabel').innerHTML = "Production Status";
        var body = document.getElementById("modalBody");
        const select = document.createElement("select");
        const option = document.createElement("option");
        select.setAttribute('class',"custom-select")
        select.appendChild(option);
        var cell = document.createTextNode("New");
        option.appendChild(cell);
        body.appendChild(select);
        }
    } else if (e == 'customerContentSalesStatus') {
        if (document.getElementById('modalLabel').innerHTML === 'Sales Status'){
            body.removeChild(select);
        } else {
        document.getElementById('modalLabel').innerHTML = "Sales Status";
        var body = document.getElementById("modalBody");
        const select = document.createElement("select");
        const optionAssign = document.createElement("option");
        const optionNew = document.createElement("option");
        select.setAttribute('class',"custom-select");
        select.appendChild(optionAssign);
        select.appendChild(optionNew);
        var newSales = document.createTextNode("New");
        var assigned = document.createTextNode("Assigned");
        optionNew.appendChild(newSales);
        optionAssign.appendChild(assigned);
        body.appendChild(select);


        }
    } else if (e == 'contactStatus') {
        const submit = document.getElementById('modalButton');
        submit.setAttribute('onclick',"submitCStatus()");
        console.log(submit);
        if (document.getElementById('modalLabel').innerHTML === 'Contact Status'){
            body.removeChild(select);
        } else {
        document.getElementById('modalLabel').innerHTML = "Contact Status " + docID;
        var body = document.getElementById("modalBody");
        const select = document.createElement("select");
        const optionNothing = document.createElement("option");
        const optionEmailed = document.createElement("option");
        const optionEmailedOpened = document.createElement("option");
        select.setAttribute('class',"custom-select");
        select.setAttribute('id', 'cStatusSelect');
        select.appendChild(optionNothing);
        select.appendChild(optionEmailed);
        select.appendChild(optionEmailedOpened);
        var nothing = document.createTextNode("Nothing");
        var emailed = document.createTextNode("Emailed");
        var opened = document.createTextNode("Opened Email");
        optionEmailedOpened.appendChild(opened);
        optionEmailed.appendChild(nothing);
        optionNothing.appendChild(emailed);
        body.appendChild(select);

        }
    } else if (e == 'radioOrderNumber') {
        document.getElementById('modalLabel').innerHTML = "Contact Status";
        var body = document.getElementById("modalBody");
        const input = document.createElement("input");
        const radioNumber = document.getElementById('rNumber').innerHTML;
        input.setAttribute('placeholder', radioNumber);
        input.setAttribute('class', "input-group-text");

        body.appendChild(input);
    } else if (e == 'radioAmount') {
        document.getElementById('modalLabel').innerHTML = "Contact Status";
        var body = document.getElementById("modalBody");
        const input = document.createElement("input");
        const radioAmount = document.getElementById('rAmount').innerHTML;
        input.setAttribute('placeholder', radioAmount);
        input.setAttribute('class', "input-group-text");
        body.appendChild(input);
    }
};

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
        var parent = document.getElementById("customerContentBusNotes");
        var child = document.getElementById("noteRow");
        parent.removeChild(child);
        //document.getElementById('customerContentBusNotes').style.display = "none";
        setTimeout(function(){
            findClientInfo(tagID);
         
        }, 200);
    });

};

function reload(){
    // var container = document.getElementById("customerContentBusNotes");
    // var content = container.innerHTML;
    // container.innerHTML= content; 

    var parent = document.getElementById("customerContentBusNotes").innerHTML;
    var child = document.getElementById("noteRow").innerHTML;
    parent.removeChild(child);
    console.log("Refreshed"); 
}




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