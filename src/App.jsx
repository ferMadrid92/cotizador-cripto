import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Formulario from './components/Formulario'
import ImagenCripto from './img/cripto.webp'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'


const Contenedor = styled.div`
  max-width: 100%px;
  margin: 0 auto;
  width: 95%;
  @media (min-width: 992px) {
    display: flex;
    flex-direction: column;
    column-gap: 2rem;
  }
`
const Imagen = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  margin: 10px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [ monedas, setMonedas ] = useState({})
  const [ resultado, setResultado ] = useState({})
  const [ cargando, setCargando ] = useState(false)

  useEffect(() => {
    if(Object.keys(monedas).length > 0) {

      const cotizarCripto = async () => {
        setCargando(true)
        setResultado({})
        const {moneda, criptomoneda} = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setResultado(resultado.DISPLAY[criptomoneda][moneda])

        setCargando(false)
      }
      cotizarCripto()
    }

  }, [monedas])

  return (
    <Contenedor>
      <Imagen
        src={ImagenCripto}
        alt="imagenes criptomonedas"
      />

      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>

        <Formulario
          setMonedas={setMonedas}
        />
        {cargando && <Spinner />}
        {resultado.PRICE && <Resultado resultado={resultado} />}
      </div>

    </Contenedor>
  )
}

export default App
