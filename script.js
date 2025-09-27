
// 1. MODIFICATION DU LIEN WIKIPEDIA
let lienWiki = document.querySelector("a");
lienWiki.href = "https://fr.wikipedia.org";
lienWiki.textContent = "La page principale de Wikipédia (FR)";

// 2. VÉRIFICATION OUI/NON
let boutonOk = document.querySelector('input[type="button"]');
let inputText = document.querySelector('input[type="text"]');
boutonOk.addEventListener('click', function() {
    let texte = inputText.value.trim().toLowerCase();
    if (texte !== "oui" && texte !== "non") {
        inputText.value = "Il faut mettre Oui ou Non";
    }
});

// 3. RENAME DES RADIOS
document.getElementById("radio1").nextSibling.textContent = " HP";
document.getElementById("radio2").nextSibling.textContent = " Casque"; 
document.getElementById("radio3").nextSibling.textContent = " Bluetooth";

// 4. SYSTÈME VOLUME - STYLE AMÉLIORÉ !
let volumeRange = document.querySelector('input[type="range"]');
volumeRange.max = 100;

//  STYLE POUR RENDRE LA BARRE VISIBLE
volumeRange.style.width = "400px";
volumeRange.style.height = "25px";
volumeRange.style.background = "linear-gradient(90deg, #4ecdc4, #556270)";
volumeRange.style.borderRadius = "15px";
volumeRange.style.border = "3px solid #556270";
volumeRange.style.cursor = "pointer";
volumeRange.style.margin = "10px 0";

// Trouver le texte "Volume" 
let volumeText = volumeRange.nextSibling;

// Créer l'affichage de valeur UNE SEULE FOIS
let valeurVolumeDisplay = document.createElement("div");
volumeText.parentNode.insertBefore(valeurVolumeDisplay, volumeText.nextSibling);

//  STYLE POUR L'AFFICHAGE DE VALEUR
valeurVolumeDisplay.style.fontSize = "18px";
valeurVolumeDisplay.style.fontWeight = "bold";
valeurVolumeDisplay.style.margin = "5px 0";
valeurVolumeDisplay.style.color = "green";
valeurVolumeDisplay.textContent = "🔊 Volume : " + volumeRange.value;

// Événement pour mettre à jour la valeur
volumeRange.addEventListener('input', function() {
    valeurVolumeDisplay.textContent = "🔊 Volume : " + this.value;
});

// 5. CHANGER "Volume" en "Volume HP/Casque/Bluetooth"
let radios = document.querySelectorAll('input[name="choix"]');
radios.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.checked) {
            if (this.value == "1") volumeText.textContent = " Volume HP";
            else if (this.value == "2") volumeText.textContent = " Volume Casque";
            else if (this.value == "3") volumeText.textContent = " Volume Bluetooth";
            
            // Mettre à jour aussi l'affichage
            valeurVolumeDisplay.textContent = "🔊 Volume : " + volumeRange.value;
        }
    });
});

// 6. MUTE SYSTEM  !
let checkbox = document.querySelector('input[type="checkbox"]');
// Renommer la checkbox 
checkbox.nextSibling.textContent = " Mute";

// Désactiver le volume 
checkbox.addEventListener('change', function() {
    volumeRange.disabled = this.checked;
    
    if (this.checked) {
        //  STYLE MUTE 
        volumeRange.style.background = "linear-gradient(90deg, #ff6b6b, #556270)";
        volumeRange.style.border = "3px solid #ff6b6b";
        volumeRange.style.opacity = "0.8";
        valeurVolumeDisplay.textContent = "🔇 MUTED - Valeur : " + volumeRange.value;
        valeurVolumeDisplay.style.color = "red";
    } else {
        //  STYLE ACTIF
        volumeRange.style.background = "linear-gradient(90deg, #4ecdc4, #556270)";
        volumeRange.style.border = "3px solid #556270";
        volumeRange.style.opacity = "1";
        valeurVolumeDisplay.textContent = "🔊 Volume : " + volumeRange.value;
        valeurVolumeDisplay.style.color = "green";
    }
});

// === AJOUT D'IMAGE DANS LA SECTION "LIEN ET IMAGES" ===

// 1. Trouver la div "Lien et images"
let divLienImages = document.querySelector('.box h3').parentElement;

// 2. Créer la nouvelle image
let nouvelleImage = document.createElement('img');
nouvelleImage.src = 'https://upload.wikimedia.org/wikipedia/commons/b/bd/UPHF_logo.svg';
nouvelleImage.alt = 'Logo UPHF';
nouvelleImage.width = 200;
nouvelleImage.style.marginTop = '10px';

// 3. Ajouter l'image à la fin de la div
divLienImages.appendChild(nouvelleImage);

//  SYSTÈME DE MENU
window.addEventListener('DOMContentLoaded', function() {
    let sections = document.querySelectorAll('.box');
    
    // 1. Créer le menu dynamiquement
    let menuHTML = `
        <div class="menu-options" style="margin-bottom: 20px; padding: 10px; background: #f5f5f5;">
            <strong>Menu :</strong><br>
            <input type="checkbox" id="menu1" checked> Lien et images<br>
            <input type="checkbox" id="menu2"> Des éléments !<br>
            <input type="checkbox" id="menu3"> Barres de progression<br>
        </div>
    `;
    
    sections[0].insertAdjacentHTML('afterbegin', menuHTML);
    
    // 2. Cacher les sections sauf la première
    for (let i = 1; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }
    
    // 3. Gérer les checkboxes
    let checkboxesMenu = document.querySelectorAll('.menu-options input[type="checkbox"]');
    checkboxesMenu.forEach(function(checkbox, index) {
        checkbox.addEventListener('change', function() {
            sections[index].style.display = this.checked ? 'block' : 'none';
        });
    });

    //  RESET des cases radio et checkboxes à l'ouverture
    let radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => radio.checked = false);

    let checkboxes = document.querySelectorAll('input[type="checkbox"]:not(.menu-options input)');
    checkboxes.forEach(checkbox => checkbox.checked = false);
});

// RÉCUPÉRER L'ANNÉE DE LA DATE 
let inputDate = document.querySelector('input[type="date"]');

inputDate.addEventListener('change', function() {
    let dateChoisie = new Date(this.value);
    let annee = dateChoisie.getFullYear();   // extrait l'année
    console.log("Année choisie :", annee);
});

// BARRES DE PROGRESSION QUI AVANCENT AUTOMATIQUEMENT 
let progressBars = document.querySelectorAll("progress");

// Initialiser les barres à 0
progressBars.forEach(bar => bar.value = 0);

// Faire progresser de 5% toutes les secondes
setInterval(function() {
    progressBars.forEach(bar => {
        if (bar.value < bar.max) {
            bar.value += 5;
        }
    });
}, 1000);
