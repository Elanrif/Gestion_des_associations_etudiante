import React,{useEffect,useState} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import BackDrop from './BackDrop'


function GoForward() {

    const navigate = useNavigate()
    const {ID} = useParams() 

    useEffect(() => {
      navigate(`/association/${ID}`)
    }, [])

  return (
    <div className='h-[60vh]'>
       <BackDrop/>
    </div>
  )
}

export default GoForward
