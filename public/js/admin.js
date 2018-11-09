
function newSignIn(){


    
        const txtEmail = document.getElementById('txtEmail');
        const txtPassword = document.getElementById('txtPassword');
        const btnReq = document.getElementById('btnReq');
        
      
            //Get email and pass
            const email = txtEmail.value;
            const pass = txtPassword.value;
            const auth = firebase.auth();
        
            // Sign in
            const promise = auth.signInWithEmailAndPassword(email, pass).then(function(){
                checkingAccess();
            });

            promise.catch(function(e){
                let errorMessage = "Sorry... we don't seem to know you..." + '<br/>' + "Error: There is no user record corresponding to this email or password.";
                document.getElementById("errorMsg").innerHTML = errorMessage;
                //alert(e);
            });

            function checkingAccess(){

                const app = firebase.app();
                const db = firebase.firestore();
                const settings = {timestampsInSnapshots: true}; db.settings(settings);

                const userName = firebase.auth().currentUser.email;
                console.log(userName);
               
                db.collection('userProfiles').where('Access', '==', "admin").get().then(
                    (snapshot) => console.log('There are ' + snapshot.docs.length + ' docs loaded.')
                    
                  );

                var docRef = db.collection("userProfiles").doc(userName);

                console.log(docRef);

                var timeStamp = new Date();
              
                function returning(){
                db.collection("userProfiles").doc(email).update({
                    LoginRecord: firebase.firestore.FieldValue.arrayUnion(timeStamp)
                });
                };
  
                docRef.get().then(function(doc) {

                  accessInfo = doc.data().Access;
                  console.log(accessInfo);


                if (accessInfo === 'admin') {
                    returning();
                    window.location.href = './admin.html';
                } else if (accessInfo === 'production') {
                    returning();
                    window.location.href = './newProduction.html';
                    
                } else if (accessInfo === 'adminSales') {
                    returning();
                    window.location.href = './adminSales.html';
                } else if (accessInfo === 'sales') {
                    returning();
                    window.location.href = './sales.html';
                } else {
                    window.location.href = './userConfigure.html';
                }
                

                });


            };

            window.onerror = function(msg, url, linenumber) {
                alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
                return true;
            }

        };
    


        function newSignUp(){
            document.getElementById('submitBtn').style.display = "none";
            document.getElementById('signUpBtn').style.display = "none";
            document.getElementById('signUpNotification').style.display = "block";
            document.getElementById('submitSignUp').style.display = "block";
            document.getElementById('inviteCode').style.display = "block";
        };

        function signUpSubmit(){

            const inviteCode = document.getElementById('inviteCodeText').value;

            const db = firebase.firestore();
            // const settings = {timestampsInSnapshots: true}; db.settings(settings);

            const email = txtEmail.value;
            const pass = txtPassword.value;
            const auth = firebase.auth();


            if(inviteCode === "sellmedia"){
            document.getElementById('processing').style.display = "block";
            auth.createUserWithEmailAndPassword(email, pass);
            setTimeout(function () {
                auth.signInWithEmailAndPassword(email, pass).then(function(){
                    window.location.href = './userConfigure.html';
                });
            
            }, 500);
            } else {}

        };
    
    
    