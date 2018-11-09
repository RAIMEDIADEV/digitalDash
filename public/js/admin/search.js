document.addEventListener("DOMContentLoaded", event => {  
    


const app = firebase.app();
const db = firebase.firestore();
var docRef = db.collection("raiLeads");
    
// var printRef = docRef.get()
//     .then(snapshot => {
//         snapshot.forEach(doc => {
//             docId = doc.id;
//             busName = doc.data().BusinessName;
//             //console.log(busName);
//             document.getElementById("store").innerHTML = busName;
//             console.log(busName);


//   })
// })
// .catch(err => {
//     console.log('Error getting documents', err);
    
// });




function search(){
    console.log("hello");
    const searchInput = document.getElementById("searchInput").value;


// const store = document.getElementById("store").innerHTML;


// ==========================  FUNNY LOGIC ================
if (searchInput == busName){
    console.log(busName);
    }else{
        console.log("nothing found");
    }

};



});
    


