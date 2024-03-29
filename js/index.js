async function editMode() {
    //création de la banniére du mode édition
    const body = document.querySelector("body");
    const divBanner = await createBalise("div", "div_banner");
    const penToSquareWhite = await createBalise("i");
    penToSquareWhite.classList.add("fa-regular", "fa-pen-to-square", "pen_to_square_white");
    const modeEditionText = await createBalise("p", "mode_edition_text", "Mode édition");
    const modeEditionButton = await createBalise("button", "mode_edition_button");
    const buttonText = await createBalise("p", "button_text", "publier le changements");
    const divModeEdition = await createBalise("div", "div_mode_edition");

    body.before(divBanner);
    //await addModifierText(divBanner);
    divBanner.appendChild(divModeEdition);
    divModeEdition.appendChild(penToSquareWhite);
    divModeEdition.appendChild(modeEditionText);
    divBanner.appendChild(modeEditionButton);
    modeEditionButton.appendChild(buttonText);

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
    const buttonOpenModal = await createBalise("button", "button_create_modal");
    const titleMesProjects = document.querySelector(".title_mes_projects");
    const divTitleMesProjects = await createBalise("div", "div_title_mes_projects");

    titleMesProjects.appendChild(divTitleMesProjects);
    divTitleMesProjects.appendChild(buttonOpenModal);
    await addModifierText(buttonOpenModal);
}

//function déstinée à la création de la modal
async function createModal() {
    //initialisation de toutes les balises destiné a la modal
    const modal = document.querySelector(".modal");
    const divModal = await createBalise("div", "div_modal");
    const divPhoto = await createBalise("div", "div_photo");
    const buttonTopModal = await createBalise("button", "button_top_modal");
    const titreModal = await createBalise("h3", "titre_modal", "Gallerie photo");
    const iconButtonTop = await createBalise("i");
    iconButtonTop.classList.add("fa-solid", "fa-xmark");
    const buttonAddPhoto = await createBalise("button", "button_add_photo", "Ajouter une photo");
    buttonAddPhoto.classList.add("button_color_green");
    const deleteAllGallery = await createBalise("a", "delete_all_galery", "Supprimer la galerie");
    const contenuModal = await createBalise("div", "contenu_modal");
    const divFooterModal = await createBalise("div", "div_footer_modal");
    const divButtonTopModal = await createBalise("div", "div_button_top_modal");
    const divTitleModal = await createBalise("div", "div_title_modal");


    modal.appendChild(contenuModal);
    contenuModal.appendChild(divModal);
    contenuModal.appendChild(divPhoto);
    divModal.appendChild(divButtonTopModal);
    divButtonTopModal.appendChild(buttonTopModal);
    buttonTopModal.appendChild(iconButtonTop);
    divModal.appendChild(divTitleModal);
    divTitleModal.appendChild(titreModal);
    insertAfter(divFooterModal, contenuModal.lastElementChild);
    divFooterModal.appendChild(buttonAddPhoto);
    divFooterModal.appendChild(deleteAllGallery);

    printWorksModal();
}

