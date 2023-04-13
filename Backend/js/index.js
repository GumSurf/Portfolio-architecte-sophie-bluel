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

//function déstinée à la création de la modal
async function createModal() {
    //initialisation de toutes les balises destiné a la modal
    const modal = document.querySelector(".modal");
    const divModal = await createBalise("div", "div_modal");
    const divButtonTopModal = await createBalise("button", "button_top_modal");
    const titreModal = await createBalise("h2", "titre_modal", "Gallerie photo");
    const moveIcon = await createBalise("i");
    moveIcon.classList.add("fa-solid", "fa-up-down-left-right");
    const deleteIcon = await createBalise("i");
    deleteIcon.classList.add("fa-solid", "fa-trash-can");
    const buttonAddPhoto = await createBalise("button", "button_add_photo", "Ajouter une photo");
    const deleteAllGallery = await createBalise("a", "delete_all_galery", "Supprimer la galerie");

    modal.appendChild(divModal);
    divModal.appendChild(divButtonTopModal);
    divModal.appendChild(titreModal);
    divModal.appendChild(moveIcon);
    divModal.appendChild(deleteIcon);
    divModal.appendChild(buttonAddPhoto);
    divModal.appendChild(deleteAllGallery);

    printWorksModal();
}

async function printWorksModal() {
    myFetch = await fetch("http://localhost:5678/api/works");
    myFetch = await myFetch.json();

    const divModal = document.querySelector(".modal");
    const iconButtonTop = await createBalise("i");
    iconButtonTop.classList.add("fa-solid", "fa-xmark");

    await divModal.appendChild(iconButtonTop);

    for (let i = 0; i < myFetch.length; i++) {

        const textEditer = await createBalise("p", "text_editer", "éditer");
        const trashCanIcone = await createBalise("i");
        trashCanIcone.classList.add("fa-solid", "fa-trash-can");
        const worksModalImage = await createBalise("img");
        worksModalImage.src = myFetch[i].imageUrl;

        await divModal.appendChild(trashCanIcone);
        await divModal.appendChild(worksModalImage);
        await divModal.appendChild(textEditer);

        console.log("\n*****SEPARATION*****\n");
        console.log("myFetch = %s", myFetch[i]);
        console.log("myFetch.id = %s", myFetch[i].id);
        console.log("myFetch.title = %s", myFetch[i].title);
        console.log("myFetch.imageUrl = %s", myFetch[i].imageUrl);
        console.log("myFetch.categoryId = %s", myFetch[i].categoryId);
        console.log("myFetch.userId = %s", myFetch[i].userId);
        console.log("myFetch.category = %s", myFetch[i].category);
        console.log("myFetch.category.id = %s", myFetch[i].category.id);
        console.log("myFetch.category.name = %s", myFetch[i].category.name);
        console.log("\n*****SEPARATION*****\n");
    }
}

//function création de la modal pour ajouter des photos
async function addPhotoGallery() {
    const divModalAddPhoto = document.querySelector(".modal_add_photo");
    const arrowLeftIcon = await createBalise("i");
    arrowLeftIcon.classList.add("fa-solid", "fa-arrow-left");
    const titleModalAddPhoto = await createBalise("h3", "title_modal_add_photo", "Ajout photo");
    const iconButtonTop = await createBalise("i");
    iconButtonTop.classList.add("fa-solid", "fa-xmark");
    const sectionAddPhoto = await createBalise("section", "section_add_photo");
    const iconPicture = await createBalise("i");
    iconPicture.classList.add("fa-thin", "fa-image");
    const buttonAddPhoto = await createBalise("button", "button_add_photo", "+ Ajouter photo");
    const textMaxMo = await createBalise("p", "text_max_mo", "jpg.png : 4mo max");
    const sectionForm = await createBalise("section", "section_form");
    const form = await createBalise("form", "form");
    const formLabelTitre = await createBalise("label", "form_label_titre", "Titre");
    const formInputTitre = await createBalise("input", "form_input_titre");
    const formLabelCategorie = await createBalise("label", "form_label_categorie", "Catégorie");
    const formInputCategorie = await createBalise("input", "form_input_categorie");
    const divLiseretGris = await createBalise("div", "div_liseret_gris");
    const formButtonValider = await createBalise("button", "form_button_valider", "Valider");

    await divModalAddPhoto.appendChild(arrowLeftIcon);
    await divModalAddPhoto.appendChild(titleModalAddPhoto);
    await divModalAddPhoto.appendChild(iconButtonTop);
    await divModalAddPhoto.appendChild(sectionAddPhoto);
    await divModalAddPhoto.appendChild(iconPicture);
    await divModalAddPhoto.appendChild(buttonAddPhoto);
    await divModalAddPhoto.appendChild(textMaxMo);
    await divModalAddPhoto.appendChild(sectionForm);
    await divModalAddPhoto.appendChild(form);
    await divModalAddPhoto.appendChild(formLabelTitre);
    await divModalAddPhoto.appendChild(formInputTitre);
    await divModalAddPhoto.appendChild(formLabelCategorie);
    await divModalAddPhoto.appendChild(formInputCategorie);
    await divModalAddPhoto.appendChild(divLiseretGris);
    await divModalAddPhoto.appendChild(formButtonValider);
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
        createModal();
        addPhotoGallery();
        console.log("loged");
        console.log("le token index = %s", loged);
    }

}
main();