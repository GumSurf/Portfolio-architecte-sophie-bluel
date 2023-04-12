const form = document.querySelector(".form_login");
const inputs = document.querySelectorAll("input");

form.addEventListener("submit", (event) => {
    // Désactivation du comportement par défaut du navigateur
    event.preventDefault();

    const email = inputs[0].value;
    const password = inputs[1].value;

    const emailPassword = {
        email : email,
        password : password
    };
    console.log("test : %s %s", email, password);

    // Appel de la fonction fetch avec toutes les informations nécessaires
    //**Commentaire à moi même ne pas mettre de s a "api"**
    const myFetch = fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPassword)
    })

    myFetch.then(function(response) {
        if(response.ok) {
            console.log("Connecté");
            //Récupere l'identifiant id_login
            const idLogin = document.getElementById("id_login");
            //modification de l'html grace à l'identifian id_login
            idLogin.innerHTML = "Logout";
            stockageToken();
            //redirection vers index.html
            document.location.href="file:///home/gumsurf/Travail/Projects%20Web/OpenClassRooms/Tuto.HTML5.CSS3/Formation%20Openclassroom/Portfolio-architecte-sophie-bluel/FrontEnd/index.html";
        } else {
            console.log("Pas Connecté");
        }
    });

    function stockageToken() {
        //obtention du token
        myFetch.then((resp) => resp.json())
        .then(function(tokenOrNot) {
            if(tokenOrNot.token) {
                //Stockage du token d'identification dans le local
                window.localStorage.setItem("tokenUser", tokenOrNot.token);
                console.log("j'ai le token = %s", tokenOrNot.token);
            }
        });
    }
});