//function pour afficher la galerie dans la modal
async function printWorksModal() {
    const removeModalPhoto = document.querySelector(".modal_photo");
    while (removeModalPhoto) {
        console.log("ca boucle");
        const removeModalPhoto = document.querySelector(".modal_photo");
        if (removeModalPhoto) {
            removeModalPhoto.remove();
        } else {
            printWorksModal();
            return;
        }
    }

    //récupérations des works grâce à l'api
    myFetch = await fetch("https://sophie-buel-gc.onrender.com/api/works");
    myFetch = await myFetch.json();

    const divPhoto = document.querySelector(".div_photo");

    for (let i = 0; i < myFetch.length; i++) {
        //création des balises destinées aux works
        const textEditer = await createBalise("p", "text_editer", "éditer");
        const trashCanIcone = await createBalise("i");
        trashCanIcone.classList.add("fa-solid", "fa-trash-can", "fa-xs");
        const buttonTrash = await createBalise("button", "button_trash");
        const worksModalImage = await createBalise("img");
        worksModalImage.src = myFetch[i].imageUrl;
        const modalPhoto = await createBalise("div", "modal_photo");
        const divTrashCan = await createBalise("div", "div_trash_can");
        const divIconeMove = createBalise("div", "div_icone_move");
        const iconeMove = createBalise("i", "icone_move");
        iconeMove.classList.add("fa-solid", "fa-up-down-left-right");

        buttonTrash.setAttribute("id", myFetch[i].id);

        await modalPhoto.appendChild(worksModalImage);
        await modalPhoto.appendChild(textEditer);
        await divPhoto.appendChild(modalPhoto);
        await modalPhoto.appendChild(divTrashCan);
        await divTrashCan.appendChild(buttonTrash);
        await buttonTrash.appendChild(trashCanIcone);
        await divTrashCan.before(divIconeMove);
        await divIconeMove.appendChild(iconeMove);

        divIconeMove.style.visibility = "hidden";

        modalPhoto.addEventListener("mouseenter", () => {
            divIconeMove.style.visibility = "visible";
        });

        modalPhoto.addEventListener("mouseleave", () => {
            divIconeMove.style.visibility = "hidden";
        });

        buttonTrash.onclick = function () {
            buttonDeleteOneWork(buttonTrash, modalPhoto);
        }
    }
}

//function pour afficher la galerie
async function printWorks(idCategory) {
    const removePhotoGallery = document.querySelector(".photo_gallery");
    while (removePhotoGallery) {
        const removePhotoGallery = document.querySelector(".photo_gallery");
        if (removePhotoGallery) {
            removePhotoGallery.remove();
        } else {
            printWorks(idCategory);
            return;
        }
    }
    //récupérations des works grâce à l'api
    myFetchWorks = await fetch("https://sophie-buel-gc.onrender.com/api/works");
    myFetchWorks = await myFetchWorks.json();

    const photoPortfolio = document.getElementsByClassName("gallery")[0];

    if (idCategory) {
        for (let i = 0; i < myFetchWorks.length; i++) {
            if (myFetchWorks[i].category.id == idCategory) {
                const textEditer = await createBalise("p", "text_editer", myFetchWorks[i].title);
                const worksModalImage = await createBalise("img");
                worksModalImage.src = myFetchWorks[i].imageUrl;
                console.log("imageUrl =", myFetchWorks[i].imageUrl);
                const photoGallery = await createBalise("div", "photo_gallery");

                //définition d'un id utiliser pour les filtres
                photoGallery.setAttribute("id", myFetchWorks[i].category.id);

                await photoGallery.appendChild(worksModalImage);
                await photoGallery.appendChild(textEditer);
                await photoPortfolio.appendChild(photoGallery);
            }
        }
    } else {
        for (let i = 0; i < myFetchWorks.length; i++) {
            const textEditer = await createBalise("p", "text_editer", myFetchWorks[i].title);
            const worksModalImage = await createBalise("img");
            worksModalImage.src = myFetchWorks[i].imageUrl;
            console.log("name[%d] = %s", myFetchWorks[i].category.id, myFetchWorks[i].category.id);
            const photoGallery = await createBalise("div", "photo_gallery");

            photoGallery.setAttribute("id", myFetchWorks[i].category.id);

            await photoGallery.appendChild(worksModalImage);
            await photoGallery.appendChild(textEditer);
            await photoPortfolio.appendChild(photoGallery);
        }
    }
}

