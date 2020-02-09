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
        $("#enter").on("click", login);
    }

    function login(){
        let email = $("#email").val();
        let pass = $("#pass").val();

        firebase.auth().signInWithEmailAndPassword(email, pass).catch((err) => {
            let errCode = err.code;
            if(errCode === 'auth/wrong-password'){
                $("#pass").css("border-bottom-color", "red");
            }

            if(errCode === 'auth/invalid-email'){
                $("#email").css("border-bottom-color", "red");
            }
        });

        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                location.replace("../html/seed.html");
            }
        });
    }
})();