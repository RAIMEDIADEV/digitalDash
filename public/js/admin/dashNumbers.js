document.addEventListener("DOMContentLoaded", event => {  

            
                    const app = firebase.app();
                    const db = firebase.firestore();
                    // const settings = {timestampsInSnapshots: true}; db.settings(settings);

                    
                   
                    db.collection('raiLeads').get().then(
                        (snapshot) => document.getElementById("totalVideos").innerHTML = snapshot.docs.length
                      );


                      docDash.where('Status', '==', "Production").get().then(function(doc) {
                        let j = doc.data().BusinessName;
                        console.log(j);
    
                        // for (var j = 0; j < 1; j++) {
    
                        //     let counter = ++1;
                        //     console.log(counter)
    
                            //document.getElementById('activeProjects').innerHTML
                        //}
                    });

                    
                    //   db.collection("raiLeads").get().then(function() {
                    //     let productionStatus = data().ProductionStatus; 
                    //     console.log(productionStatus);
    
                    // });
                    // var productionRef = db.collection("raiLeads");
                    // var query = productionRef.where("ProductionStatus", "==", true);
                    // console.log(query);
                    

                    // db.collection("raiLeads").get().then(function(querySnapshot) {
                    //   querySnapshot.forEach(function(doc) {


                        
                          
                    //       var raiTotal = doc.data().ProductionStatus;
                    //       //console.log(raiTotal);
                    //       if (raiTotal === "Done") {
                    //         //console.log('Done');
                            
                    //       } else if (raiTotal === undefined) {
                    //         //console.log('no input');
                    //       } else {
                    //         for (var j = 0; j < 1; j++) {
                    //           let active = '';
                    //           //console.count(active);
                    //           document.getElementById("activeProjects").innerHTML = active;
                    //         }

                    //       }


                         
                    //   });
                    // });

                    //const timestamp = snapshot.get('created_at');
                    //const date = timestamp.toDate();

                    //var docRef = db.collection("raiLeads");
                    
                    // var printRef = docRef.get()
                    //     .then(snapshot => {
                    //         snapshot.forEach(doc => {

                    //           docRef.where("ProductionStatus", "==", "Fresh").get()
                    //           .then(function(querySnapshot) {
                    //             if (querySnapshot.exists) {
                    //                 querySnapshot.forEach(function(doc) {
                    //                     console.log(doc.id, " => ", doc.data());
                                        
                                        
                    //                 });
                    //             } else {
                    //                 console.log( "Do Not Exist In DB");
                    //             };
                    //         })
                    //         .catch(function(error) {
                    //             console.log("Error getting documents: ", error);
                    //         });
                        
                    //         })
                    //       });

                        

                        //   db.collection("raiLeads").where('ProductionStatus', "==", "Done").get()

                        //   .then(function(querySnapshot) {
                        //     if (querySnapshot.exists) {
                        //         querySnapshot.forEach(function(doc) {
                        //           console.log('in the if');
                        //           var userData = doc.data()
                        //           var userId = doc.id
                        //           console.log(doc.id, " => ", doc.data());
                                    
                                    
                        //         })
                        //     } else {
                        //         console.log( "Do Not Exist In DB");
                        //     };
                        // })
                        // .catch(function(error) {
                        //     console.log("Error getting documents: ", error);
                        // });
                        
});