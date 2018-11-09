function displaySearch(){
document.getElementById('searchContainer').style.display = "block";
document.getElementById('subCont').style.display = 'block';
document.getElementById('icon').style.display = 'none';
document.getElementById('subCont2').style.display = "none";
}

function search(){
    const app = firebase.app();
    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true}; db.settings(settings);

var searchClient = db.collection("raiLeads");

const searchInput = document.getElementById('searchInput').value;

console.log(searchInput);

searchClient.where("Phone", "==", searchInput).get()
.then(snapshot => {
  snapshot.forEach(doc => {
    document.getElementById('searchInput').value = ' ';
    document.getElementById('subCont').style.display = 'none';
    document.getElementById('subCont2').style.display = "block";


    const body = document.getElementById('filler');
    


    const cell = document.createElement("div");
    const cellText = document.createTextNode(doc.data().BusinessName);
    cell.appendChild(cellText);
    cell.setAttribute('id', doc.data().BusinessName);
    cell.setAttribute('onclick', 'customerSalesCard(this.id)');

    body.appendChild(cell);

    

});

});


};