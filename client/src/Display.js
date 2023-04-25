import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Display() {
    const [data,setData] = useState()
    const [image,setImage] = useState()
        useEffect(() => {
        axios.get('http://localhost:3300/')
        .then(res=>{
            console.log(res)
            setData(res.data)
        })
        .catch(err=>console.log(err))
    }, [])
  return (
    <div>

{data && data.map( e =>{
        return(
            <div className='flex'>
            <div>
            <h5>{e.name}</h5>
            <p>{e.phone}</p>
            <p>{e.email}</p>
            <br />
            </div>
            <Image image={e.img}/>
            </div>
        )
    })}

     </div>

  )
}

const Image = ({image})=>{
    const [i,setI] = useState()
    useEffect(() => {
        axios.get(`http://localhost:3300/${image}`,{ responseType: 'blob' })
        .then(ele=>{
            console.log(ele.data)
            setI(URL.createObjectURL(ele.data))
        })
        .catch(e=>console.log(e))
    }, [])
    return(<>
    <img className='circle' src={i} />
    </>)
}

export default Display