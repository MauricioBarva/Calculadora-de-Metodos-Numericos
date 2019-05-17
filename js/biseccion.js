'use strict'
// LLamando evento load para poner el script en el header y que funcione
window.addEventListener("load", () => {
    $(document).ready(function() {
        // Obtener los elementos del html y guardarlos en variables
        var formulario = document.getElementById("formulario");
        var ecuacion = document.querySelector("#eq").value;
        var numeroXL = document.getElementById("xl").value;
        var numeroXU = document.getElementById("xu").value;
        var cifras = document.getElementById("cifras").value;
        var iteracion = document.getElementById("iteraciones");
        var errorEsperado = document.getElementById("errorEsperado");
        var errorAproximado = document.getElementById("errorAproximado");
        var raizAproximada = document.getElementById("raizAproximada");
        var valorReemplazando = document.getElementById("valorReemplazando");
        var xl = parseFloat(numeroXL);
        $(document).tooltip({ transition: 3000 });
        //Crear la función bisección que contiene las operaciones
        function biseccion() {
            // defino las variables acá para que cada vez que ejecute la funcion los valores se cambien
            var nroCifras = parseInt(cifras);
            var es = (0.5 * Math.pow(10, -nroCifras) * 100);
            var ea = 100;
            xl = parseFloat(numeroXL);
            var xu = parseFloat(numeroXU);
            var xr = xl;
            var contador = 0;
            var fxr = 0;

            function formula(xl) {
                //Le digo, recorrame la ecuacion
                const recorrer = math.parse(ecuacion);
                // Reuname la ecuacion
                const compilado = recorrer.compile();
                //Luego creo un JSON donde la x vale xl
                let cambio = {
                        x: xl,
                        e: Math.E
                    }
                    //Luego tomo la ecuacion compilada y le digo que evalue las x por xl
                return compilado.eval(cambio);
            }
            while (ea >= es) {
                var xrant = xr;
                var fxl = formula(xl);
                var fxu = formula(xu);
                xr = (xl + xu) / 2;
                fxr = formula(xr);

                if (fxr * fxl > 0) {
                    xl = xr;
                } else if (fxr * fxu > 0) {
                    xu = xr;
                } else {
                    ea = 0;
                }
                ea = Math.abs(((xr - xrant) / xr) * 100);
                contador++;
            }
            //Asignarles los resultados a los div que estan en el html
            iteracion.innerHTML = "-Número iteraciones:" + contador;
            errorEsperado.innerHTML = "-Error esperado: " + es;
            errorAproximado.innerHTML = "-Error aprox: " + ea;
            raizAproximada.innerHTML = "-Raiz aprox: " + xr;
            valorReemplazando.innerHTML = "-Valor remplazando raiz:" + fxr;

        }
        // Agregarle el evento submit al formulario
        formulario.addEventListener("submit", function() {
            ecuacion = document.querySelector("#eq").value;
            cifras = document.getElementById("cifras").value;
            numeroXL = document.getElementById("xl").value;
            numeroXU = document.getElementById("xu").value;
            biseccion();
        });
        // Como yo cambiaba los valores dentro de la funcion, lo hacia a nivel de bloque, no lo hacia
        // globamente, por este motivo me mostraba siempre el mismo resultado, por eso puse las variables dentro de la funcion
        // para que cada vez que lo llame, lo cambie 
    });
});