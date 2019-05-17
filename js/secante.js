'use strict'
// LLamando evento load para poner el script en el header y que funcione
window.addEventListener("load", () => {
    $(document).ready(function() {
        // Obtener los elementos del html y guardarlos en variables
        var form_sc = document.getElementById("formulario-secante");
        var ecuacion_sc = document.querySelector("#ecuacion-secante").value;
        var numeroXL_sc = document.getElementById("xl-secante").value;
        var numeroXU_sc = document.getElementById("xu-secante").value;
        var cifras_sc = document.getElementById("cifras-secante").value;
        var iteracion_sc = document.getElementById("iteraciones-secante");
        var errorEsperado_sc = document.getElementById("errorEsperado-secante");
        var errorAproximado_sc = document.getElementById("errorAproximado-secante");
        var raizAproximada_sc = document.getElementById("raizAproximada-secante");
        var valorReemplazando_sc = document.getElementById("valorReemplazando-secante");
        var xAct = parseFloat(numeroXL_sc);
        //Crear la función bisección que contiene las operaciones
        function metodoSecante() {
            // defino las variables acá para que cada vez que ejecute la funcion los valores se cambien
            var nroCifras_fp = parseInt(cifras_sc);
            var es = (0.5 * Math.pow(10, -nroCifras_fp) * 100);
            var ea = 100;
            xAct = parseFloat(numeroXL_sc);
            var xAnt = parseFloat(numeroXU_sc);
            var ea = 100;
            var xr = xAct;
            var contador = 0;
            var fxr = 0;

            function formula(xl_fp) {
                //Le digo, recorrame la ecuacion
                const recorrer_fp = math.parse(ecuacion_sc);
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
            while (ea >= es && contador <= 100) {
                var fxAct = formula(xAct);
                var fxAnt = formula(xAnt);
                try {
                    xr = xAct - (fxAct * (xAnt - xAct)) / (fxAnt - fxAct);
                    xAnt = xAct;
                    xAct = xr;
                    fxr = formula(xr);
                    ea = Math.abs(((xr - xAnt) / xr) * 100);
                    contador++;
                } catch (e) {
                    alert(e);
                }
            }
            //Asignarles los resultados a los div que estan en el html
            iteracion_sc.innerHTML = "-Número iteraciones:" + contador;
            errorEsperado_sc.innerHTML = "-Error esperado: " + es;
            errorAproximado_sc.innerHTML = "-Error aprox: " + ea;
            raizAproximada_sc.innerHTML = "-Raiz aprox: " + xr;
            valorReemplazando_sc.innerHTML = "-Valor remplazando raiz:" + fxr;

        }
        // Agregarle el evento submit al formulario
        form_sc.addEventListener("submit", function() {
            ecuacion_sc = document.querySelector("#ecuacion-secante").value;
            cifras_sc = document.getElementById("cifras-secante").value;
            numeroXL_sc = document.getElementById("xl-secante").value;
            numeroXU_sc = document.getElementById("xu-secante").value;
            metodoSecante();
        });
        // Como yo cambiaba los valores dentro de la funcion, lo hacia a nivel de bloque, no lo hacia
        // globamente, por este motivo me mostraba siempre el mismo resultado, por eso puse las variables dentro de la funcion
        // para que cada vez que lo llame, lo cambie 
    });
});