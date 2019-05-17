'use strict'
// LLamando evento load para poner el script en el header y que funcione
window.addEventListener("load", () => {
    $(document).ready(function() {
        // Obtener los elementos del html y guardarlos en variables
        var form_fp = document.getElementById("formulario-fp");
        var ecuacion_fp = document.querySelector("#ecuacion-fp").value;
        var numeroXL_fp = document.getElementById("xl-fp").value;
        var numeroXU_fp = document.getElementById("xu-fp").value;
        var cifras_fp = document.getElementById("cifras-fp").value;
        var iteracion_fp = document.getElementById("iteraciones-fp");
        var errorEsperado_fp = document.getElementById("errorEsperado-fp");
        var errorAproximado_fp = document.getElementById("errorAproximado-fp");
        var raizAproximada_fp = document.getElementById("raizAproximada-fp");
        var valorReemplazando_fp = document.getElementById("valorReemplazando-fp");
        var xl_fp = parseFloat(numeroXL_fp);
        //Crear la función bisección que contiene las operaciones
        function falsaPosicion() {
            // defino las variables acá para que cada vez que ejecute la funcion los valores se cambien
            var nroCifras_fp = parseInt(cifras_fp);
            var es_fp = (0.5 * Math.pow(10, -nroCifras_fp) * 100);
            var ea_fp = 100;
            xl_fp = parseFloat(numeroXL_fp);
            var xu_fp = parseFloat(numeroXU_fp);
            var xr_fp = xl_fp;
            var contador_fp = 0;
            var fxr_fp = 0;

            function formula(xl_fp) {
                //Le digo, recorrame la ecuacion
                const recorrer_fp = math.parse(ecuacion_fp);
                // Reuname la ecuacion
                const compilado_fp = recorrer_fp.compile();
                //Luego creo un JSON donde la x vale xl
                let cambio_fp = {
                        x: xl_fp,
                        e: Math.E
                    }
                    //Luego tomo la ecuacion compilada y le digo que evalue las x por xl
                return compilado_fp.eval(cambio_fp);
            }
            while (ea_fp >= es_fp) {
                var xrant_fp = xr_fp;
                var fxl_fp = formula(xl_fp);
                var fxu_fp = formula(xu_fp);
                var operacion_fp = ((fxu_fp * (xl_fp - xu_fp)) / (fxl_fp - fxu_fp));
                xr_fp = xu_fp - operacion_fp;
                fxr_fp = formula(xr_fp);
                if (fxr_fp * fxl_fp > 0) {
                    xl_fp = xr_fp;
                    var contL = 0;
                    var contU = contU++;
                } else if (fxr_fp * fxu_fp > 0) {
                    xu_fp = xr_fp;
                    contU = 0;
                    contL++;
                } else {
                    ea_fp = 0;
                }
                ea_fp = Math.abs(((xr_fp - xrant_fp) / xr_fp) * 100);
                contador_fp++;
            }
            //Asignarles los resultados a los div que estan en el html
            iteracion_fp.innerHTML = "-Número iteraciones:" + contador_fp;
            errorEsperado_fp.innerHTML = "-Error esperado: " + es_fp;
            errorAproximado_fp.innerHTML = "-Error aprox: " + ea_fp;
            raizAproximada_fp.innerHTML = "-Raiz aprox: " + xr_fp;
            valorReemplazando_fp.innerHTML = "-Valor remplazando raiz:" + fxr_fp;

        }
        // Agregarle el evento submit al formulario
        form_fp.addEventListener("submit", function() {
            ecuacion_fp = document.querySelector("#ecuacion-fp").value;
            cifras_fp = document.getElementById("cifras-fp").value;
            numeroXL_fp = document.getElementById("xl-fp").value;
            numeroXU_fp = document.getElementById("xu-fp").value;
            falsaPosicion();
        });
        // Como yo cambiaba los valores dentro de la funcion, lo hacia a nivel de bloque, no lo hacia
        // globamente, por este motivo me mostraba siempre el mismo resultado, por eso puse las variables dentro de la funcion
        // para que cada vez que lo llame, lo cambie 
    });
});