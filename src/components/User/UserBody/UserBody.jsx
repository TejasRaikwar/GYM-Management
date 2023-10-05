import React from 'react'
import './UserBody.css'
const UserBody = () => {
    const id = localStorage.getItem('id')
    // console.log(id)
  return (
    <div className="user-body">
       <div className="user-info">
            <div className="user-info-left">
                <img src="https://staticg.sportskeeda.com/editor/2022/07/aedcf-16570135965843.png"/>
            </div>
            <div className="user-info-right">
                <div>Name : Tejas Raikwar</div>
                <div>Date of Birth : 12-02-2001</div>
                <div>Age : 23</div>
                <div>Height : 157</div>
                <div>Chest : 150</div>
                <div>Bisep : 13</div>
                <div>Mobile : 1234567890</div>
                <div style={{WebkitFlexGrow:"1"}}>Address :   Sai baba nagar,Kharbi,Nagpur</div>
            </div>      
        </div>
           <div className="user-joining-info" style={{marginTop:"1rem"}}>
            <table>
                <tr>
                    <td>Join Date : 12-12-2023</td>
                    <td>End Date : 12-02-2024</td>
                    <td>Fees Paid : 1000</td>
                    <td>Balance : 200</td>
                </tr>
            </table>
           </div> 
    </div>
  )
}

export default UserBody




// <table>
//                <tr>
//                     <td rowSpan={3}><span className='user-dp'></span></td>
//                     <td><h2>Name : Tejas Raikwar</h2></td>
//                     <td><h2>Date of Birth : 12-02-2001</h2></td>
//                     <td><h2>Age : 23</h2></td>
//                </tr>
//                <tr>
//                     <td><h2>Height : 157</h2></td>
//                     <td><h2>Chest : 150</h2></td>
//                     <td><h2>Bisep : 13</h2></td>
//                </tr>
//                <tr>
//                    <td><h2>Mobile : 1234567890</h2></td>
//                     <td colSpan={4}><h2>Address :   Sai baba nagar,Kharbi,Nagpur </h2></td>
//                </tr>
               
//            </table>