


                function addNoteButton(e) {
                    let textForNotes = document.getElementById('noteText').value;
       
                    let user = document.getElementById('userInfo').innerHTML;
                
                    const app = firebase.app();
                    const db = firebase.firestore();
                
                    let docRef = db.collection("raiLeads").doc(e);
                
                    let timeStamp = new Date();
                
                    db.collection("raiLeads").doc(e).update({
                        NoteTime: firebase.firestore.FieldValue.arrayUnion(timeStamp),
                        NoteChangeTrack: firebase.firestore.FieldValue.arrayUnion(textForNotes + ' ' + "written on " + timeStamp + '  ' + 'by ' + user),
                        Notes: firebase.firestore.FieldValue.arrayUnion(textForNotes)
                    })
                    .then(function() {
                        alert("Note successfully updated!");
                        db.collection("raiLeads").doc(e).get().then(function(doc) {
                     
                        });
                        document.getElementById('noteText').value = '';
                        var parent = document.getElementById("noteDiv");
                        var child = document.getElementById("noteDivChild");
                        parent.removeChild(child);
                        setTimeout(function(){
                            customerSalesCard(e);
                        }, 200);
                    });
                
                };