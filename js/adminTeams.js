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

    function init(){
        firebase.initializeApp(firebaseConfig);
        firebase.database().ref("Seeds/Mens").on("value", (snapshot) => {
            let data = snapshot.val();
            for(x in data.MensSeedArray){
                let containDiv = document.createElement("div");
                containDiv.classList.add("row");

                let h3 = document.createElement("h3");
                h3.textContent = data.MensSeedArray[x] + ": ";
                h3.classList.add("col");
                h3.classList.add("m3")
                containDiv.appendChild(h3);

                firebase.database().ref("Seeds/Mens/TeamsScore/" + data.MensSeedArray[x]).on("value", (snapshot) => {
                    let dataTwo = snapshot.val();
                    let inputDiv = document.createElement("div");
                    inputDiv.id = data.MensSeedArray[x];
                    let totalNum = 0;

                    for(i in dataTwo){
                        let div = document.createElement("div");
                        div.classList.add("col");
                        div.classList.add("m1");
                        
                        let input = document.createElement("input");
                        if(data.MensSeedArray[x].includes(" ")){
                            let splitArr = data.MensSeedArray[x].split(" ");
                            input.id = splitArr.join("00") + "-" + i;
                            inputDiv.id = splitArr.join("00");
                        }else{
                            input.id = data.MensSeedArray[x] + "-" + i;
                        }
                        input.classList.add("mensScore");
                        if(dataTwo[i] === 0){
                            input.placeholder = "Rd. " + parseInt(i) + " Sc."
                        }else{
                            input.placeholder = dataTwo[i] + "pts";
                            $(input).addClass("blackPlaceholder");
                        }

                        totalNum += parseInt(dataTwo[i]);

                        div.appendChild(input);
                        inputDiv.appendChild(div);
                    }

                    let btn = document.createElement("button");
                    btn.id = data.MensSeedArray[x];
                    btn.textContent = "Out of the Running";
                    btn.classList.add("col");
                    btn.classList.add("m2");
                    btn.classList.add("outMens")
                    inputDiv.appendChild(btn);

                    let total = document.createElement("h4");
                    total.textContent = "Total Score: " + totalNum;
                    total.classList.add("col");
                    total.classList.add("m12");
                    total.classList.add("center-align");
                    inputDiv.appendChild(total);

                    firebase.database().ref("Seeds/Mens/OutTeams").on("value", (snapshot) => {
                        let outData = snapshot.val();
                        if(outData != null){
                            for(i = 0; i < outData.length; i++){
                                if(data.MensSeedArray[x] === outData[i]){
                                    console.log("Working");
                                    $(btn).css("background-color", "#0C2340");
                                    $(btn).css("color", "white");
                                    $(btn).prop("disabled", true);
                                }
                            }
                        }
                    });

                    containDiv.appendChild(inputDiv);
                });

                $("#mens").append(containDiv);
            }
        });

        // =================WOMENS==========================
        firebase.database().ref("Seeds/Womens").on("value", (snapshot) => {
            let data = snapshot.val();
            for(x in data.WomensSeedArray){
                let containDiv = document.createElement("div");
                containDiv.classList.add("row");

                let h3 = document.createElement("h3");
                h3.textContent = data.WomensSeedArray[x] + ": ";
                h3.classList.add("col");
                h3.classList.add("m3")
                containDiv.appendChild(h3);

                firebase.database().ref("Seeds/Womens/TeamsScore/" + data.WomensSeedArray[x]).on("value", (snapshot) => {
                    let dataTwo = snapshot.val();
                    let inputDiv = document.createElement("div");
                    inputDiv.id = data.WomensSeedArray[x];
                    let totalNum = 0;

                    for(i in dataTwo){
                        let div = document.createElement("div");
                        div.classList.add("col");
                        div.classList.add("m1");
                        
                        let input = document.createElement("input");
                        if(data.WomensSeedArray[x].includes(" ")){
                            let splitArr = data.WomensSeedArray[x].split(" ");
                            input.id = splitArr.join("00") + "-" + i;
                            inputDiv.id = splitArr.join("00");
                        }else{
                            input.id = data.WomensSeedArray[x] + "-" + i;
                        }
                        input.classList.add("womensScore");
                        if(dataTwo[i] === 0){
                            input.placeholder = "Rd. " + parseInt(i) + " Sc."
                        }else{
                            input.placeholder = dataTwo[i] + "pts";
                            $(input).addClass("blackPlaceholder");
                        }

                        totalNum += parseInt(dataTwo[i]);

                        div.appendChild(input);
                        inputDiv.appendChild(div);
                    }

                    let btn = document.createElement("button");
                    btn.id = data.WomensSeedArray[x];
                    btn.textContent = "Out of the Running";
                    btn.classList.add("col");
                    btn.classList.add("m2");
                    btn.classList.add("outWomens")
                    inputDiv.appendChild(btn);

                    let total = document.createElement("h4");
                    total.textContent = "Total Score: " + totalNum;
                    total.classList.add("col");
                    total.classList.add("m12");
                    total.classList.add("center-align");
                    inputDiv.appendChild(total);

                    firebase.database().ref("Seeds/Womens/OutTeams").on("value", (snapshot) => {
                        let outData = snapshot.val();
                        if(outData != null){
                            for(i = 0; i < outData.length; i++){
                                if(data.WomensSeedArray[x] === outData[i]){
                                    console.log("Working");
                                    $(btn).css("background-color", "#0C2340");
                                    $(btn).css("color", "white");
                                    $(btn).prop("disabled", true);
                                }
                            }
                        }
                    });

                    containDiv.appendChild(inputDiv);
                });

                $("#womens").append(containDiv);
            }
        });

        $(document.body).on("keyup", ".mensScore", (e) => {
            if(e.keyCode === 13){
                mensScore(e.target.id);
            }
        });

        $(document.body).on("keyup", ".womensScore", (e) => {
            if(e.keyCode === 13){
                womensScore(e.target.id);
            }
        });

        $(document.body).on("click", ".outMens", (e) => {
            // console.log(e.target.id);
            outMens(e.target.id);
        });

        $(document.body).on("click", ".outWomens", (e) => {
            // console.log(e.target.id);
            outWomens(e.target.id);
        });

        $(".tabs").tabs();
        $('.modal').modal();
    }

    function outMens(team){
        $(this).css("background-color", "#0C2340");
        $(this).css("color", "white");
        // console.log(team);
        firebase.database().ref("Seeds/Mens").child("OutTeams").transaction((Value) => {
            if(Value === null){
                Value = [team];
            }else{
                Value = Value.push();
            }

            return Value;
        });
    }

    function outWomens(team){
        $(this).css("background-color", "#0C2340");
        $(this).css("color", "white");
        // console.log(team);
        firebase.database().ref("Seeds/Womens").child("OutTeams").transaction((Value) => {
            if(Value === null){
                Value = [team];
            }else{
                Value = Value.push();
            }

            return Value;
        });
    }

    function mensScore(id){
        // console.log("working");
        let score = $("#" + id).val();
        let splitId = id.split("-");
        if(splitId[0].includes("00")){
            console.log("there is 00");
            let teamSplit = splitId[0].split("00");
            let team = teamSplit.join(" ");
            
            firebase.database().ref("Seeds/Mens/TeamsScore/" + team).child(splitId[1]).transaction((Value) => {
                Value = score;
                return Value;
            }).then(() => {
                $("#" + splitId[0]).empty();
            });
        }else{
            console.log("no 00")
            firebase.database().ref("Seeds/Mens/TeamsScore/" + splitId[0]).child(splitId[1]).transaction((Value) => {
                Value = score;
                return Value;
            }).then(() => {
                $("#" + splitId[0]).empty();
            });
        }
    }

    function womensScore(id){
        // console.log("working");
        let score = $("#" + id).val();
        let splitId = id.split("-");
        if(splitId[0].includes("00")){
            console.log("there is 00");
            let teamSplit = splitId[0].split("00");
            let team = teamSplit.join(" ");
            
            firebase.database().ref("Seeds/Womens/TeamsScore/" + team).child(splitId[1]).transaction((Value) => {
                Value = score;
                return Value;
            }).then(() => {
                $("#" + splitId[0]).empty();
            });
        }else{
            console.log("no 00")
            firebase.database().ref("Seeds/Womens/TeamsScore/" + splitId[0]).child(splitId[1]).transaction((Value) => {
                Value = score;
                return Value;
            }).then(() => {
                $("#" + splitId[0]).empty();
            });
        }
    }
})();