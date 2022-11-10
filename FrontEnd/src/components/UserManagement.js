import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const UserManagement = () => {

    var[users,setUsers] = useState([]);
    const url = `http://localhost:5000/user/list`
    const navigate=useNavigate()

    useEffect(() => {
        getUsers()
      }, [])

      const getUsers = () => {
        axios.get(url).then((response) => {
          const result = response.data
          console.log(result)
          if (result['status'] === 'success') {
            setUsers(result['data'])
            console.log(users)
          }
        })
      }

      function deleteUser(itemId){
        const url =`http://localhost:5000/user/delete/${itemId}`
        axios.delete(url).then((response)=>{
            const result = response.data
            if(result['status'] === 'success'){
                toast.success("user deleted")
            }
            else{
                toast.error("error occured")
            }
          window.location.reload(false)
        })
      }

      function logout(){
        sessionStorage.clear();
        navigate('/')
      }


      // function show(){
      //   const url =`http://localhost:5000/Hi/user`
      //   axios.get(url).then((response)=>{
      //     console.log(response)
      //   })

      // }
    


    return(
        <>
            <div>
                <center><h1>All Users</h1></center>
                
                <button type="button" onClick={logout} class="btn btn-primary" >Logout</button>   
                <table className='border solid black'>
                    {users.map((user, i) => {
                        return (<tr key={i} value={user}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.description}</td>
                            <td>
                                <button type="button" onClick={()=>(navigate('/viewUser',{state:{userId:user['userId']}}))} class="btn btn-primary" >view</button>
                                <button type="button" onClick={()=>(navigate('/editUser',{state:{userId:user['userId']}}))} class="btn btn-primary" >edit</button>       
                                <button onClick={()=>deleteUser(user['userId'])} class="btn btn-primary">delete</button>
                            </td>
                        </tr>)
                        })
                    }
                </table>
                <button type="button" onClick={()=>(navigate('/adduser'))} class="btn btn-primary" >Add User</button>
                {/* <button type="button" onClick={show} class="btn btn-primary" >check</button> */}
            </div>

        </>
    )

}

export default UserManagement