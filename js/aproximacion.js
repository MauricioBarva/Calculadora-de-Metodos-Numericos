'use strict'
// Para que se espere que se cargue el html luego el js
window.addEventListener("load", function() {
    // Inicializando el JQuery
    $(document).ready(function() {
        // Capturando los elementos del DOM
        var form = document.getElementById("formulario-aprox");
        var x = document.getElementById("x").value;
        var cifras = document.getElementById("cifras-aprox").value;
        var iteraciones = document.getElementById("iteraciones-aprox");
        var XActualAprox = document.getElementById("x-aprox-actual");
        var errorAproximado = document.getElementById("errorAprox");
        x = parseFloat(x);
        $(document).tooltip({ transition: 3000 });
        form.addEventListener("submit", function() {
                x = document.getElementById("x").value;
                cifras = document.getElementById("cifras-aprox").value;
                aproximacion();
            })
            // Le estoy diciendo que calcule la aproximación
        function aproximacion() {
            var nroCifras = parseInt(cifras);
            var potencia = Math.pow(10, -nroCifras);
            var errorS = (0.5 * potencia) * (100);
            var errorA = 100;
            var potenciaForm = 1;
            var contador = 1;
            var xAct = 1;
            var xAnt = 0;
            while (errorA > errorS) {
                xAnt = xAct;
                if (contador % 2 == 0) {
                    xAct += Math.pow(x, potenciaForm) / factorial(potenciaForm);
                } else {
                    xAct -= Math.pow(x, potenciaForm) / factorial(potenciaForm);
                }
                errorA = Math.abs((xAct - xAnt) / xAct) * 100;
                potenciaForm++;
                contador++;

                function factorial(n) {
                    var result = 1;
                    for (var i = 2; i <= n; i++) {
                        result = result * i;
                    }
                    return result;
                }
                errorAproximado.innerHTML = "-Error Apróximado: " + errorA;
                iteraciones.innerHTML = "-Número iteraciones: " + contador;
                XActualAprox.innerHTML = "<strong>-X actual: " + xAct + "</strong>";
            }
        };
    });
});