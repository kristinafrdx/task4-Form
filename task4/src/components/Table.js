import React, { useState, useEffect } from "react";
import axios from 'axios';

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

  return (
    <div>
      <h2>User Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Login</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.login}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
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