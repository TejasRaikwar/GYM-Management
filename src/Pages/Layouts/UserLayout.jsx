import React from 'react'
import UserPage from '../../components/Layouts/UserPage/UserPage'
import { Link, useParams } from 'react-router-dom';
import UserBody from '../../components/User/UserBody/UserBody';
const UserLayout = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const id = localStorage.getItem('id');
  const {userData} = useParams();
  if (token && id && role === 'member') {
    return (
      <>
        <UserPage data = {userData}/>
      </>
    );
  } else {
    return (
      <>
      <h1 style={{textAlign:"center"}}>You are not authorized<br/>
      <Link to="/">Go to Home</Link></h1>
      </>
    ) 
  }
}

export default UserLayout