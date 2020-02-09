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

    let mensTotalTeam = 0;
    let womensTotalTeam = 0;

    function init(){
        firebase.initializeApp(firebaseConfig);

        let mensTotalTeam = 0;
        let womensTotalTeam = 0;

        firebase.database().ref("Seeds/Mens").on("value", (snapshot) => {
            let data = snapshot.val();
            for(i in data.MensSeedArray){
                let div = document.createElement("div");
                div.classList.add("row");

                let team = document.createElement("h4");
                team.classList.add("col");
                team.classList.add("m3");
                team.textContent = data.MensSeedArray[i];

                for(x in data.OutTeams){
                    if(data.MensSeedArray[i] === data.OutTeams[x]){
                        $(team).css("color", "red");
                    }
                }

                div.appendChild(team);

                for(y in data.TeamsScore[data.MensSeedArray[i]]){
                    let h5 = document.createElement("h5");
                    h5.textContent = data.TeamsScore[data.MensSeedArray[i]][y];
                    h5.classList.add("col");
                    h5.classList.add("m1");
                    $(h5).css("padding-top", "20px !important;")

                    mensTotalTeam += parseInt(data.TeamsScore[data.MensSeedArray[i]][y]);

                    for(x in data.OutTeams){
                        if(data.MensSeedArray[i] === data.OutTeams[x]){
                            $(h5).css("color", "red");
                        }
                    }

                    div.appendChild(h5);
                }

                let h5Total = document.createElement("h5");
                h5Total.textContent = "Total: " + mensTotalTeam;
                h5Total.classList.add("col");
                h5Total.classList.add("m2");
                div.appendChild(h5Total);

                mensTotalTeam = 0;

                $("#mens").append(div);
            }
        });

        firebase.database().ref("Seeds/Womens").on("value", (snapshot) => {
            let data = snapshot.val();
            for(i in data.WomensSeedArray){
                let div = document.createElement("div");
                div.classList.add("row");
                
                let team = document.createElement("h4");
                team.textContent = data.WomensSeedArray[i];
                team.classList.add("col");
                team.classList.add("m3");

                for(x in data.OutTeams){
                    if(data.WomensSeedArray[i] === data.OutTeams[x]){
                        $(team).css("color", "red");
                        // $(team).css("text-decoration", "line-through")
                    }
                }

                div.appendChild(team);

                for(y in data.TeamsScore[data.WomensSeedArray[i]]){
                    let h5 = document.createElement("h5");
                    h5.textContent = data.TeamsScore[data.WomensSeedArray[i]][y];
                    h5.classList.add("col");
                    h5.classList.add("m1");
                    $(h5).css("padding-top", "20px !important;")

                    womensTotalTeam += parseInt(data.TeamsScore[data.WomensSeedArray[i]][y]);

                    for(x in data.OutTeams){
                        if(data.WomensSeedArray[i] === data.OutTeams[x]){
                            $(h5).css("color", "red");
                        }
                    }

                    div.appendChild(h5);
                }

                let h5Total = document.createElement("h5");
                h5Total.textContent = "Total: " + womensTotalTeam;
                h5Total.classList.add("col");
                h5Total.classList.add("m2");
                div.appendChild(h5Total);

                womensTotalTeam = 0;

                $("#womens").append(div);
            }
        });

        $(".tabs").tabs();
        $("#logout").on("click", logout);
    }

    function logout(){
        firebase.auth().signOut().then(() => {
            location.replace("../html/index.html");
        });    
    }
})();