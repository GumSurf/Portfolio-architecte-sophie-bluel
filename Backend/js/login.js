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
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPassword)
    }) .then(function(response) {
        if(response.ok) {
            console.log("Connecté");
        } else {
            console.log("Pas Connecté");
        }
    })
});