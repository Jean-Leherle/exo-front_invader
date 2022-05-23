var d = document;
console.log('test js')
var pixelId = 0
var invaderElement = d.querySelector('#invader');
var rowDefault = 8;
var columnDefault = 8;
var pixelSizeDefault = 15
var tableColor = ['color--grey', 
'color--dark', 
'color--yellow', 
'color--green',
'color--red',
'color--blue'];
console.log(tableColor);

function popPixel(invaderParent) {
    var pixel = {
        element: undefined,
        color: 0, //en rapport à l'index de tableColor
        column: undefined,
        row: undefined,
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
    var resultat = undefined;
    for (var i = 0; i < invader1.length; i++) {
        if (invader1[i].idPixel == parseInt(elementId)) {
            resultat = invader1[i];
            break;
        }
    }
    if (resultat === undefined) {
        console.log('pas trouvé');
    } else {
        return resultat;
    }
}

function createInvader(ElementParent, row, column) {
    var invader = [];
    var counter = 0;
    ElementParent.style.gridTemplateColumns="repeat("+column+",1fr)";
    ElementParent.style.gridTemplaterows="repeat("+row+",1fr)";
    for (r = 1; r <= row; r++) {
        for (c = 1;  c<= column; c++) {
            invader.push(popPixel(ElementParent));
            invader[counter].row = r;
            invader[counter].column = c;
            counter++;
            // for (var counter = 0; counter < row * column; counter++) {
            //   invader.push(popPixel(invaderElement));
            /*if (invader[counter].color === 'grey') {
                    invader[counter].element.classList.add('color--grey');
                }
        */
        }
    }
    return invader;
}

invader1 = createInvader(invaderElement, rowDefault, columnDefault)
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

function createForm(type, classElement) {
    formElement = d.createElement(type);
    parentElement = d.querySelector('.configuration');
    parentElement.appendChild(formElement);
    formElement.className = classElement;
    return formElement;
}
var rowInputElement = createForm('input', 'rowInput');
rowInputElement.style.borderTopLeftRadius = '1rem';
rowInputElement.style.borderBottomLeftRadius = '1rem';
rowInputElement.type = 'number';
rowInputElement.placeholder = 'nombre de ligne';
rowInputElement.style.textAlign = 'center';
rowInputElement.min = '1'

var columnInputElement = createForm('input', 'columninput');
columnInputElement.type = 'number';
columnInputElement.placeholder = 'nombre de colonne';
columnInputElement.style.textAlign = 'center';
columnInputElement.min = '1'

var pixelSizeInputElement = createForm('input', 'pixelSizeInput')
pixelSizeInputElement.type = 'number';
pixelSizeInputElement.placeholder = 'nombre de pixel';
pixelSizeInputElement.min = '1'

pixelSizeInputElement.style.textAlign = 'center';

var buttonElement = createForm('button', 'buttonValidate')
buttonElement.style.borderTopRightRadius = '1rem';
buttonElement.style.borderBottomRightRadius = '1rem';
buttonElement.innerText = 'valider'
buttonElement.style.color = 'white'
buttonElement.style.backgroundColor = '#9b68e4'

buttonElement.addEventListener('click', validate)

function validate(event) {
    event.preventDefault();
    //verification que la taille des pixels corresponds.
    pixelSizeInputElement!==""?pixelSizeDefault=pixelSizeInputElement.value:{}
    d.querySelectorAll('.pixel').forEach(function(elem) {
        elem.style.width  = pixelSizeDefault+"px";
        elem.style.height = pixelSizeDefault+"px";
    })
    pixelSizeInputElement.value="";

    if (rowInputElement.value !== "" || columnInputElement.value !== "") {
        //cas de figure ou il y a un changement du nombre de row ou de colonne -> reset du tableau
        rowInputElement.value !== "" ? rowDefault = rowInputElement.valueAsNumber : {};
        columnInputElement.value !== "" ? columnDefault = columnInputElement.valueAsNumber : {};
        pixelId = 0;
        d.querySelector('#invader').innerHTML = "";
        invader1 = [];
        invader1 = createInvader(invaderElement, rowDefault, columnDefault);
    }
    rowInputElement.value="";
    columnInputElement.value="";
}



