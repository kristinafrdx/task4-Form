import React, { useState, useEffect } from "react";
import axios from 'axios';
import imageLock from '../icons/lock.svg';
import imageOpen from '../icons/unlock.svg';
import imageDelete from '../icons/delete.svg';

const Table = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []); // Пустой массив зависимостей гарантирует выполнение useEffect только после монтирования компонента
  

  useEffect(() => {
    setUsers(users);
   }, [users])

   
  
   const handleChange = (e) => {
     const { id, checked } = e.target;
     if (id === 'selectAll') {
      const update = users.map((user) => {
        return { ...user, isChecked: checked } 
      });
      setUsers(update)
     } else {
       const update = users.map((user) => (user.id === Number(id) ? {...user, isChecked: checked } : user))
       setUsers(update)
     }  
  }
  // const selectedUsers = users.filter((use) => use.isChecked);
  return (
    <div style={{backgroundColor: '#f4f4f4'}}>
      {/* <div className="rounded pt-1 pb-3 mb-3"
        style={{ width: '100%', height: 'auto' }}>
      <h3 className="text-center fs-5 mt-5 upper">User table</h3>
      </div> */}
      <div className="d-flex justify-content-center flex-column align-items-center">
        <div className="logout d-flex flex-row justify-content-between align-items-end mb-3" style={{marginTop: '50px', width: '70%'}}>
          <div className="d-flex justify-content-f-start" style={{width: '70%', gap: '30px'}}>
            <button className="btn btn-primary" type="button" style={{padding: '5px 40px'}}><img alt="lock" src={imageLock} style={{paddingRight: '10px'}}/>Block</button>
            <button className="btn btn-primary" type="button" style={{padding: '5px 40px'}}><img alt="unlock" src={imageOpen} /></button>
            <button className="btn btn-danger" type="button" style={{padding: '5px 40px'}}><img alt="delete" src={imageDelete}></img></button>
          </div>
          <div>
            <button type="button" className="btn" style={{border: '1px solid gray', backgroundColor: '#ccc'}}>LOGOUT</button>
          </div>
        </div>
        
        <div className="d-flex flex-row"
          style={{width: '70%'}}>
        
        <table className="table p-2">
        <thead className="m-2">
          <tr>
            <th>
              <label style={{paddingLeft: '30px'}}>
                <input id='selectAll' type="checkbox" onChange={handleChange} checked={users.filter((user) => user?.isChecked !== true).length < 1}/>
              </label>
            </th>
            <th>Name</th>
            <th>Login</th>
            <th>Status</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            
            <tr key={user.id}>
              <td >
                <label style={{paddingLeft: '30px'}}>
                  <input id={user.id} type="checkbox" onChange={handleChange} checked={user?.isChecked || false}/>
                </label>
              </td>
              <td>{user.name}</td>
              <td>{user.login}</td>
              <td>{user.status}</td>
              <td>{user.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
      
      
      </div>
  );
}

export default Table;


// import React, { useState, useEffect } from "react";
// import axios from 'axios';

// const Table = () => {
//   const [users, setUsers] = useState([]);
  
//   const getUsers = async () => {
//     const response = await axios.get('http://localhost:3000/users');
//     return response.data;
//   }

//   .then(users => {
//     return (
//     <div>
//       <h2>User Table</h2>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Login</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {getUsers().map(user => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.name}</td>
//               <td>{user.login}</td>
//               <td>{user.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
//   })
  
// }

// export default Table;