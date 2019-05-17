'use strict'
// LLamando evento load para poner el script en el header y que funcione
window.addEventListener("load", () => {
    $(document).ready(function() {
        // Obtener los elementos del html y guardarlos en variables
        var form_nw = document.getElementById("formulario-newton");
        var ecuacion_nw = document.querySelector("#ecuacion-newton").value;
        var num_xi = document.getElementById("xi").value;
        var cifras_nw = document.getElementById("cifras-newton").value;
        var iteracion_nw = document.getElementById("iteraciones-newton");
        var errorAproximado_nw = document.getElementById("errorAproximado-newton");
        var raizAproximada_nw = document.getElementById("raizAproximada-newton");
        var valorReemplazando_nw = document.getElementById("valorReemplazando-newton");
        var derivada = document.getElementById("derivada");
        var xi = parseFloat(num_xi);
        var nroCifrasd = parseInt(cifras_nw);
        var es = (0.5 * Math.pow(10, -nroCifrasd) * 100);
        var ea = 100;
        var contador = 0;
        //Crear la función bisección que contiene las operaciones
        function newtonRhapson() {

            xi = parseFloat(num_xi);
            nroCifrasd = parseInt(cifras_nw);
            es = (0.5 * Math.pow(10, -nroCifrasd) * 100);
            ea = 100;
            contador = 0;

            function funcion(numero) {
                //Le digo, recorrame la ecuacion
                const recorrer_nw = math.parse(ecuacion_nw);
                // Reuname la ecuacion
                const compilado_nw = recorrer_nw.compile();
                //Luego creo un JSON donde la x vale xl
                let cambio_nw = {
                        x: numero,
                        e: Math.E
                    }
                    //Luego tomo la ecuacion compilada y le digo que evalue las x por xl

                return compilado_nw.eval(cambio_nw);
            }

            function derivadaDeLaFuncion(numero) {
                //Le digo, recorrame la ecuacion
                const recorrer_nw = math.parse(ecuacion_nw);
                derivada.innerHTML = '-Derivada :' + math.derivative(recorrer_nw, 'x').toString();
                return math.derivative(recorrer_nw, 'x').eval({ x: numero, e: Math.E });
            }

            // defino las variables acá para que cada vez que ejecute la funcion los valores se cambien

            /*Primero le hago parse luego la detino y evaluo*/

            while (ea > es && contador < 1000) {

                try {
                    if (derivadaDeLaFuncion(xi) != 0) {
                        var x1;
                        x1 = xi - (funcion(xi) / derivadaDeLaFuncion(xi));
                        ea = Math.abs(((x1 - xi) / x1) * 100);
                        xi = x1;
                        contador++;

                    }
                } catch (error) {
                    console.log(error);
                    ea = 1;
                    es = 2;
                }
                console.log(contador);
                iteracion_nw.innerHTML = "-Número iteraciones:" + contador;
                errorAproximado_nw.innerHTML = "-Error aprox: " + ea;
                raizAproximada_nw.innerHTML = "-Valor inicial: " + xi;
                valorReemplazando_nw.innerHTML = "-Valor remplazando raiz:" + funcion(xi);
            }



        }


        // Agregarle el evento submit al formulario
        form_nw.addEventListener("submit", function() {
            ecuacion_nw = document.querySelector("#ecuacion-newton").value;
            cifras_nw = document.getElementById("cifras-newton").value;
            num_xi = document.getElementById("xi").value;
            newtonRhapson();
        });
        // Como yo cambiaba los valores dentro de la funcion, lo hacia a nivel de bloque, no lo hacia
        // globamente, por este motivo me mostraba siempre el mismo resultado, por eso puse las variables dentro de la funcion
        // para que cada vez que lo llame, lo cambie 
    });
});