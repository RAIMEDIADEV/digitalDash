
function customerSalesCard(e){

        // const firestore = firebase.firestore();
        // const settings = {/* your settings... */ timestampsInSnapshots: true};
        // firestore.settings(settings);

        const pageId = document.getElementById("pageId").innerHTML; 

        console.log(pageId);


        if (pageId == "Admin Sales Dashboard") {
        document.getElementById("video").style.display = "none";
        document.getElementById("app").style.display = "block";
        document.getElementById("modification2").style.display = "none";
        console.log('in if');
        } else {
                console.log('in else');
        document.getElementById("app").style.display = "block";
        const client = e;

     const firestore = firebase.firestore();
//     const settings = {/* your settings... */ timestampsInSnapshots: true};
//     firestore.settings(settings);


firestore.collection("raiLeads").doc(client).get().then(function(doc) {
        const body = document.getElementById('app');
        const row = document.createElement('ul');
        row.setAttribute("class","list-group");
//======================================================================================== BUSINESS NAME
        const businessName = document.createElement("li");
        businessName.setAttribute("id", doc.data().BusinessName);
        businessName.setAttribute("class","list-group-item");

        const strongName = document.createElement("strong");
        const name = document.createTextNode("Business Name: ");
        strongName.appendChild(name);
        businessName.appendChild(strongName);

        const businessNameText = document.createTextNode(doc.data().BusinessName);
        businessName.appendChild(businessNameText);
        row.appendChild(businessName);
//======================================================================================== BUSINESS ADDRESS
        const businessAddress = document.createElement("li");
        businessAddress.setAttribute("class","list-group-item");

        const strongAdd = document.createElement("strong");
        const address = document.createTextNode("Business Address: ");
        strongAdd.appendChild(address);
        businessAddress.appendChild(strongAdd);

        const businessAddressText = document.createTextNode(doc.data().BusinessAddress);
        businessAddress.appendChild(businessAddressText);
        row.appendChild(businessAddress);
//======================================================================================== BUSINESS EMAIL   
        const selectContainer = document.createElement("li");
        const businessEmail = document.createElement("select");
        const businessEmailOption = document.createElement("option");
        const emailLinkClick = document.createElement("a");
        const emailLinkClickText = document.createTextNode("Click to Email");
        emailLinkClick.setAttribute('href', "mailto:" + doc.data().Email);
        businessEmail.setAttribute("class","form-control");
        selectContainer.setAttribute("class","list-group-item");

        const strongEmail = document.createElement("strong");
        const email = document.createTextNode("Business Email: ");
        emailLinkClick.appendChild(emailLinkClickText);
        strongEmail.appendChild(email);
        selectContainer.appendChild(strongEmail);

        const businessEmailText = document.createTextNode(doc.data().Email);
        businessEmailOption.appendChild(businessEmailText);
        businessEmail.appendChild(businessEmailOption);
        selectContainer.appendChild(emailLinkClick);
        selectContainer.appendChild(businessEmail);
        row.appendChild(selectContainer);
//======================================================================================== BUSINESS CONTACT
        const businessContact = document.createElement("li");
        businessContact.setAttribute("class","list-group-item");

        const strongContact = document.createElement("strong");
        const contact = document.createTextNode("Business Contact: ");
        strongContact.appendChild(contact);
        businessContact.appendChild(strongContact);

        const businessContactText = document.createTextNode(doc.data().Contact);
        businessContact.appendChild(businessContactText);
        row.appendChild(businessContact);
//======================================================================================== BUSINESS PHONE
        const businessPhone = document.createElement("li");
        businessPhone.setAttribute("class","list-group-item");

        const strongPhone = document.createElement("strong");
        const phone = document.createTextNode("Business Phone: ");
        strongPhone.appendChild(phone);
        businessPhone.appendChild(strongPhone);

        const businessPhoneText = document.createTextNode(doc.data().Phone);
        businessPhone.appendChild(businessPhoneText);
        row.appendChild(businessPhone);
//======================================================================================== BUSINESS LEAD GEN
        const businessLeadGen = document.createElement("li");
        businessLeadGen.setAttribute("class","list-group-item");

        const strongLead = document.createElement("strong");
        const lead = document.createTextNode("Lead Origin: ");
        strongLead.appendChild(lead);
        businessLeadGen.appendChild(strongLead);

        const businessLeadGenText = document.createTextNode(doc.data().LeadGen);
        businessLeadGen.appendChild(businessLeadGenText);
        row.appendChild(businessLeadGen);
//======================================================================================== BUSINESS WEBSITE    
        const businessWebsite = document.createElement("a");
        businessWebsite.setAttribute("class","list-group-item");

        const strongWeb = document.createElement("strong");
        const web = document.createTextNode("Website: ");
        strongWeb.appendChild(web);
        businessWebsite.appendChild(strongWeb);

        const businessWebsiteText = document.createTextNode("Click");
        businessWebsite.appendChild(businessWebsiteText);
        businessWebsite.setAttribute('href', doc.data().Website);
        row.appendChild(businessWebsite);
//======================================================================================== BUSINESS VIDEO LINK
        const businessVideoLink = document.createElement("iframe");
        businessVideoLink.setAttribute("class","list-group-item");
        businessVideoLink.setAttribute('src', doc.data().VideoLink);
        businessVideoLink.setAttribute('style', "width: 100%; height: 400px; border:none;");
        row.appendChild(businessVideoLink);
//======================================================================================== BUSINESS STATUS
        const businessStatus = document.createElement("li");
        businessStatus.setAttribute("class","list-group-item");

        const strongStatus = document.createElement("strong");
        const status = document.createTextNode("Status: ");
        strongStatus.appendChild(status);
        businessStatus.appendChild(strongStatus);

        const businessStatusText = document.createTextNode(doc.data().Status);
        businessStatus.appendChild(businessStatusText);
        row.appendChild(businessStatus);
//======================================================================================== BUSINESS Production Status
        const businessProductionStatus = document.createElement("li");
        businessProductionStatus.setAttribute("class","list-group-item");

        const strongProStatus = document.createElement("strong");
        const prostatus = document.createTextNode("Production Status: ");
        strongProStatus.appendChild(prostatus);
        businessProductionStatus.appendChild(strongProStatus);

        const businessProductionStatusText = document.createTextNode(doc.data().ProductionStatus);
        businessProductionStatus.appendChild(businessProductionStatusText);
        row.appendChild(businessProductionStatus);
//======================================================================================== BUSINESS Contact Status    
        const businessContactStatus = document.createElement("li");
        businessContactStatus.setAttribute("class","list-group-item");

        const strongConStatus = document.createElement("strong");
        const constatus = document.createTextNode("Contact Status: ");
        strongConStatus.appendChild(constatus);
        businessContactStatus.appendChild(strongConStatus);

        const businessContactStatusText = document.createTextNode(doc.data().ContactStatus);
        businessContactStatus.appendChild(businessContactStatusText);
        row.appendChild(businessContactStatus);
//======================================================================================== BUSINESS Contact Status Time
        const businessContactStatusTime = document.createElement("li");
        businessContactStatusTime.setAttribute("class","list-group-item");

        const strongConStatusTime = document.createElement("strong");
        const constatustime = document.createTextNode("Contact Status Time: ");
        strongConStatusTime.appendChild(constatustime);
        businessContactStatusTime.appendChild(strongConStatusTime);

        const businessContactStatusTimeText = document.createTextNode(doc.data().ContactStatusTime[0].seconds * 1000);
        businessContactStatusTime.appendChild(businessContactStatusTimeText);
        row.appendChild(businessContactStatusTime);
//======================================================================================== BUSINESS Sales Status
        const businessSalesStatus = document.createElement("li");
        businessSalesStatus.setAttribute("class","list-group-item");

        const strongSalesStatus = document.createElement("strong");
        const salesstatus = document.createTextNode("Sales Status: ");
        strongSalesStatus.appendChild(salesstatus);
        businessSalesStatus.appendChild(strongSalesStatus);

        const businessSalesStatusText = document.createTextNode(doc.data().SalesStatus);
        businessSalesStatus.appendChild(businessSalesStatusText);
        row.appendChild(businessSalesStatus);
//======================================================================================== BUSINESS TIME
        let tDate = doc.data().Time.seconds * 1000;
        let newTimeFormat = new Date(tDate);
        const businessTime = document.createElement("li");
        businessTime.setAttribute("class","list-group-item");

        const strongTime = document.createElement("strong");
        const time = document.createTextNode("Time: ");
        strongTime.appendChild(time);
        businessTime.appendChild(strongTime);

        const businessTimeText = document.createTextNode(newTimeFormat);
        businessTime.appendChild(businessTimeText);
        row.appendChild(businessTime);
//======================================================================================== BUSINESS Radio Order Amount    
        const businessRadioOrderAmount = document.createElement("li");
        businessRadioOrderAmount.setAttribute("class","list-group-item");

        const strongAmount = document.createElement("strong");
        const amount = document.createTextNode("Radio Order Amount: $");
        strongAmount.appendChild(amount);
        businessRadioOrderAmount.appendChild(strongAmount);

        const businessRadioOrderAmountText = document.createTextNode(doc.data().RadioOrderAmount);
        businessRadioOrderAmount.appendChild(businessRadioOrderAmountText);
        row.appendChild(businessRadioOrderAmount);
//======================================================================================== BUSINESS Radio Order Time
        let rDate = doc.data().RadioOrderDate.seconds * 1000;
        let newRadioDateFormat = new Date(rDate);
        const businessnewRadioDateFormat = document.createElement("li");
        businessnewRadioDateFormat.setAttribute("class","list-group-item");

        const strongRtime = document.createElement("strong");
        const rTime = document.createTextNode("Radio Order Time: ");
        strongRtime.appendChild(rTime);
        businessnewRadioDateFormat.appendChild(strongRtime);

        const businessnewRadioDateFormatText = document.createTextNode(newRadioDateFormat);
        businessnewRadioDateFormat.appendChild(businessnewRadioDateFormatText);
        row.appendChild(businessnewRadioDateFormat);
//======================================================================================== BUSINESS Radio Order Number
        const businessRadioOrderNumber = document.createElement("li");
        businessRadioOrderNumber.setAttribute("class","list-group-item");

        const strongRnumber = document.createElement("strong");
        const radioNumber = document.createTextNode("Radio Order Number: ");
        strongRnumber.appendChild(radioNumber);
        businessRadioOrderNumber.appendChild(strongRnumber);

        const businessRadioOrderNumberText = document.createTextNode(doc.data().RadioOrderNumber);
        businessRadioOrderNumber.appendChild(businessRadioOrderNumberText);
        row.appendChild(businessRadioOrderNumber);
//======================================================================================== BUSINESS Days In House
        const businessDaysInHouse = document.createElement("li");
        businessDaysInHouse.setAttribute("class","list-group-item");

        const strongDhouse = document.createElement("strong");
        const inHouse = document.createTextNode("Days in house: ");
        strongDhouse.appendChild(inHouse);
        businessDaysInHouse.appendChild(strongDhouse);

        const businessDaysInHouseText = document.createTextNode(doc.data().DaysInHouse);
        businessDaysInHouse.appendChild(businessDaysInHouseText);
        row.appendChild(businessDaysInHouse);
//======================================================================================== BUSINESS Days In Pro
        const businessDaysInPro = document.createElement("li");
        businessDaysInPro.setAttribute("class","list-group-item");

        const strongDpro = document.createElement("strong");
        const inpro = document.createTextNode("Days in production: ");
        strongDpro.appendChild(inpro);
        businessDaysInPro.appendChild(strongDpro);

        const businessDaysInProText = document.createTextNode(doc.data().DaysInPro);
        businessDaysInPro.appendChild(businessDaysInProText);
        row.appendChild(businessDaysInPro);
//======================================================================================== BUSINESS Days In Sales
        const businessDaysInSales = document.createElement("li");
        businessDaysInSales.setAttribute("class","list-group-item");

        const strongDsales = document.createElement("strong");
        const inSales = document.createTextNode("Days in sales: ");
        strongDsales.appendChild(inSales);
        businessDaysInSales.appendChild(strongDsales);

        const businessDaysInSalesText = document.createTextNode(doc.data().DaysInSales);
        businessDaysInSales.appendChild(businessDaysInSalesText);
        row.appendChild(businessDaysInSales);
//======================================================================================== BUSINESS Sales Status Change Track
        const businessSalesStatusChangeTrack = document.createElement("li");
        businessSalesStatusChangeTrack.setAttribute("class","list-group-item");

        const strongSalesTrack = document.createElement("strong");
        const inSalesTrack = document.createTextNode("Sales Status Track: ");
        strongSalesTrack.appendChild(inSalesTrack);
        businessSalesStatusChangeTrack.appendChild(strongSalesTrack);

        const businessSalesStatusChangeTrackText = document.createTextNode(doc.data().SalesStatusChangeTrack);
        businessSalesStatusChangeTrack.appendChild(businessSalesStatusChangeTrackText);
        row.appendChild(businessSalesStatusChangeTrack);
//======================================================================================== BUSINESS Status Change Track
        const businessStatusChangeTrack = document.createElement("li");
        businessStatusChangeTrack.setAttribute("class","list-group-item");

        const strongStatusTrack = document.createElement("strong");
        const statusTrack = document.createTextNode("Status Track: ");
        strongStatusTrack.appendChild(statusTrack);
        businessStatusChangeTrack.appendChild(strongStatusTrack);

        const businessStatusChangeTrackText = document.createTextNode(doc.data().StatusChangeTrack);
        businessStatusChangeTrack.appendChild(businessStatusChangeTrackText);
        row.appendChild(businessStatusChangeTrack);
//======================================================================================== BUSINESS Contact Status Track Change
        const businessContactStatusTrackChange = document.createElement("li");
        businessContactStatusTrackChange.setAttribute("class","list-group-item");

        const strongConStatusTrack = document.createElement("strong");
        const statusConTrack = document.createTextNode("Status Track: ");
        strongConStatusTrack.appendChild(statusConTrack);
        businessContactStatusTrackChange.appendChild(strongConStatusTrack);

        const businessContactStatusTrackChangeText = document.createTextNode(doc.data().ContactStatusTrackChange);
        businessContactStatusTrackChange.appendChild(businessContactStatusTrackChangeText);
        row.appendChild(businessContactStatusTrackChange);
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ appending
        



const container = document.createElement('div');
container.setAttribute('class', 'col-lg-12');
container.setAttribute('id', 'customerCard');


const card = document.createElement('div');
card.setAttribute('class', 'card');


const cardBody = document.createElement('div');
cardBody.setAttribute('class', 'card-body');


const left = document.createElement('div');
left.setAttribute('class', 'col-lg-6');


const right = document.createElement('div');
right.setAttribute('class', 'col-lg-6');

const addNote = document.createElement('li');
addNote.setAttribute('class', 'list-group-item');

const noteText = document.createElement('textarea');
noteText.setAttribute("style","width: 100%; height: 100%");
noteText.setAttribute('id', 'noteText');

const submitButton = document.createElement('button');
submitButton.setAttribute('id', doc.data().BusinessName);
submitButton.setAttribute('onclick', "addNoteButton(this.id)");
submitButton.setAttribute("class","btn btn-success");
const submitButtonText = document.createTextNode('Submit');
submitButton.appendChild(submitButtonText);


const notes = document.createElement('div');
notes.setAttribute("id","noteDiv");



const leftHeader = document.createElement('h1');
const leftHeaderText = document.createTextNode('Client Card');
leftHeader.appendChild(leftHeaderText);


const rightHeader = document.createElement('h1');
const rightHeaderText = document.createTextNode('Notes');
rightHeader.appendChild(rightHeaderText);



container.appendChild(card);
card.appendChild(cardBody);
cardBody.appendChild(left);
left.appendChild(leftHeader);
right.appendChild(rightHeader);
left.appendChild(row);
cardBody.appendChild(right);

right.appendChild(addNote);
addNote.appendChild(noteText);
addNote.appendChild(submitButton);
right.appendChild(notes);

body.appendChild(container);


    });




    firestore.collection("raiLeads").doc(e).get().then(function(doc) {
        var body = document.getElementById("noteDiv");

        const row = document.createElement("ul");
        row.setAttribute('class', "list-group");


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
            cell.setAttribute("style", 'color: grey;');
            cell.setAttribute("style", 'font-size: 12px;');
            cell2.appendChild(cellText);
            cell.appendChild(cell2);
            cell.appendChild(timeDate);
            row.appendChild(cell);
            
 
        }

      
        body.appendChild(row);

        });


        }
        document.getElementById('inputScript').style.display = 'block';
};


