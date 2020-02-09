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

    function init(){
        firebase.initializeApp(firebaseConfig);
        firebase.database().ref("Seeds").on("value", (snapshot) => {
            let data = snapshot.val();
            if(data.Mens.SeedCreated) {
                $("#noMensSeed").css("display", "none");
            }

            if(data.Womens.SeedCreated) {
                $("#noWomensSeed").css("display", "none");
            }
        });

        $(".bodyContain").css("height", "auto");

        firebase.database().ref("Admin/MensEntries").on("child_added", (snapshot) => {
            let data = snapshot.val();

            let li = document.createElement("li");

            let divHeader = document.createElement("div");
            divHeader.classList.add("collapsible-header");
            li.appendChild(divHeader);

            firebase.database().ref("Users/" + data.UID + "/Info").on("value", (snapshot) => {
                let dataTwo = snapshot.val();

                let h5 = document.createElement("h5");
                h5.classList.add("truncate");
                h5.textContent = data.EntryName + " - " + dataTwo.FirstName + " " + dataTwo.LastName;
                divHeader.appendChild(h5);
            });

            let divBody = document.createElement("div");
            $(divBody).css("height", "460px !important");
            divBody.classList.add("collapsible-body");
            li.appendChild(divBody);

            for(let i = 0; i < data.EntryArray.length; i++){
                let div = document.createElement("div");
                div.classList.add("col");
                div.classList.add("s6");
                div.classList.add("m3");
                divBody.appendChild(div);

                let seedNumber = document.createElement("h5");
                seedNumber.textContent = "Seed " + (i+1) + " Choice: ";
                div.appendChild(seedNumber);

                let teamNumber = document.createElement("p");
                teamNumber.textContent = data.EntryArray[i];
                div.appendChild(teamNumber);
            }

            let currentScore = document.createElement("h4");
            currentScore.classList.add("score");
            divBody.appendChild(currentScore);

            firebase.database().ref("Users/" + data.UID + "/Entries/Mens/" + data.EntryUID).on("value", (snapshot) => {
                let data = snapshot.val();
                currentScore.textContent = "Current Score: " + data.Score + "pts";
            });

            $(".mensCollapsible").append(li);
        });

        firebase.database().ref("Admin/WomensEntries").on("child_added", (snapshot) => {
            let data = snapshot.val();

            let li = document.createElement("li");

            let divHeader = document.createElement("div");
            divHeader.classList.add("collapsible-header");
            li.appendChild(divHeader);

            firebase.database().ref("Users/" + data.UID + "/Info").on("value", (snapshot) => {
                let dataTwo = snapshot.val();

                let h5 = document.createElement("h5");
                h5.textContent = data.EntryName + " - " + dataTwo.FirstName + " " + dataTwo.LastName;
                divHeader.appendChild(h5);
            });

            let divBody = document.createElement("div");
            $(divBody).css("height", "460px !important");
            divBody.classList.add("collapsible-body");
            li.appendChild(divBody);

            for(let i = 0; i < data.EntryArray.length; i++){
                let div = document.createElement("div");
                div.classList.add("col");
                div.classList.add("s6");
                div.classList.add("m3");
                divBody.appendChild(div);

                let seedNumber = document.createElement("h5");
                seedNumber.textContent = "Seed " + (i+1) + " Choice: ";
                div.appendChild(seedNumber);

                let teamNumber = document.createElement("p");
                teamNumber.textContent = data.EntryArray[i];
                div.appendChild(teamNumber);
            }

            let currentScore = document.createElement("h4");
            currentScore.classList.add("score");
            divBody.appendChild(currentScore);

            firebase.database().ref("Users/" + data.UID + "/Entries/Womens").on("child_added", (snapshot) => {
                let data = snapshot.val();
                currentScore.textContent = "Current Score: " + data.Score + "pts";
            });

            $(".womensCollapsible").append(li);
        });

        $('.tabs').tabs();
        $('.collapsible').collapsible();
        $("#logout").on("click", logout);
        $("#createMensSeeds").on("click", createMensSeeds);
        $("#createWomensSeeds").on('click', createWomensSeeds);
        $("#enter").on("click", create);
        $("#womenEnter").on("click", womenCreate);
    }

    function womenCreate(){
        let teamsArr = [];
        let seedTwo = $(".seedTwo");

        for(let i = 0; i < seedTwo.length; i++){
           teamsArr.push($(seedTwo[i]).val());
        }

        firebase.database().ref("Seeds/Womens").update({
            WomensSeedArray:teamsArr
        }).then(() => {
            firebase.database().ref("Seeds/Womens").child("SeedCreated").transaction((Value) => {
                Value = true
                return Value;
            });
        }).then(() => {
            for(i in teamsArr){
                teamsArr[i];
                firebase.database().ref("Seeds/Womens/TeamsScore/" + teamsArr[i]).set({
                    1:0,
                    2:0,
                    3:0,
                    4:0,
                    5:0,
                    6:0,
                    7:0
                });
            }
        }).then(() => {
            $("#womensSeeds").css("display", "none");
            $(".womensCollapsible").css("display", "block");
        });
    }

    function create(){
        let teamsArr = [];
        let seedOne = $(".seedOne");

        for(let i = 0; i < seedOne.length; i++){
           teamsArr.push($(seedOne[i]).val());
        }

        firebase.database().ref("Seeds/Mens").update({
            MensSeedArray:teamsArr
        }).then(() => {
            firebase.database().ref("Seeds/Mens").child("SeedCreated").transaction((Value) => {
                Value = true
                return Value;
            });
        }).then(() => {
            for(i in teamsArr){
                teamsArr[i];
                firebase.database().ref("Seeds/Mens/TeamsScore/" + teamsArr[i]).set({
                    1:0,
                    2:0,
                    3:0,
                    4:0,
                    5:0,
                    6:0,
                    7:0
                });
            }
        }).then(() => {
            $("#mensSeeds").css("display", "none");
            $(".mensCollapsible").css("display", "block");
        });
    }

    function createMensSeeds(){
        $("#noMensSeed").css("display", "none");
        $("#mensSeeds").css("display", "block");
    }

    function createWomensSeeds(){
        $("#noWomensSeed").css("display", "none");
        $("#womensSeeds").css("display", "block");
    }

    function logout(){
        firebase.auth().signOut().then(() => {
            location.replace("../html/adminLogin.html");
        });    
    }
})();