//function création de la modal pour ajouter des photos
async function addPhotoGallery() {
    const divModalAddPhoto = document.querySelector(".modal_add_photo");
    const buttonArrowLeft = await createBalise("button", "button_arrow_left");
    const arrowLeftIcon = await createBalise("i");
    arrowLeftIcon.classList.add("fa-solid", "fa-arrow-left");
    const titleModalAddPhoto = await createBalise("h3", "title_modal", "Ajout photo");
    const buttonTopModal = await createBalise("button", "button_top");
    const iconButtonTop = await createBalise("i");
    iconButtonTop.classList.add("fa-solid", "fa-xmark");
    const divAddPhoto = await createBalise("div", "div_add_photo");
    const iconPicture = await createBalise("i");
    iconPicture.classList.add("fa-regular", "fa-image");
    const buttonAddPhoto = await createBalise("button");
    buttonAddPhoto.classList.add("button_add_photo", "button_add_photo_modal");
    const textMaxMo = await createBalise("p", "text_max_mo", "jpg.png : 4mo max");
    const divForm = await createBalise("div", "div_form");
    const form = await createBalise("form", "form");
    const formLabelTitre = await createBalise("label", "form_label_titre", "Titre");
    const formInputTitre = await createBalise("input", "form_input_titre");
    const formLabelCategorie = await createBalise("label", "form_label_categorie", "Catégorie");
    const formSelectCategorie = await createBalise("select", "form_select_categorie");
    const formButtonValider = await createBalise("button", "form_button_valider", "Valider");
    const divTopModalAddPhoto = await createBalise("div", "div_top_add_photo");
    const divBottomModalAddPhoto = await createBalise("div", "div_bottom_add_photo");
    const contenuModal = await createBalise("div", "contenu_modal");
    const divTitle = await createBalise("div", "div_title");
    const inputImageFile = await createBalise("input", "input_image_file");
    inputImageFile.setAttribute("type", "file");
    inputImageFile.setAttribute("accept", ".jpg, .jpeg, .png");
    inputImageFile.setAttribute = ("hidden");
    inputImageFile.hidden = true;
    const labelButtonAddPhoto = await createBalise("label", "label_button_add_photo", "+ Ajouter photo");
    const divFormLabelTitre = await createBalise("div", "div_form_label_titre");
    const divFormSelectCategorie = await createBalise("div", "div_form_select_categorie");
    const outputImage = await createBalise("output", "output_image");

    await divModalAddPhoto.appendChild(contenuModal);
    await contenuModal.appendChild(divTopModalAddPhoto);
    await divTopModalAddPhoto.appendChild(buttonArrowLeft);
    await buttonArrowLeft.appendChild(arrowLeftIcon);
    await contenuModal.appendChild(divTitle);
    await divTitle.appendChild(titleModalAddPhoto);
    await divTopModalAddPhoto.appendChild(buttonTopModal);
    await buttonTopModal.appendChild(iconButtonTop);
    await contenuModal.appendChild(divAddPhoto);
    await divAddPhoto.appendChild(outputImage);
    await divAddPhoto.appendChild(iconPicture);
    await divAddPhoto.appendChild(buttonAddPhoto);
    await buttonAddPhoto.appendChild(labelButtonAddPhoto);
    await labelButtonAddPhoto.appendChild(inputImageFile);
    await divAddPhoto.appendChild(textMaxMo);
    await contenuModal.appendChild(divForm);
    await divForm.appendChild(form);
    await form.appendChild(divFormLabelTitre);
    await divFormLabelTitre.appendChild(formLabelTitre);
    await divFormLabelTitre.appendChild(formInputTitre);
    await form.appendChild(divFormSelectCategorie);
    await divFormSelectCategorie.appendChild(formLabelCategorie);
    await divFormSelectCategorie.appendChild(formSelectCategorie);
    await divForm.appendChild(divBottomModalAddPhoto);
    await divBottomModalAddPhoto.appendChild(formButtonValider);

    printCategories(formSelectCategorie);
}

