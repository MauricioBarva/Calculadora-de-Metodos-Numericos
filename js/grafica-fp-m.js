window.addEventListener("load", function() {
    function draw() {
        try {

            // compile the expression once
            const expression = document.getElementById('ecuacion-fp-m').value
            const expr = math.compile(expression)

            // evaluate the expression repeatedly for different values of x
            const xValues = math.range(-10, 10, 0.5).toArray()
            const yValues = xValues.map(function(x) {
                return expr.eval({
                    x: x
                })
            })

            // render the plot using plotly
            const trace1 = {
                x: xValues,
                y: yValues,
                type: 'scatter'
            }
            const data = [trace1]
            Plotly.newPlot('plot-falsa-posicion-m', data)
        } catch (error) {
            alert("Ha ocurrido un error: " + error)
        }
    }

    document.getElementById('form-fp-m').onsubmit = function(event) {
        event.preventDefault()
        draw()
    }


    draw()

});