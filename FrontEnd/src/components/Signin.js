import { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useNavigate } from 'react-router'




const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const signinUser = (e) => {
    e.preventDefault();
    if (email.length == 0) {
      toast.warning('please enter email')
    } else if (password.length == 0) {
      toast.warning('please enter password')
    } else {
      const body = {
        email,
        password,
      }

    
      const url = `http://localhost:5000/user/login`

      
      axios.post(url, body).then((response) => {
        const result = response.data
        console.log(result)
        if (result['status'] == 'success') {
          toast.success('Welcome to the application')
          const { userId , name, email } = result['data']
          // persist the logged in user's information for future use
          sessionStorage['userId'] = userId 
          sessionStorage['Name'] = name
          sessionStorage['email'] = email
          navigate('/manageuser')
        } else {
          toast.error(result['data'])
        }
      })
    }
  }

  return (

<>
  <form>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">
        Email address
      </label>
      <input
        type="email"
        className="form-control"
        id="email"
        onChange={(e) => { setEmail(e.target.value) }}
        aria-describedby="emailHelp"
      />
      <div id="emailHelp" className="form-text">
        We'll never share your email with anyone else.
      </div>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">
        Password
      </label>
      <input
        type="password"
        className="form-control"
        id="Password"
        onChange={(e) => { setPassword(e.target.value) }}
      />
    </div>
    <button onClick={signinUser} className="btn btn-primary">
      Submit
    </button>
  </form>
  <div style={{color:'red'}}>(you will be blocked after 5 invlid attempts)</div>
</>
      
   
  )
}

export default Signin
