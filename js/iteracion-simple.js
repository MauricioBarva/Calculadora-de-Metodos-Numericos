'use strict'
// LLamando evento load para poner el script en el header y que funcione
window.addEventListener("load", () => {
    $(document).ready(function() {
        // Obtener los elementos del html y guardarlos en variables
        var form_it = document.getElementById("formulario-iteracion");
        var ecuacion_it = document.querySelector("#ecuacion-iteracion").value;
        var num_u = document.getElementById("u").value;
        var cifras_it = document.getElementById("cifras-iteracion").value;
        var iteracion_it = document.getElementById("iteraciones-iteracion");
        var errorAproximado_it = document.getElementById("errorAproximado-iteracion");
        var raizAproximada_it = document.getElementById("raizAproximada-iteracion");
        var valorReemplazando_it = document.getElementById("valorReemplazando-iteracion");
        var u = parseFloat(num_u);
        //Crear la función bisección que contiene las operaciones
        function iteracionSimple() {
            // defino las variables acá para que cada vez que ejecute la funcion los valores se cambien
            u = parseFloat(num_u);
            var nroCifras = parseInt(cifras_it);
            var es = (0.5 * Math.pow(10, -nroCifras) * 100);
            var ea = 100;
            var v = u;
            var contador = 0;
            var xant = 0;



            function formula(numero) {
                //Le digo, recorrame la ecuacion
                const recorrer_it = math.parse(ecuacion_it);
                // Reuname la ecuacion
                const compilado_it = recorrer_it.compile();
                //Luego creo un JSON donde la x vale xl
                let cambio_it = {
                        x: numero,
                        e: Math.E
                    }
                    //Luego tomo la ecuacion compilada y le digo que evalue las x por xl
                return compilado_it.eval(cambio_it);
            }
            while (ea >= es) {
                xant = v;
                v = formula(v);
                ea = Math.abs(((v - xant) / v) * 100);
                contador++;
            }
            iteracion_it.innerHTML = "-Número iteraciones:" + contador;
            errorAproximado_it.innerHTML = "-Error aprox: " + ea;
            raizAproximada_it.innerHTML = "-Raiz aprox: " + v;
            valorReemplazando_it.innerHTML = "-Valor remplazando raiz:" + formula(v);


        }


        // Agregarle el evento submit al formulario
        form_it.addEventListener("submit", function() {
            ecuacion_it = document.querySelector("#ecuacion-iteracion").value;
            cifras_it = document.getElementById("cifras-iteracion").value;
            num_u = document.getElementById("u").value;
            iteracionSimple();
        });
        // Como yo cambiaba los valores dentro de la funcion, lo hacia a nivel de bloque, no lo hacia
        // globamente, por este motivo me mostraba siempre el mismo resultado, por eso puse las variables dentro de la funcion
        // para que cada vez que lo llame, lo cambie 
    });
});