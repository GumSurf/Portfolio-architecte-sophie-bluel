//je suis pas vide
function editMode() {
    const indexHeader = document.header;
    const testH1 = document.h1;
    const icon = document.getElementById('icon');
    const modeEditionText = document.createElement('p');

    modeEditionText.textContent = 'Mode Edition';

    const body = document.querySelector("body");
    body.before(modeEditionText);
    //indexHeader.before(modeEditionText);
    console.log("EDIT-MODE");
}

function main() {
    //récupération du token
    const loged = window.localStorage.getItem("tokenUser");
    if(loged) {

        editMode();
        console.log("loged");
        console.log("le token index = %s", loged);
    }

}
main();