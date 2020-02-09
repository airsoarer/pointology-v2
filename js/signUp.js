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
        $('select').formSelect();
        $("#enter").on("click", signUp);
    }

    function signUp(){
        let fname = $("#fname").val();
        let lname = $("#lname").val();
        let teamName = $("#team").val();
        let email = $("#email").val();
        let state = $('select').val();
        let city = $("#city").val();
        let passOne = $("#passOne").val();
        let passTwo = $("#passTwo").val();

        if(fname === ""){
            $("#fname").css("border-bottom-color", "red");
            $("#fields").css("display", "block");
        }else if(lname === ""){
            $("#lname").css("border-bottom-color", "red");
            $("#fields").css("display", "block");
        }else if(team === ""){
            $("#team").css("border-bottom-color", "red");
            $("#fields").css("display", "block");
        }else if(email === ""){
            $("#email").css("border-bottom-color", "red");
            $("#fields").css("display", "block");
        }else if(state === ""){
            $("select").css("border-bottom-color", "red");
            $("#fields").css("display", "block");
        }else if(city === ""){
            $("#city").css("border-bottom-color", "red");
            $("#fields").css("display", "block");
        }else{   
            if(passOne === passTwo && passOne.length > 8 && passOne.includes("1") || passOne.includes("2") || passOne.includes("3") || passOne.includes("4") || passOne.includes("5") || passOne.includes("6") || passOne.includes("7") || passOne.includes("8") || passOne.includes("9") || passOne.includes("0")){
                firebase.auth().createUserWithEmailAndPassword(email, passOne).catch((err) => {
                    if(err.code === "auth/email-already-in-use"){
                        $("#email").css("border-bottom-color", "red");
                        $("#emailInUse").css("display", "block");
                    }
                });
                firebase.auth().onAuthStateChanged((user) => {
                    if(user){
                        console.log(user);
                        let uid = user.uid
                        firebase.database().ref("Users/" + uid + "/Info").set({
                            FirstName: fname,
                            LastName: lname,
                            Eamil: email,
                            State: state,
                            City: city,
                        }).then(() => {
                            location.replace("../html/seed.html");
                        });
                    }
                });
            }else{
                $("#passOne, #passTwo").css("border-bottom-color", "red");
            }
        }
    }
})();