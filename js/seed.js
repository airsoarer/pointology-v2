(function(){
    $(document).ready(init);
    var firebaseConfig = {
        apiKey: "AIzaSyA2_P07vxDtJ9OoKN1OkXAFpMnuxOoZa7o",
        authDomain: "pointology-e397b.firebaseapp.com",
        databaseURL: "https://pointology-e397b.firebaseio.com",
        projectId: "pointology-e397b",
        storageBucket: "pointology-e397b.appspot.com",
        messagingSenderId: "404283995990",
        appId: "1:404283995990:web:fa100e3015ce504f2648f7"
    };
    uid = "";
    userTotal = 0;
    womensUserTotal = 0;

    function init(){
        firebase.initializeApp(firebaseConfig);
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                uid = user.uid

                firebase.database().ref("Users/" + uid).once("child_added", (snapshot) => {
                    let data = snapshot.val();
                    $("#mensPointScore").css("color", "#99BADD");
                    $("#womensPointScore").css("color", "#FFFFFF");
        
                    // let score = data.MensScore;
                    // $("#score").text(score.toString() + "pts");
                });
        
                firebase.database().ref("Seeds/Mens").on("value", (snapshot) => {
                    let data = snapshot.val();
                    let y = 1;
                    let x = 1;
                    $(".contain").css("height", "auto");
                    $(".seed").css("height", "350px");
        
                    for(let i = 0; i < data.MensSeedArray.length; i++){
                        if(i === 64 || i === 65){
                            y = 11;
                        }else if(i === 66 || i === 67){
                            y = 16;
                        }else{
                            if(i % 4 === 0 && i != 0){
                                y++;
                            }
                        }
        
                        // p
                        let p = document.createElement("p");
        
                        // Label
                        let label = document.createElement("label");
                        p.appendChild(label);
        
                        // input
                        let input = document.createElement("input");
                        input.type = "radio"
                        input.name = "group" + y;
                        input.value = data.MensSeedArray[i];
                        label.appendChild(input);
        
                        // span
                        let span = document.createElement("Span");
                        span.textContent = data.MensSeedArray[i];
                        label.appendChild(span);
        
                        if(i === 64 || i === 65){
                            $(".11").append(p);
                        }else if(i === 66 || i === 67){
                            $(".16").append(p);
                        }else{
                            if(i >= 4){
                                if(i % 4 === 0){
                                    x++;
                                    $("." + x).append(p);
                                }
                            }
        
                            $("." + x).append(p);
                        }
                    }
                });
        
                firebase.database().ref("Seeds/Womens").on("value", (snapshot) => {
                    let data = snapshot.val();
                    let y = 1;
                    let x = 1;
                    $(".contain").css("height", "auto");
                    $(".seed").css("height", "350px");
        
                    for(let i = 0; i < data.WomensSeedArray.length; i++){
                        if(i === 64 || i === 65){
                            y = 11;
                        }else if(i === 66 || i === 67){
                            y = 16;
                        }else{
                            if(i % 4 === 0 && i != 0){
                                y++;
                            }
                        }
        
                        // p
                        let p = document.createElement("p");
        
                        // Label
                        let label = document.createElement("label");
                        p.appendChild(label);
        
                        // input
                        let input = document.createElement("input");
                        input.type = "radio"
                        input.name = "groupw" + y;
                        input.value = data.WomensSeedArray[i];
                        label.appendChild(input);
        
                        // span
                        let span = document.createElement("Span");
                        span.textContent = data.WomensSeedArray[i];
                        label.appendChild(span);
        
                        if(i === 64 || i === 65){
                            $(".w11").append(p);
                        }else if(i === 66 || i === 67){
                            $(".w16").append(p);
                        }else{
                            if(i >= 4){
                                if(i % 4 === 0){
                                    x++;
                                    $(".w" + x).append(p);
                                }
                            }
        
                            $(".w" + x).append(p);
                        }
                    }
                });
        
                // Post Mens Teams and the Score
                firebase.database().ref("Users/" + uid + "/Entries/Mens").on("child_added", (snapshot) => {
                    let data = snapshot.val();
                    let key = snapshot.key;
                    let userTotal = 0;

                    let li = document.createElement("li");
                    li.classList.add("col");
                    li.classList.add("m12");
                        
                    let headerDiv = document.createElement("div");
                    headerDiv.classList.add("collapsible-header");
                    li.appendChild(headerDiv);

                    let headerh4 = document.createElement("h4");
                    headerh4.textContent = data.EntryName;
                    headerDiv.appendChild(headerh4);

                    let bodyDiv = document.createElement("div");
                    bodyDiv.classList.add("collapsible-body");
                    li.appendChild(bodyDiv);

                    let score = document.createElement("h4");
                    score.classList.add("col");
                    score.classList.add("m12");
                    score.classList.add("center-align");

                    for(let i = 0; i < data.Array.length; i++){
                        // console.log(i+1);
                        let div = document.createElement("div");
                        div.classList.add("col");
                        div.classList.add("m3");
                        bodyDiv.appendChild(div);

                        let h5 = document.createElement("h5");
                        h5.textContent = "Seed " + (i+1) + " Choice: ";
                        div.appendChild(h5);
    
                        let p = document.createElement("p");;
    
                        let ref = data.Array[i];
    
                        firebase.database().ref("Seeds/Mens/TeamsScore").on("value", (snapshot) => {
                            let dataTwo = snapshot.val();
                            let team = dataTwo[ref];
                            let total = 0;
                            for(i in team){
                                total += parseInt(team[i]);
                            }
    
                            p.textContent = ref + ": " + total + "pts";
                            div.appendChild(p);
                        })
    
                        $(".mensEntry").append(li);
    
                        firebase.database().ref("Seeds/Mens/TeamsScore/" + data.Array[i]).on("value", (snapshot) => {
                            let dataTwo = snapshot.val();
                            for(i in dataTwo){
                                userTotal += parseInt(dataTwo[i]);
                            }

                            if(userTotal > data.Score){
                                firebase.database().ref("Users/" + uid + "/Entries/Mens/" + key).child("Score").transaction((Value) => {
                                    Value = userTotal;
                                    return Value;
                                }).then(() => {
                                    score.textContent = "Total Score: " + userTotal + "pts.";
                                });
                            }else{
                                score.textContent = "Total Score: " + data.Score + "pts.";
                            }
                        });
                    }
        
                    bodyDiv.appendChild(score);

                    // let score = document.createElement("h4");
                    // score.textContent = "Your current score is: ";
                    // $(score).css("padding-top", "30px !important");
            
                        // $(".mensEntry").append(score);
        
                    // console.log(data);
                });
        
                // Post Womens teams and the scores
                firebase.database().ref("Users/" + uid + "/Entries/Womens").on("child_added", (snapshot) => {
                    let data = snapshot.val();
                    let key = snapshot.key;
                    let womensUserTotal = 0;

                    let li = document.createElement("li");
                    li.classList.add("col");
                    li.classList.add("m12");
                        
                    let headerDiv = document.createElement("div");
                    headerDiv.classList.add("collapsible-header");
                    li.appendChild(headerDiv);

                    let headerh4 = document.createElement("h4");
                    headerh4.textContent = data.EntryName;
                    headerDiv.appendChild(headerh4);

                    let bodyDiv = document.createElement("div");
                    bodyDiv.classList.add("collapsible-body");
                    li.appendChild(bodyDiv);

                    let score = document.createElement("h4");
                    score.classList.add("col");
                    score.classList.add("m12");
                    score.classList.add("center-align");

                    for(let i = 0; i < data.Array.length; i++){
                        let div = document.createElement("div");
                        div.classList.add("col");
                        div.classList.add("m3");
                        bodyDiv.appendChild(div);

                        let h5 = document.createElement("h5");
                        h5.textContent = "Seed " + (i+1) + " Choice: ";
                        div.appendChild(h5);
    
                        let p = document.createElement("p");;
    
                        let ref = data.Array[i];
    
                        firebase.database().ref("Seeds/Womens/TeamsScore").on("value", (snapshot) => {
                            let dataTwo = snapshot.val();
                            let team = dataTwo[ref];
                            let total = 0;
                            for(i in team){
                                total += parseInt(team[i]);
                            }
    
                            p.textContent = ref + ": " + total + "pts";
                            div.appendChild(p);
                        })
        
                        $(".womensEntry").append(li);
    
                        firebase.database().ref("Seeds/Womens/TeamsScore/" + data.Array[i]).on("value", (snapshot) => {
                            let dataTwo = snapshot.val();
                            for(i in dataTwo){
                                womensUserTotal += parseInt(dataTwo[i]);
                            }
    
                            if(womensUserTotal > data.Score){
                                firebase.database().ref("Users/" + uid + "/Entries/Womens/" + key).child("Score").transaction((Value) => {
                                    Value = womensUserTotal;
                                    return Value;
                                }).then(() => {
                                    score.textContent = "Total Score: " + womensUserTotal + "pts."; 
                                });
                            }else{
                                score.textContent = "Total Score: " + data.Score + "pts.";
                            }
                        });

                        bodyDiv.appendChild(score);
                    }
        
                    // let score = document.createElement("h4");
                    // score.textContent = "Your current score is: ";
                    // $(score).css("padding-top", "30px !important");
            
                        // $(".womensEntry").append(score);
                });
            }
        });

        // mensPoints();

        firebase.database().ref().off();

        $('.tabs').tabs();
        $('.collapsible').collapsible();
        $("#logout").on("click", logout);
        $("#submit").on("click", submitMens);
        $("#womensSubmit").on("click", submitWomens);
        $("#mensFillOut").on("click", showMensForm);
        $("#womensFillOut").on("click", showWomensForm);
        $("#mensPointScore").on("click", mensPoints);
        $("#womensPointScore").on("click", womensPoints);
    }

    function mensPoints(){
        $("#mensPointScore").css("color", "#99BADD");
        $("#womensPointScore").css("color", "#FFFFFF");
        firebase.database().ref("Users/" + uid).on("value", (snapshot) => {
            let data = snapshot.val();
            let score = data.Entries.MensScore;
            $("#score").text(score.toString() + "pts");
        });
    }

    function womensPoints(){
        $("#womensPointScore").css("color", "#99BADD");
        $("#mensPointScore").css("color", "#FFFFFF");
        firebase.database().ref("Users/" + uid).on("value", (snapshot) => {
            let data = snapshot.val();
            $("#score").text(data.Entries.WomensScore.toString() + "pts");
        });
    }

    function showWomensForm(){
        $(".womensEntry").css("display", "none");
        $("#womensFill").css("display", "block");
    }

    function showMensForm(){
        $(".mensEntry").css("display", "none");
        $("#mensFill").css("display", "block");
    }

    function submitWomens(){
        let arr = []
        let name = $("#womensEntryName").val();
        let key = firebase.database().ref("Users/" + uid + "/Entries").child("Womens").push().key;

        if(name === ""){
            $("#womensEntryName").css("border-bottom-color", "red");
            $("#noWomensName").css("display", "block");
            return;
        }

        for(let i = 1; i < 17; i++){
            arr.push($("input[name=groupw" + i + "]:checked").val());
        }

        let data = {};
        data["Admin/WomensEntries/" + key] = {
            UID:uid,
            EntryName:name,
            EntryUID:key,
            EntryArray:arr
        };
        data["Users/" + uid + "/Entries/Womens/" + key] = {
            Array:arr,
            EntryName:name,
            Score:0
        }

        return firebase.database().ref().update(data).then(() => {
            location.replace("../html/seed.html");
        })
    }

    function submitMens(){
        let arr = []
        let key = firebase.database().ref("Users/" + uid + "/Entries").child("Mens").push().key;
        let name = $("#mensEntryName").val();

        if(name === ""){
            $("#mensEntryName").css("border-bottom-color", "red");
            $("#noMensName").css("display", "block");
            return;
        }

        for(let i = 1; i < 17; i++){
            arr.push($("input[name=group" + i + "]:checked").val());
        }

        let data = {};
        data["Admin/MensEntries/" + key] = {
            UID:uid,
            EntryName:name,
            EntryUID:key,
            EntryArray:arr
        };
        data["Users/" + uid + "/Entries/Mens/" + key] = {
            Array:arr,
            EntryName:name,
            Score:0
        }

        return firebase.database().ref().update(data).then(() => {
            location.replace("../html/seed.html");
        });
    }

    function logout(){
        firebase.auth().signOut().then(() => {
            location.replace("../html/index.html");
        });    
    }
})();