//function pour afficher toutes les differents categorie disponible dans le form de la modal add photo
async function printCategories(formSelectCategorie) {

    myFetch = await fetch("https://sophie-buel-gc.onrender.com/api/categories");
    myFetch = await myFetch.json();

    for (let index = 0; index < myFetch.length; index++) {
        if (index === 0) {
            const optionSelectDisabled = await createBalise("option", "option_defaut", "");
            optionSelectDisabled.setAttribute("value", "disabled");
            optionSelectDisabled.setAttribute("id", "0");

            await formSelectCategorie.appendChild(optionSelectDisabled);
        }
        const optionSelect = await createBalise("option", "option_select", myFetch[index].name);
        optionSelect.setAttribute("id", myFetch[index].id);

        await formSelectCategorie.appendChild(optionSelect);
    }
}

//function qui permet d'inserer un element a la fin d'un element
function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

//function create une balise avec la class donnée en paramétre sinon sans paramétres
function createBalise(balise, classs, text) {
    const newBalise = document.createElement(balise);
    if (classs === undefined && text === undefined) {
        return newBalise;
    } else if (classs !== undefined && text !== undefined) {
        newBalise.classList.add(classs);
        newBalise.textContent = text;
        return newBalise;
    } else if (classs !== undefined && text === undefined) {
        newBalise.classList.add(classs);
        return newBalise;
    } else if (text !== undefined && classs === undefined) {
        newBalise.textContent = text;
        return newBalise;
    } else {
        return newBalise;
    }
}

