'use strict'
// LLamando evento load para poner el script en el header y que funcione
window.addEventListener("load", () => {
    var ecuacion_fp_m = document.querySelector("#ecuacion-fp-m").value;

    /*Primero le hago parse luego la detino y evaluo*/
    function llamar() {
        const recorrer_fp_m = math.parse(ecuacion_fp_m);
        return console.log(math.derivative(recorrer_fp_m, 'x').eval({ x: 5, e: Math.E }));
    }
    llamar();


    $(document).ready(function() {
        // Obtener los elementos del html y guardarlos en variables
        var form_fp_m = document.getElementById("formulario-fp-m");
        var ecuacion_fp_m = document.querySelector("#ecuacion-fp-m").value;
        var numeroXL_fp_m = document.getElementById("xl-fp-m").value;
        var numeroXU_fp_m = document.getElementById("xu-fp-m").value;
        var cifras_fp_m = document.getElementById("cifras-fp-m").value;
        var iteracion_fp_m = document.getElementById("iteraciones-fp-m");
        var errorEsperado_fp_m = document.getElementById("errorEsperado-fp-m");
        var errorAproximado_fp_m = document.getElementById("errorAproximado-fp-m");
        var raizAproximada_fp_m = document.getElementById("raizAproximada-fp-m");
        var valorReemplazando_fp_m = document.getElementById("valorReemplazando-fp-m");
        var xl_m = parseFloat(numeroXL_fp_m);
        //Crear la función bisección que contiene las operaciones
        function falsaPosicionModificada() {
            // defino las variables acá para que cada vez que ejecute la funcion los valores se cambien
            var nroCifras_fp_m = parseInt(cifras_fp_m);
            var es_m = (0.5 * Math.pow(10, 2 - nroCifras_fp_m));
            var ea_m = 100;
            xl_m = parseFloat(numeroXL_fp_m);
            var xu_m = parseFloat(numeroXU_fp_m);
            var xr_m = xl_m;
            var contador_m = 0;
            var fxr_m = 0;
            var contU_m = 0;
            var contL_m = 0;

            function formula(xl_fp_m) {
                //Le digo, recorrame la ecuacion
                const recorrer_fp_m = math.parse(ecuacion_fp_m);

                // Reuname la ecuacion
                const compilado_fp_m = recorrer_fp_m.compile();
                //Luego creo un JSON donde la x vale xl
                let cambio_fp_m = {
                        x: xl_fp_m,
                        e: Math.E
                    }
                    //Luego tomo la ecuacion compilada y le digo que evalue las x por xl
                return compilado_fp_m.eval(cambio_fp_m);
            }

            while (ea_m >= es_m) {

                var xrant_m = xr_m;
                var fxl_m = formula(xl_m);
                var fxu_m = formula(xu_m);

                if (contU_m == 2 || contL_m == 2) {
                    xr_m = (xl_m + xu_m) / 2;
                    contL_m = 0;
                    contU_m = 0;
                } else {
                    var operacion_m = (fxu_m * (xl_m - xu_m)) / (fxl_m - fxu_m);
                    xr_m = xu_m - operacion_m;

                }

                fxr_m = formula(xr_m);

                if (fxr_m * fxl_m > 0) {
                    xl_m = xr_m;
                    contL_m = 0;
                    contU_m++;
                } else if (fxr_m * fxu_m > 0) {

                    xu_m = xr_m;
                    contU_m = 0;
                    contL_m++;
                } else {
                    ea_m = 0;
                }
                ea_m = Math.abs(((xr_m - xrant_m) / xr_m) * 100);
                contador_m++;
            }
            //Asignarles los resultados a los div que estan en el html
            iteracion_fp_m.innerHTML = "-Número iteraciones:" + contador_m;
            errorEsperado_fp_m.innerHTML = "-Error esperado: " + es_m;
            errorAproximado_fp_m.innerHTML = "-Error aprox: " + ea_m;
            raizAproximada_fp_m.innerHTML = "-Raiz aprox: " + xr_m;
            valorReemplazando_fp_m.innerHTML = "-Valor remplazando raiz:" + fxr_m;

        }
        // Agregarle el evento submit al formulario
        form_fp_m.addEventListener("submit", function() {
            cifras_fp_m = document.getElementById("cifras-fp-m").value;
            numeroXL_fp_m = document.getElementById("xl-fp-m").value;
            numeroXU_fp_m = document.getElementById("xu-fp-m").value;
            falsaPosicionModificada();
        });
        // Como yo cambiaba los valores dentro de la funcion, lo hacia a nivel de bloque, no lo hacia
        // globamente, por este motivo me mostraba siempre el mismo resultado, por eso puse las variables dentro de la funcion
        // para que cada vez que lo llame, lo cambie 
    });
});