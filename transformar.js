var arrayEsteno = [];
var textoEstenografico;



function processFiles(files) {
    var file = files[0];

    var reader = new FileReader();

    reader.onload = function (e) {
        // Cuando éste evento se dispara, los datos están ya disponibles.
        // Se trata de copiarlos a una área <div> en la página.
        var output = document.getElementById("fileOutput");
        //output.textContent = e.target.result;
        $('#summernote').summernote('code', e.target.result);
    };
    reader.readAsText(file);
}

function esVocal(letra) {

    if (letra == 'a' || letra == 'e' || letra == 'i' || letra == 'o' || letra == 'u' || letra == 'A' || letra == 'E' || letra == 'I' || letra == 'O' || letra == 'U') {

        console.log("la letra ingresada es una vocal");
        return true

    }

    else {

        console.log("la letra ingresada es una consonante");
        return false

    }
}


function principioDePalabra(palabra) {

    arrayLetras = palabra.split("");
    tamLetras = arrayLetras.length;
    palabraArmada = "";

    //Regla numero 2 La consonante que sigue a un principio no se debe contraer:
    //Palabra  Correcta incorrecta 
    //concreto  :creto    ::eto
    charEspecial = ';:-°÷¡#"'

    for (let index = 0; index < tamLetras; index++) {
        letra = arrayLetras[index][0];
        yaEstenografiada = charEspecial.indexOf(letra, 0) == 1;
        ultimaLetra = index == (tamLetras - 1);

        switch (palabraArmada) {
            case "com":
                if (esVocal(letra) || yaEstenografiada || ultimaLetra) {
                    palabraArmada += letra;
                } else {

                    palabraArmada = "-" + letra;
                }
                break;
            case "con":
                if (esVocal(letra) || yaEstenografiada || ultimaLetra) {
                    palabraArmada += letra;
                } else {

                    palabraArmada = ":" + letra;
                }
                break;
            case "dis":
                if (esVocal(letra) || yaEstenografiada || ultimaLetra) {
                    palabraArmada += letra;
                } else {

                    palabraArmada = "÷" + letra;
                }
                break;
            case "entre":
                if (esVocal(letra) || yaEstenografiada || ultimaLetra) {
                    palabraArmada += letra;
                } else {

                    palabraArmada = "°" + letra;
                }
                break;
            case "ex":
                if (esVocal(letra) || yaEstenografiada || ultimaLetra) {
                    palabraArmada += letra;
                } else {

                    palabraArmada = "x" + letra;
                }
                break;
            case "inter":
                if (esVocal(letra) || yaEstenografiada || ultimaLetra) {
                    palabraArmada += letra;
                } else {

                    palabraArmada = "y" + letra;
                }
                break;
            case "pre":
                if (esVocal(letra) || yaEstenografiada || ultimaLetra) {
                    palabraArmada += letra;
                } else {

                    palabraArmada = "¡" + letra;
                }
                break;
            case "re":
                if (esVocal(letra) || yaEstenografiada || ultimaLetra) {
                    palabraArmada += letra;
                } else {

                    palabraArmada = "r" + letra;
                }
                break;
            case "sobre":
                if (esVocal(letra) || yaEstenografiada || ultimaLetra) {
                    palabraArmada += letra;
                } else {

                    palabraArmada = ";" + letra;
                }
                break;
            default:
                palabraArmada += letra;
                break;
        }

    }

    return palabraArmada;
}


function terminacionWord(palabra) {
    var tersPlural = {"acciones":"a#ë","ecciones":"e#ë","icciones":"i#ë","ucciones":"u#ë","andos":"îds","endos":"¿ds","iendos":"÷ds","mentes":"ms","ques":"qs","iones":"#ë"}
    var ters = {"acción":"a#","ección":"e#","icción":"i#","ucción":"u#","ando":"îd","endo":"¿d","iendo":"÷d","mente":"m","que":"q","ión":"#"}
    var allTers = Object.assign({}, tersPlural, ters)
    //console.log(allTers)

    for (var terminacion in allTers) {
        var regExp = new RegExp(terminacion + '$')
        //console.log(regExp)
        var cambio = palabra.replace(regExp, allTers[terminacion])
        if (palabra !== cambio) {
            //console.log("cambiar " + terminacion + " por " + allTers[terminacion])
            return cambio
        }
    }

    return palabra
}



function myFunction(texto) {
    var estenografia = JSON.parse(data)
    var estenografia2 = JSON.parse(dataDos)
    var textoSeparado = texto.split(" ")
    arrayEsteno = [];
    console.log(textoSeparado)

    var valor
    textoSeparado.forEach(function (element) {
        //console.log(element + " " + estenografia[0][element])
        if (estenografia[0][element]) {
            valor = estenografia[0][element]

        } else if (estenografia2[0][element]) {
            valor = estenografia2[0][element]
        } else {
            valor = element;
        }
        arrayEsteno.push(valor)
    });

    return arrayEsteno;

}

function transACadena() {
    textoEstenografico = "";
    for (let index = 0; index < arrayEsteno.length; index++) {
        const element = arrayEsteno[index];
        console.log(element);
        textoEstenografico = textoEstenografico + " " + element;
    }

    var textoTransformadoEstenografico = window.document.braille.salidaEstenografico;
    console.log(textoEstenografico);
    textoTransformadoEstenografico.value = textoEstenografico;

    arrayEsteno = [];
    transform();
}

function ajustarTexto(texto, filas, columnas) {

    arrayPalabras = [];
    arrayPalabras = texto;
    tamPalabras = arrayPalabras.length;
    i = 1;
    texto = "";
    countFilas = 1;
    countColumnas = 1;
    charEspe = ",();.¿:°!-÷¡#¨"

    for (var i = 0; i < tamPalabras; i++) {
        palabra = terminacionWord(principioDePalabra(arrayPalabras[i]));
        arrayLetras = palabra.split("");
        tamLetras = arrayLetras.length;

        for (var j = 0; j < tamLetras; j++) {

            if (countFilas >= filas) {

                if (countColumnas >= columnas) {
                    texto += "                              \n";
                    countColumnas = 1;
                }

                texto += "\n";
                countFilas = 1;
                countColumnas++;
                j--;
            }
            else if (esMayuscula(arrayLetras[j][0])) {
                letra = arrayLetras[j][0];
               
                if (!(charEspe.indexOf(letra) == -1) || letra.charCodeAt(0) === 160) {
                    texto += arrayLetras[j][0];
                    countFilas++;
                } else {
                    texto += "{" + arrayLetras[j][0].toLowerCase()
                    countFilas++;
                    countFilas++;
                }
            } else {
                texto += arrayLetras[j][0];
                countFilas++;
            }
        }
        texto += " ";
        countFilas++;
    }
    return texto;
}

function esMayuscula(letra) {
    return letra === letra.toUpperCase();
}

function clearing() {
    window.document.braille.salidaBraile.value = " ";
    textoEstenografico = "";
}