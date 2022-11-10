import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Add(){

    const navigate = useNavigate();
    const addUser = (e) => {
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
            const url = `http://localhost:5000/user/add`
            axios.post(url, body).then((response) => {
                const result = response.data
                console.log(result)
                if (result['status'] === 'success') {
                    // currentfirstName = result.data.firstName
                    navigate('/manageuser')
                    toast.success(result['data'])
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
        <div style={{ overflowX: "hidden" }} className='fixedcontent'>
            <div style={{ backgroundColor: "whitesmoke" }}>
                <br />
                <div className='container shadow-lg userInfo' style={{ backgroundColor: "white" }}>
                    <br />
                    <div>
                        <>
                            <center><h4>Add User</h4></center><br />
                            <div className='container-fluid'>
                                <div className='row align-content-center justify-content-around'>
                                    <div className='col-6'>
                                        <form onSubmit={addUser}>
                                                <div class="mb-3">
                                                    <label for="Name" className="form-label">Name</label>
                                                    <input type="text" className='form-control' id='Name'/>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="Email" className="form-label">Email</label>
                                                    <input type="email" className='form-control' id='Email'/>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="Password" className="form-label">password</label>
                                                    <input type='password' className='form-control' id='Password'/>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="CPassword" className="form-label">confirm password</label>
                                                    <input type='password' className='form-control' id='CPassword'/>
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
    )
}

export default Add