const form = document.querySelector(".form_login");
const inputs = document.querySelectorAll("input");

form.addEventListener("submit", (event) => {
    // Désactivation du comportement par défaut du navigateur
    event.preventDefault();

    const email = inputs[0].value;
    const password = inputs[1].value;

    const emailPassword = {
        email: email,
        password: password
    };
    console.log("email : %s", email);
    console.log("password : %s", password);

    // Appel de la fonction fetch avec toutes les informations nécessaires
    const myFetch = fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPassword)
    })

    myFetch.then(function (response) {
        if (response.ok) {
            console.log("Connecté");
            //Récupere l'identifiant id_login
            const idLogin = document.getElementById("id_login");
            //modification de l'html grace à l'identifian id_login
            idLogin.innerHTML = "Logout";
            stockageToken();
            //redirection vers index.html
            document.location.href = 'index.html';
        } else {
            //affichage message d'erreur
            const messageErreur = document.querySelector(".text_message_erreur");
            if (messageErreur) {
                const textMessageErreur = document.querySelector(".text_message_erreur");
                textMessageErreur.textContent = "Erreur dans l'identifiant ou le mot de passe";
            } else {
                const textMessageErreur = document.createElement("p");
                textMessageErreur.classList.add("text_message_erreur");
                textMessageErreur.textContent = "Erreur dans l'identifiant ou le mot de passe";
                const divMessageErreur = document.querySelector(".message_erreur");
                divMessageErreur.appendChild(textMessageErreur);
            }
        }
    });

    function stockageToken() {
        //obtention du token
        myFetch.then((resp) => resp.json())
            .then(function (tokenOrNot) {
                if (tokenOrNot.token) {
                    //Stockage du token d'identification dans le local
                    window.localStorage.setItem("tokenUser", tokenOrNot.token);
                    console.log("j'ai le token = %s", tokenOrNot.token);
                }
            });
    }
});