//je suis pas vide
async function editMode() {
    //création de la banniére du mode édition
    const body = document.querySelector("body");
    const divBanner = await createBalise("div", "div_banner");
    const penToSquareWhite = await createBalise("i");
    penToSquareWhite.classList.add("fa-regular", "fa-pen-to-square", "pen_to_square_white");
    const modeEditionText = await createBalise("p", undefined, "Mode édition");
    const modeEditionButton = await createBalise("button");
    const buttonText = await createBalise("p", undefined, "publier le changements");

    body.before(divBanner);
    await addModifierText(divBanner);
    divBanner.appendChild(modeEditionText);
    divBanner.appendChild(modeEditionButton);
    modeEditionButton.appendChild(buttonText);
    console.log("EDIT-MODE");

    //button modifer en-dessous de l'image-principale
    const imagePrincipale = document.querySelector("#introduction > figure");
    const divImagePrincipale = await createBalise("div", "div_image_principale");

    imagePrincipale.appendChild(divImagePrincipale);
    await addModifierText(divImagePrincipale);

    //button modifier au-dessus de l'article
    const article = document.querySelector("article");
    const divArticle = await createBalise("div", "div_article");

    article.prepend(divArticle);
    await addModifierText(divArticle);

    //button modifier a coté du titre Mes Projets
    const titleMesProjects = document.querySelector(".title_mes_projects");
    const divTitleMesProjects = await createBalise("div", "div_title_mes_projects");

    titleMesProjects.appendChild(divTitleMesProjects);
    await addModifierText(divTitleMesProjects);

}

//function create une balise avec la class donnée en paramétre sinon sans paramétres
function createBalise(balise, classs, text) {
    const newBalise = document.createElement(balise);
    if(classs === undefined && text === undefined) {
        return newBalise;
    } else if(classs !== undefined && text !== undefined) {
        newBalise.classList.add(classs);
        newBalise.textContent = text;
        return newBalise;
    } else if(classs !== undefined && text === undefined) {
        newBalise.classList.add(classs);
        return newBalise;
    } else if(text !== undefined && classs === undefined) {
        newBalise.textContent = text;
        return newBalise;
    }else{
        return newBalise;
    }
}

//function create penToSquareBlack et le texte modifier dans une div définit
async function addModifierText(div) {
    if(div === undefined) {
        return;
    } else {
        //create penToSquareBlack
        penToSquare = await createBalise("i"),
        penToSquare.classList.add("fa-regular", "fa-pen-to-square", "pen_to_square_black")
        div.appendChild(penToSquare);

        //create text modifier
        const modifierTxt = await createBalise("p", undefined, "modifier");
        div.appendChild(modifierTxt);
    }
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