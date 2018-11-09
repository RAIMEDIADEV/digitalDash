


function scriptPage(){

  document.getElementById('successMsg').style.display = "none";

  const docIDpreParse = document.getElementById('companyInfoHeader').innerHTML;
  var parser = new DOMParser;
  var dom = parser.parseFromString(
      '<!doctype html><body>' + docIDpreParse,
      'text/html');
  var e = dom.body.textContent;

    const db = firebase.firestore();
    
    db.collection("raiLeads").doc(e).get().then(function(doc) {
        document.getElementById('textBox').innerHTML =  doc.data().Script;

    });
};

function editTrue(){
   document.getElementById("textBox").contentEditable = "true";
   document.getElementById("textBox").style.backgroundColor = "#8ffd8f";
};

function editFalse(){
  document.getElementById("textBox").contentEditable = "false";
  document.getElementById("textBox").style.backgroundColor = "transparent";
};

// =============================================== Save Script functions =======================================

function scriptSave() {

    const docIDpreParse = document.getElementById('companyInfoHeader').innerHTML;
    var parser = new DOMParser;
    var dom = parser.parseFromString(
        '<!doctype html><body>' + docIDpreParse,
        'text/html');
    var e = dom.body.textContent;
    

    const app = firebase.app();
    const db = firebase.firestore();

    const scriptInput = document.getElementById("textBox").innerText;
    document.getElementById("textBox").contentEditable = "false";
    document.getElementById("textBox").style.backgroundColor = "transparent";
    console.log(scriptInput);

  
    const timeStamp = new Date();
    //const date = timestamp.toDate();

    db.collection("raiLeads").doc(e).update({
    Script: scriptInput,
    ScriptTime: firebase.firestore.FieldValue.arrayUnion(timeStamp + '  ' + scriptInput)
    }).then(function() {
        console.log("Document successfully saved!");


        document.getElementById('successMsg').style.display = "block";

    }).catch(function(error) {
        console.error("Error writing document: ", error);
        //document.getElementById('companyHeader').innerHTML = "Error writing document: ", error;
        document.getElementById('errorMsg').style.display = "block";
    });
};  
