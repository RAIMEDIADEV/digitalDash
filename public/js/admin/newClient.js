function newClientInput() {
    
    document.getElementById("modification").style.display="none";
    document.getElementById("inputNewClient").style.display="block";
};

function submit() {

    // const app = firebase.app();
    // const db = firebase.firestore();
    // const settings = {timestampsInSnapshots: true}; db.settings(settings);


    //const raiLeadPosts = db.collection('raiLeads').doc('1');

    // const businessName = document.getElementById('businessName').value;
    // const businessContact = document.getElementById('businessContact').value;
    // const emailInput = document.getElementById('emailInput').value;
    // const notes = document.getElementById('notes').value;
    // console.log(businessName, businessContact, emailInput, notes);



if (validation()) // Calling validation function
{
document.getElementById("form_id").submit(); //form submission
alert(" Name : " + businessName + ' ' + "Form Submitted Successfully......");
        };



// Name and Email validation Function.
function validation() {
    const businessName = document.getElementById("businessName").value;
    const emailInput = document.getElementById("emailInput").value;

    const emailReg = "^([A-Za-z0-9_\\-\\.])+@";

    if (businessName === '' || emailInput === '') {
    alert("Please fill all fields...!!!!!!");
    window.location.reload();
    return false;
    } else if (!(emailInput).match(emailReg)) {
    alert("Invalid Email...!!!!!!");
    window.location.reload();

    return false;
    
        } else {

                writeUserData();

                console.log("Document successfully written!");
                    setTimeout(function(){
                        return true;
                }, 500);
        }
}





function writeUserData() {
    const app = firebase.app();
    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true}; db.settings(settings);

    const businessName = document.getElementById('businessName').value;

    const customerInfo = db.collection('raiLeads');

    //const raiLeadPosts = db.collection('raiLeads').doc(businessName);

    const year = document.getElementById('radioDateYear').value;

    const month = document.getElementById('radioDateMonth').value;
    const monthFormat = month - 01; 
    const day = document.getElementById('radioDateDay').value;
    const radioDate = new Date(year, monthFormat, day);
    const leadGenInput = document.getElementById("leadGenInput").value;
    const dateTime = new Date;

    console.log(year, month, day);

    console.log(typeof leadGen);


    customerInfo.doc(businessName).set({
        BusinessName: document.getElementById('businessName').value,
        Contact: document.getElementById('businessContact').value,
        BusinessAddress: document.getElementById('businessAddress').value,
        Email: document.getElementById('emailInput').value,
        Status: document.getElementById('contactInput').value,
        ProductionStatus: document.getElementById('pStatus').value,
        Notes: document.getElementById('notes').value,
        Phone: document.getElementById("phoneNumber").value,
        Website: document.getElementById("website").value,
        Facebook: document.getElementById("facebook").value,
        VideoLink: document.getElementById("vimeo").value,
        LeadGen: leadGenInput,
        RadioOrderAmount: document.getElementById("radioAmt").value,
        RadioOrderNumber: document.getElementById("radioNum").value,
        RadioOrderDate: radioDate,
        Time: dateTime,
        ServerTime: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function() {
        alert("Document successfully saved!");
        setTimeout(function(){
                window.location.reload();
       }, 500);
        
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
        window.location.reload();
    });

};

};