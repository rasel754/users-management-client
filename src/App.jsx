
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [users , setUsers]=useState([])

  useEffect(()=>{
     fetch('http://localhost:5000/users')
     .then(res=>res.json())
     .then(data=>setUsers(data))
  }, [])

  const handelAddUser =event => {
    event.preventDefault();
    const form =event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name , email}

    fetch('http://localhost:5000/users', {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
       console.log('inside post response',data)
       const newUsers = [...users,data];
       setUsers(newUsers);
       form.reset();
 
    })

    console.log(user);
  }


  return (
    <>
      
      <h2>users management system</h2>
      <h3>numbers of users : {users.length}</h3>
      <form onSubmit={handelAddUser}>
        <input type="text" name='name' id='' /><br />
        <input type="email" name='email' id='' /><br />
        <input type="submit" value="submit form" />
      </form>
      <div>
        {
          users.map(user => <p key={user.id}>{user.id}:{user.name} : {user.email}</p>)
        }
      </div>
      
    </>
  )
}

export default App
