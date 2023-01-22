import React from 'react';
import Add from "../img/avatar.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {

  const [err, setErr] = React.useState(false)
  //async makes a function return a promise

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault() // Prevents refresh 
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {

      const res = await createUserWithEmailAndPassword(auth, email, password);


      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      
      uploadTask.on(
        (error) => {
          // Handle unsuccessful uploads
          setErr(true);
        },
        () => {
          
          getDownloadURL(uploadTask.snapshot.ref).then  (async(downloadURL) => {
            await updateProfile(res.user,{
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL : downloadURL
            });

            await setDoc(doc(db, "userChats",res.user.uid),{ }); //create user doc in firebase when user is accessed(chat ke time par)
            navigate("/");

          });
        }
      );

    } //try ends
    catch (err) {
      setErr(true);
    }
  };


  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className="logo">WeChat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Display Name" />
          <input type="email" placeholder="E Mail" />
          <input type="password" placeholder="Password" />
          <input style={{ display: "none" }} type="file" name="" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an Avatar</span>
          </label>
          <button>Sign Up</button>
          {err && <span>Something Went Wrong</span>}
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;