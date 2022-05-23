var d = document;
console.log('test js')
var pixelId = 0
var invaderElement = d.querySelector('#invader');
var ligneDefault = 8;
var columnDefault = 8;
var tableColor = ['color--grey', 'color--dark', 'color--yellow', 'color--green'];
console.log(tableColor);

function popPixel(invaderParent) {
    var pixel = {
        element: undefined,
        color: 0, //en rapport à l'index de tableColor
        column: undefined,
        ligne: undefined,
        idPixel: pixelId,
    }
    pixel.element = d.createElement('div');
    pixel.element.className = "pixel " + tableColor[pixel.color];
    pixel.element.id = pixel.idPixel;
    invaderParent.appendChild(pixel.element);
    pixel.element.addEventListener('click', handleChangeColor)
    pixelId++;
    return pixel;
}

function handleChangeColor(event) {
    var pixelCible = recherchePixelById(event.target.id)
    changeColor(pixelCible)
}

/* recherche et renvoie l'objet pixel parmis tous les pixels
pour chaque pixel
COMPARER pixel.idPixel avec divElement.id ?

renvoie l'objet pixel

*/
function recherchePixelById(elementId) {
    var resultat= undefined;
    for (var i = 0; i < invader1.length; i++) {
        if (invader1[i].idPixel == parseInt(elementId)) {
            resultat=invader1[i];
            break;
        }
    }
    if (resultat===undefined ){
        console.log('pas trouvé');
    }
    else{
        return resultat;
    }
}

function createInvader(ElementParent, ligne, column) {
    var invader = [];
    var counter = 0;

    for (c = 1; c <= column; c++) {
        for (l = 1; l <= ligne; l++) {
            invader.push(popPixel(ElementParent));
            invader[counter].ligne = l;
            invader[counter].column = c;
            counter++;
            // for (var counter = 0; counter < ligne * column; counter++) {
            //   invader.push(popPixel(invaderElement));
            /*if (invader[counter].color === 'grey') {
                    invader[counter].element.classList.add('color--grey');
                }
        */
        }
    }
    return invader;
}

invader1 = createInvader(invaderElement, ligneDefault, columnDefault)
console.log('variable invader : ', invader1);
console.log('variable invader[0] : ', invader1[0]);
console.log('valeur de classList[1]', invader1[0].idPixel)
console.log('valeur de classList[1]', invader1[0].element.classList[1])

/* function changeColor(pixel) {
    var oldColor=pixel.color;
    pixel.color = (pixel.color + 1) % tableColor.length; //si pixel.color>3 { pixel.color =0}, % signifie modulo et permet d'obtenir le reste d'une division euclidienne
// ^ passe a la couleur suivante
    pixel.element.classList.replace(tableColor[oldColor], tableColor[pixel.color])
            //   ^     remplace            l'ancienne    par celle qu'on viens de lui affecter
} */

function changeColor(pixel) {
    pixel.element.classList.replace(tableColor[pixel.color], tableColor[pixel.color = (pixel.color + 1) % tableColor.length])
}
/* changeColor(invader1[0]); */

console.log('variable invader[0] apres changement de couleur: ', invader1[0]);

