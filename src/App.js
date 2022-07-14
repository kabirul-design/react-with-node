import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);


  useEffect(() =>{
    fetch('http://localhost:5000/users')
    .then(res =>res.json())
    .then(data => setUsers(data))
  },[])

  const handleAddUser = event =>{
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    console.log(name, email);
    const user = {name, email};

    // post data to server

    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers : {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data =>{
      const newUser = [...users, data];
      setUsers(newUser);
      // console.log(data)
    })

  }

  return (
    <div className="App">
      <h1>Hello my Data by Server Side : {users.length}</h1>
      <form onSubmit={handleAddUser}>
          <input type='text' name='name' placeholder='enter your name' required/>
          <input type='text' name='email' placeholder='enter your email' required/>
          <input type='Submit'/>
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>Id: {user.id} name:{user.name} Email: {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
