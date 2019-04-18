'use strict'
// Para que se espere que se cargue el html luego el js
window.addEventListener("load", function() {
    // Inicializando el JQuery
    $(document).ready(function() {
        // Capturando los elementos del DOM
        var form = document.getElementById("formulario-seno");
        var angulo = document.getElementById("angulo").value;
        var cifras = document.getElementById("cifras-seno").value;
        var iteracion = document.getElementById("iteracionesSeno");
        var valorActual = document.getElementById("valorActual");
        var XActual = document.getElementById("XActual");
        var errorEsperado = document.getElementById("ErrorEsperado");
        var ErrorAproximado = document.getElementById("ErrorAproximado");
        // Convierto el texto del angulo en float
        var convertirRadianes = parseFloat(angulo);
        $(document).tooltip({ transition: 3000 });
        // Creo la funcion convertir a radianes que recibe un parametro y lo convierte a radiantes
        function to_radians(degrees) {
            var pi = Math.PI;
            return degrees * (pi / 180);
        }
        // Convierto a radianes el angulo ingresado mediante la funcion
        var convertido = to_radians(convertirRadianes);
        //Le digo que le ponga el evento submit al formulario y me capture los valores ingresados
        // Cada vez que le de al boton submit  y me haga las funcionalidades
        form.addEventListener("submit", function() {
                angulo = document.getElementById("angulo").value;
                convertirRadianes = parseFloat(angulo);

                function to_radians(degrees) {
                    var pi = Math.PI;
                    return degrees * (pi / 180);
                }
                convertido = to_radians(convertirRadianes);
                cifras = document.getElementById("cifras-seno").value;
                seno();
            })
            // Le estoy diciendo que calcule el seno practicamente
        function seno() {
            convertido = to_radians(convertirRadianes);
            var nroCifras = parseInt(cifras);
            var es = (0.5 * Math.pow(10, -nroCifras) * 100);
            var ea = 100;
            var expo = 2;
            var cont = 1;
            var xAct = 1;
            var xAnt = 0;

            function factorial(n) {
                var result = 1;
                for (var i = 2; i <= n; i++) {
                    result = result * i;
                }
                return result;
            }
            while (ea > es) {
                xAnt = xAct;
                if (cont % 2 == 0) {
                    xAct += Math.pow(convertido, expo) / factorial(expo);
                } else {
                    xAct -= Math.pow(convertido, expo) / factorial(expo);
                }
                ea = Math.abs((xAct - xAnt) / xAct) * 100;
                expo += 2;
                cont++;
                iteracion.innerHTML = "-Número iteraciones:" + (cont - 1);
                valorActual.innerHTML = "-Valor Actual: " + ea;
                XActual.innerHTML = "-X actual: " + xAct;
                errorEsperado.innerHTML = "-Error Esperado: " + es;
                ErrorAproximado.innerHTML = "-Error Apróximado: " + ea;

            }
        };
    });
});