import { useLocation } from 'react-router'
import {useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'


function Details(){
    const {state} = useLocation()
    const {userId} = state

    const navigate = useNavigate();

    useEffect(
        () => {
            getUser();
        },[]
    )

    var[name,setName] = useState("")
    var[email,setEmail] = useState("")


    function getUser(){
        console.log(userId)
        const url =`http://localhost:5000/user/profile/${userId}`
        axios.get(url).then((response)=>{
            const result = response.data
            console.log(result['data'])
            const data = result['data']
            if(result['status'] == 'success'){
                setName(data['name'])
                setEmail(data['email'])
            }
            else{
                toast.error("error occured")
            }
        })
    }

    return(
        <>
            <div>Name = {name}</div>
            <div>Email = {email}</div>
            <button type="button" onClick={()=>(navigate('/manageuser'))} className="btn btn-primary" >Back</button>
        </>
    ) 
}

export default Details