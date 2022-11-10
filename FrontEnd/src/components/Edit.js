import { useLocation } from 'react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function Edit(){
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
    var[password,setPassword] = useState("")


    function getUser(){
        const url =`http://localhost:5000/user/profile/${userId}`
        axios.get(url).then((response)=>{
            const result = response.data
            console.log(result['data'])
            const data = result['data']
            if(result['status'] == 'success'){
                setName(data['name'])
                setEmail(data['email'])
                setPassword(data['password'])
            }
            else{
                toast.error("error occured")
            }
        })
    }

    const saveUser = (e) => {
        e.preventDefault();

        var name = document.getElementById('Name').value
        var email = document.getElementById('Email').value
        var password = document.getElementById('Password').value
        var confpassword = document.getElementById('CPassword').value

        if(confpassword != password){
            toast.error("Both Passwords must be same")
        }
        else{
            if(name && email && password){
                const body = {
                name, email, password
            }
            const url = `http://localhost:5000/user/updateUser/${userId}`
            axios.put(url, body).then((response) => {
                const result = response.data
                console.log(result)
                if (result['status'] === 'success') {
                    // currentfirstName = result.data.firstName
                    navigate('/manageuser')
                    toast.success("Updated successfully")
                }
                else{
                    toast.error("error occured")
                }
            })
        }
        else{
            toast.error("All Fields are Mandatory!!!")
        }
        }
    }

    return(
        <>
        <>
        <div style={{ overflowX: "hidden" }} className='fixedcontent'>
            <div style={{ backgroundColor: "whitesmoke" }}>
                <br />
                <div className='container shadow-lg userInfo' style={{ backgroundColor: "white" }}>
                    <br />
                    <div>
                        <>
                            <center><h4>Edit User Details</h4></center><br />
                            <div className='container-fluid'>
                                <div className='row align-content-center justify-content-around'>
                                    <div className='col-6'>
                                        <form onSubmit={saveUser}>
                                                <div class="mb-3">
                                                    <label for="Name" className="form-label">Name</label>
                                                    <input type="text" className='form-control' id='Name' defaultValue={name}/>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="Email" className="form-label">Email</label>
                                                    <input type="email" className='form-control' id='Email' defaultValue={email} readOnly/>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="Password" className="form-label">password</label>
                                                    <input type='tel' className='form-control' id='Password' defaultValue={password}/>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="CPassword" className="form-label">confirm password</label>
                                                    <input type='tel' className='form-control' id='CPassword' defaultValue={password}/>
                                                </div>
                                                <button type="submit" className="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </>
                    </div><hr />
                </div>
                <br />
            </div>
            <br />
        </div>
        </>

        </>
    )
}

export default Edit