//function create penToSquareBlack et le texte modifier dans une div définit
async function addModifierText(div) {
    if (div === undefined) {
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

//function pour afficher la modal add photo
async function openModal() {
    const modalGalery = document.getElementsByClassName("modal")[0];
    const buttonOpenModal = document.getElementsByClassName("button_create_modal")[0];

    buttonOpenModal.onclick = function () {
        modalGalery.style.display = "flex";
    }
}

//function pour vérifier si on essaye de fermer une des modals
async function closeModal() {
    const modalGalery = document.querySelector(".modal");
    const modalAddPhoto = document.querySelector(".modal_add_photo");
    const buttonCloseGalery = document.getElementsByClassName("button_top_modal")[0];
    const buttonCloseModal = document.getElementsByClassName("button_top")[0];
    const arrowLeft = document.querySelector(".button_arrow_left");

    window.onclick = function (event) {
        if (event.target == modalGalery || event.target == modalAddPhoto) {
            modalGalery.style.display = "none";
            modalAddPhoto.style.display = "none";
            resetModalAddPhoto();
        }
    }

    buttonCloseGalery.onclick = function () {
        modalGalery.style.display = "none";
        modalAddPhoto.style.display = "none";
        resetModalAddPhoto();
    }

    buttonCloseModal.onclick = function () {
        modalAddPhoto.style.display = "none";
        modalGalery.style.display = "none";
        resetModalAddPhoto();
    }

    arrowLeft.onclick = function () {
        modalAddPhoto.style.display = "none";
        modalGalery.style.display = "flex";
        resetModalAddPhoto();
    }
}

//function pour afficher l'image avant de la publier dans la galerie
function readImage() {
    const input = document.querySelector("input");
    const output = document.querySelector("output");
    const iconeImage = document.getElementsByClassName("fa-image")[0];
    const buttonAddPhotoModal = document.getElementsByClassName("button_add_photo_modal")[0];
    const textMaxMo = document.getElementsByClassName("text_max_mo")[0];
    const divAddPhoto = document.getElementsByClassName("div_add_photo")[0]



    input.addEventListener("change", () => {
        //Vérification que l'image ne fais pas plus de 4 Mo
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const maxFileSize = 4194304; // 4 Mo en octets
            if (file.size > maxFileSize) {
                alert('Le fichier sélectionné est trop volumineux. Veuillez choisir un fichier de moins de 4 Mo.');
                input.value = '';
                return;
            }
        }

        const file = input.files
        const divImage = createBalise("div", "div_image");
        const image = createBalise("img", "image");

        image.src = URL.createObjectURL(file[0]);
        image.width = 129;
        image.height = 193;
        iconeImage.style.display = "none";
        buttonAddPhotoModal.style.display = "none";
        textMaxMo.style.display = "none";
        divAddPhoto.style.padding = 0;
        
        output.appendChild(divImage);
        divImage.appendChild(image);
    })
}

//function qui permet de vérifier si il a quelque chose de modifier dans le form
function postImage() {
    const input = document.querySelector("input");
    const select = document.querySelector("select");
    const inputTitre = document.querySelector(".form_input_titre");

    input.addEventListener("change", () => {
        callTest();
    });
    inputTitre.addEventListener("change", () => {
        callTest();
    });
    select.addEventListener("change", () => {
        callTest();
    });
}

//function pour modifier la couleur du bouton valider de la modal add photo si ton les champs son remplis
function callTest() {
    const image = document.querySelector(".image");
    const title = document.querySelector(".form_input_titre");
    const categorie = document.querySelector(".form_select_categorie");
    const button = document.querySelector(".form_button_valider");

    if (image != null && title.value != "" && categorie.value != "disabled") {
        button.style.background = "#1D6154";
    } else {
        button.style.background = "#A7A7A7";
    }
}

//function utilisé pour tout les boutons ou autres élements qui seront activés
function activate() {
    const modalAddPhoto = document.querySelector(".modal_add_photo");
    const buttonModalAddPhoto = document.getElementsByClassName("button_add_photo")[0];
    const modalGalery = document.querySelector(".modal");
    const formButtonValider = document.querySelector(".form_button_valider");
    const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4 Mo en octets

    buttonModalAddPhoto.onclick = function () {
        modalAddPhoto.style.display = "flex";
        modalGalery.style.display = "none";
    }

    formButtonValider.onclick = function () {
        const image = document.querySelector(".input_image_file");
        const title = document.querySelector(".form_input_titre");
        var categorie = document.querySelector(".form_select_categorie");

        console.log("image.size = %s", image.fileSize);
        // Vérification que le fichier est inférieur à 4 Mo
        if (image.size > MAX_IMAGE_SIZE) {
            console.log('La taille de l\'image dépasse la limite de 4 Mo');
            return;
        }

        idNumber = categorie.selectedIndex;

        const categorieId = categorie.options[idNumber].id;

        const sendWork = new FormData();
        sendWork.append("image", image.files[0]);
        sendWork.append("title", title.value);
        sendWork.append("category", categorieId);


        //envoie d'un Work (photo pour la galerie)
        const myFetch = fetch('https://sophie-buel-gc.onrender.com/api/works', {
            method: "POST",
            headers:
            {
                Authorization: `Bearer ${window.localStorage.getItem("tokenUser")}`,
            },
            body: sendWork,
        })

        myFetch.then(function (response) {
            //Reset la modal add photo
            if (response.ok) {
                console.log("Send");
                resetModalAddPhoto();
                printWorksModal();
                printWorks();
            } else {
                console.log("Not Send");
            }
        });
        console.log("button_valider");
    }

    console.log("modalGalery.style.display == %s", modalGalery.style.display);
    if (modalGalery.style.display == "none") {
        console.log("display != none");
        const modalPhoto = document.querySelector("modal_photo");

        modalPhoto.addEventListener("mouseover", function (event) {
            console.log("hover");
        });
    }
    button_logout_press();
}

//function pour déconnecté l'utilisateur de la page web
function button_logout_press() {
    const button_logout = document.getElementById("id_login");

    button_logout.onclick = function () {
        console.log("button logout press");
        window.localStorage.removeItem("tokenUser");
        location.replace("index.html");
    }
}

//function pour supprimer un Work
function buttonDeleteOneWork(buttonDelete, modalPhoto) {
    modalPhoto.remove();

    const id = buttonDelete.getAttribute("id");

    console.log("number = %d", id);
    fetch(`https://sophie-buel-gc.onrender.com/api/works/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem("tokenUser")}`,
        },
    }).then((response) => {
        if (response.ok) {
            console.log("c'est remove");
            modalPhoto.remove();
        }
    });
}

