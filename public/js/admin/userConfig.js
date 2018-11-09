document.addEventListener("DOMContentLoaded", event => { 



    // ======================================================================== AUTH CONTROL ==============================
    firebase.auth().onAuthStateChanged(firebaseUser => {
        const app = firebase.app();
                const db = firebase.firestore();
                const settings = {timestampsInSnapshots: true}; db.settings(settings);
                const userEmail = firebase.auth().currentUser.email;
                //var docRef = db.collection("userProfiles").doc(userName);

                console.log(userEmail);

        
    });



});

function upDateUserProfile(){
    const db = firebase.firestore();
    const userEmail = firebase.auth().currentUser.email;
    const userNameInput = document.getElementById('userName').value;
    const time = new Date();
    db.collection("userProfiles").doc(userEmail).set({
        Access: "sales",
        userName: userNameInput
        }).then(function() {
            window.location.href = './sales.html';
        });
    db.collection("sales").doc(userNameInput).set({
        AccountMade: time
    });

    };