import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
const Login = () => {

  const [err, setErr] = React.useState(false)
  //async makes a function return a promise

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault() // Prevents refresh 
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth,email,password)
      navigate("/")
    } //try ends
    catch (err) {
      setErr(true);
    }
  };




  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className="logo">WeChat</span>
            <span className="title">Log In</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="E Mail" />
                <input type="password" placeholder="Password" />
                <button>Login </button>
            </form>
            <p>Do not not have an acount? <Link to="/register">Register</Link></p>
        </div>
    </div>
  );
};

export default Login;