//function pour reset la modal add photo
function resetModalAddPhoto() {
    const modalAddPhoto = document.querySelector(".modal_add_photo");
    const image = document.querySelector(".input_image_file");
    const title = document.querySelector(".form_input_titre");
    var categorie = document.querySelector(".form_select_categorie");
    const iconeImage = document.getElementsByClassName("fa-image")[0];
    const buttonAddPhotoModal = document.getElementsByClassName("button_add_photo_modal")[0];
    const textMaxMo = document.getElementsByClassName("text_max_mo")[0];
    const divAddPhoto = document.getElementsByClassName("div_add_photo")[0]

    modalAddPhoto.style.display = "none";
    title.value = "";
    categorie.value = "";
    image.value = "";
    iconeImage.style.display = "flex";
    buttonAddPhotoModal.style.display = "flex";
    textMaxMo.style.display = "flex";
    divAddPhoto.style.padding = "30px";
    const imagePrint = document.querySelector(".image");
    if (imagePrint) {
        document.querySelector(".div_image").remove();
    }
}

//function qui crée les différents filtres
function createButtonFilters() {
    const buttonFiltreTous = createBalise("button", "button_filtre_tous", "Tous");
    const buttonFiltreObjets = createBalise("button", "button_filtre_objets", "Objet");
    const buttonFiltreAppartements = createBalise("button", "button_filtre_appartements", "Appartements");
    const buttonFiltreHotelEtRestaurant = createBalise("button", "button_filtre_hotel_et_restaurant", "Hôtels & restaurants");
    const sectionFiltres = createBalise("section", "section_filtres");
    const divGallery = document.querySelector(".gallery");

    divGallery.before(sectionFiltres);
    sectionFiltres.appendChild(buttonFiltreTous);
    sectionFiltres.appendChild(buttonFiltreObjets);
    sectionFiltres.appendChild(buttonFiltreAppartements);
    sectionFiltres.appendChild(buttonFiltreHotelEtRestaurant);

    //si button click afficher tous les works
    buttonFiltreTous.onclick = function () {
        printWorks();
    }

    //si button click afficher tous les Objets
    buttonFiltreObjets.onclick = function () {
        printWorks("1");
    }

    //si button click afficher tous les Appartements
    buttonFiltreAppartements.onclick = function () {
        printWorks("2");
    }

    //si button click afficher tous les Hotels & Restaurants
    buttonFiltreHotelEtRestaurant.onclick = function () {
        printWorks("3");
    }
}

function hoverFilters() {
    console.log("hoverFilters Function");
    const buttonFiltresTous = document.querySelector(".button_filtre_tous");
    const buttonFiltresAutres = document.querySelectorAll(".button_filtre_objets, .button_filtre_appartements, .button_filtre_hotel_et_restaurant");

    buttonFiltresAutres.forEach(function (buttonFiltresAutres) {
        buttonFiltresAutres.addEventListener("mouseover", function () {
            console.log("hover filtres");
            buttonFiltresTous.style.background = "white";
            buttonFiltresTous.style.color = "#1D6154";
        });

        buttonFiltresAutres.addEventListener("mouseout", function () {
            buttonFiltresTous.style.background = "";
            buttonFiltresTous.style.color = "";
        });
    });
}

//la fonction main qui permet d'appeler toutes les fonctions et créer la page
async function main() {
    //récupération du token
    const loged = window.localStorage.getItem("tokenUser");

    //si possesion du token de login
    if (loged) {
        const idLogin = document.getElementById("id_login");
        idLogin.innerHTML = "Logout";
        idLogin.href = "#";
    }

    //si possesion du token de login
    if (loged) {
        await printWorks();
        await editMode();
        await createModal();
        await addPhotoGallery();
        await openModal();
        await closeModal();
        readImage();
        postImage();
        activate();
        console.log("loged");
        console.log("le token index = %s", loged);

        //si on ne posséde pas le token de login just afficher les filtres et les works
    } else {
        await printWorks();
        await createButtonFilters();
        hoverFilters();
    }

}
main();