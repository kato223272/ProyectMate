import React, { useEffect } from "react";
import functionPlot from "function-plot";
import { compile } from "mathjs";
import '../Graphic/Graphic.css';

type Props = {
    expression: any,
}

export default function Graphic({ expression }: Props) {
    const evaluateFunction = (argument: number) => {
        try {
            const compiled = compile(expression.fn);
            return compiled.evaluate({
                x: argument
            });
        } catch (e) {
            return NaN;
        }
    }

    useEffect(() => {
        try {
            let fnToPlot = expression.fn || "x"; // Si no hay función ingresada, usar función "x"
            const compiledFn = compile(fnToPlot);

            functionPlot({
                target: "#graphic",
                width: 600,
                height: 400,
                disableZoom: false,
                yAxis: { domain: [-10, 10] },
                xAxis: { domain: [-10, 10] },
                grid: true,
                data: [
                    {
                        fn: fnToPlot,
                        derivative: {
                            fn: expression.derivative,
                            updateOnMouseMove: true
                        }
                    }
                ]
            });

            const graphicElement = document.getElementById("graphic");
            if (graphicElement) {
                graphicElement.style.color = "black";
            }
        } catch (error) {
            console.error("Error al graficar:", error);
        }
    }, [expression])

    return (
        <div className="containercom">
            <div className="graphic-container">
                <h2>Grafica</h2>
                <figure className="graficacom" id="graphic"></figure>
            </div>
            <div className="info-container">
                <h2>Derivada: {expression.derivative}</h2>
                <h2 style={{width:'187%'}}>Evaluado con x=6: {evaluateFunction(6)}</h2>
            </div>
        </div>
    );
}
