import './Home.css'
import calculator from '../../assets/calculator.png'
import { useContext, useEffect, useState } from 'react'
import Graphic from '../../components/Graphic/Graphic'
import ExpressionContext from '../../context/ExpressionContext'
import { compile, derivative } from 'mathjs'
import { navigate } from 'wouter/use-browser-location'

export default function Home() {
    const { expression, setExpression } = useContext(ExpressionContext)
    const [method, setMethod] = useState(null)

    useEffect(() => {
        console.log(expression)
    }, [expression])

    const derivate = (fn) => {
        try {
            return derivative(fn, "x").toString()
        } catch (e) {
            return ""
        }
    }

    const evaluateFunction = (fn) => {
        try {
            compile(fn)
            return fn
        } catch (e) {
            return ''
        }
    }

    const setFunction = (e) => {
        const string = e.target.value
        const newFn = {
            fn: evaluateFunction(string),
            derivative: derivate(string),
        }
        setExpression(newFn)
    }

    const selectMethod = (e) => {
        const { value } = e.target
        setMethod(value)
    }

    const submitMethodData = (e) => {
        e.preventDefault()
        const inputa = document.querySelector("#a")
        if (method !== "newton") {
            const inputb = document.querySelector("#b")
            const a = Number.parseFloat(inputa.value)
            const b = Number.parseFloat(inputb.value)
            expression.interval = [a, b]
        } else {
            expression.interval = [Number.parseFloat(inputa.value), 0]
            expression.compiledDerivative = compile(expression.derivative)
        }
        expression.compiledFn = compile(expression.fn)
        console.log(expression)
        setExpression(expression)
        navigate(`/${method}`)
    }

    return (
        <section className='homee'>
            <div>
            <div className='tiitulohome'>
                <br />
            <h2 >Calculadora: Métodos númericos</h2>
            
            </div>
            
            
            <form className='selection-method' aria-required onSubmit={submitMethodData}>
                <input className='textoingresar' type="text" id='funcion' onInput={setFunction} placeholder='Ingresar la función' required
                style={{width:"30%"}}/>
                <Graphic expression={expression}/>
                <div className='method-options'>
                    <input  id='biseccion' type="radio" name='metodo' value="biseccion" onInput={selectMethod}/>
                    <label className='metodoo' htmlFor='biseccion'>Bisección</label>
                    <input  id="falsa" type="radio" name='metodo' value="falsa-posicion" onInput={selectMethod}/>
                    <label className='metodoo' htmlFor='falsa'>Falsa Posición</label>
                    <input  id='secante' type="radio" name='metodo' value="secante" required onInput={selectMethod}/>
                    <label  className='metodoo' htmlFor='secante'>Secante</label>
                    <input  id='newton' type="radio" name='metodo' value="newton" onInput={selectMethod}/>
                    <label className='metodoo' htmlFor='newton'>Newton Raphson</label>
                </div>
                <div className='cuadroconboton'>
                {method && 
                    <fieldset className='interval-input'>
                        <legend>Ingrese el intervalo</legend>
                        <label>
                            a: <input type="number" id='a' required step="0.1"/>
                        </label>
                        <label>
                            b: <input type="number" id='b' required step="0.1"/>
                        </label>
                    </fieldset>
                }
                <button className='calculate-btn'>
                   calcular
                </button>
                </div>
            </form>
            </div>
           
        </section>
    )
}
