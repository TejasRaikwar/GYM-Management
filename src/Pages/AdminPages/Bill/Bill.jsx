import React from "react";
import { Link } from 'react-router-dom';
const Bill = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const id = localStorage.getItem('id');
  if (token && id && role === 'admin') {
    return (
      <>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis itaque ut, architecto eum ullam, deleniti numquam id quam laudantium consequuntur optio repellat aut unde cumque nesciunt rerum. Suscipit possimus ipsam omnis voluptatum sequi consequatur fuga. Nihil laudantium ipsam quia laborum repellendus facere, quam est unde quaerat harum doloremque earum veritatis numquam facilis necessitatibus omnis voluptatem iste impedit dolore, cumque temporibus explicabo culpa! Sed, nisi fugiat molestias libero explicabo porro tempore ullam quis modi, quo iste quae necessitatibus id quasi! Adipisci ipsam itaque a laudantium alias dolores odit consequatur nisi, voluptatibus temporibus? A iste quidem voluptatum cum distinctio quisquam quibusdam obcaecati.
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
};
export default Bill;
