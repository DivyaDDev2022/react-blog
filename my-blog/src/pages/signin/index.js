import './index.css';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function SignIn() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/landing", { state: { username: 'Tuts+ Envato', email: 'tuts@envato.com', uid: '123' } })
    var formdata = new FormData();

    var requestOptions = {
      method: 'GET',
      body: formdata,
      redirect: 'follow'
    };

    const url = `http://localhost:5000/api/get/userprofilefromdb?email=${email}&pwd=${password}`
    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => {navigate("/landing", {
        email: email,
        username: result.username,
      })})
      .catch(error => setError('Something Went Wrong'));
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="form-signin-heading"> Sign In </h2> 
        <div className="formItem">
        <label htmlFor="inputEmail" className="sr-only"> Email address</label> 
        <input type="email" id="inputEmail" value={email} onChange={handleEmailChange} className="form-control" placeholder="Email address" required autoFocus />
        </div>
        <div className="formItem">
        <label htmlFor="inputPassword" className="sr-only"> Password</label> 
        <input type="password" id="inputPassword" value={password} onChange={handlePasswordChange} className="form-control" placeholder="Password" required />
        </div>
        
        <Link to={`signup`}><button className="btn btn-lg btn-primary btn-block" type="button"> Sign Up </button></Link>
        <button className="btn btn-lg btn-primary btn-block" type="submit"> Sign In </button>
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  );
}

export default SignIn;
