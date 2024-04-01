import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import {db} from 'firebase.config'



const Crear = () => {
  //hooks
  const [matricula, setMatricula] = useState('')
  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [vidas, setVidas] = useState(5)

  const navigate = useNavigate()

  const alumnosCollection = collection(db, "Alumnos")

  const store = async (e) => {
    e.preventDefault()
    await addDoc (alumnosCollection, {
      matricula: matricula,
      nombres: nombres,
      apellidos: apellidos,
      vidas: vidas
    })
    navigate('/show')
  }

  return (
    <>

       <div className='container mt--9'>
                <div className='row'>
                    <div className='col'>
                      <h1>crear usuario</h1>

                      <form onSubmit={store}>
                        <div className='mb-3'>
                          <label className='form-label'>matricula</label>
                          <input
                            value={matricula}
                            onChange={ (e) => setMatricula(e.target.value)}
                            type="text"
                            className='form-control'
                          />
                        </div>

                        <div className='mb-3'>
                          <label className='form-label'>nombres</label>
                          <input
                            value={nombres}
                            onChange={ (e) => setNombres(e.target.value)}
                            type="text"
                            className='form-control'
                          />
                        </div>

                        <div className='mb-3'>
                          <label className='form-label'>apellidos</label>
                          <input
                            value={apellidos}
                            onChange={ (e) => setApellidos(e.target.value)}
                            type="text"
                            className='form-control'
                          />
                        </div>

                        <div className='mb-3'>
                          <label className='form-label'>vidas</label>
                          <input
                            value={vidas}
                            onChange={ (e) => setVidas(e.target.value)}
                            type="number"
                            className='form-control'
                          />
                        </div>
                        <button type='submit' className='btn btn-success' >Guardar</button>
                      </form>
                    </div>
                </div>
        </div>
    </>
  )
}

export default Crear