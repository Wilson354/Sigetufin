import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from 'firebase.config'

const Editar = () => {

    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [vidas, setVidas] = useState('')

    const navigate = useNavigate()
    const { id } = useParams()

    const update = async (e) => {
        e.preventDefault()
        const alumno = doc(db, "Alumnos", id)
        const data = {
            nombres: nombres,
            apellidos: apellidos,
            vidas: vidas
        }
        await updateDoc(alumno,data)
        navigate("/alumno/crud")
    }

    const getAlumnosById = async (id) => {
       const alumno = await getDoc(doc(db, "Alumnos", id))
       if(alumno.exists()){
        console.log (alumno.data)
       }else{
        console.log ('no existe')
       }
    }

    useEffect(() => {
        getAlumnosById(id)
    })

    return (
        <>
            <div className='container mt--9'>
                <div className='row'>
                    <div className='col'>
                      <h1>editar usuario</h1>

                      <form onSubmit={update}>

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

export default Editar