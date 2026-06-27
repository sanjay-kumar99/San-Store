/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {

const [users,setUsers]=useState([]);

const fetchUsers=async()=>{

const {data}=await axios.get(
"http://localhost:5000/api/users",
{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
}
);

setUsers(data);

};

useEffect(()=>{
fetchUsers();
},[]);


const deleteUser=async(id)=>{

await axios.delete(
`http://localhost:5000/api/users/${id}`,
{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
}
);

fetchUsers();

};

return (

<div className="bg-white p-8 rounded-3xl shadow">

<h1 className="text-3xl font-bold mb-8">
Users
</h1>

<table className="w-full">

<thead>

<tr className="border-b">

<th>Name</th>
<th>Email</th>
<th>Role</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{
users.map(user=>(

<tr key={user._id} className="text-center border-b h-16">

<td>{user.name}</td>

<td>{user.email}</td>

<td>{user.role}</td>

<td>

<button
onClick={()=>deleteUser(user._id)}
className="bg-red-600 px-4 py-2 rounded text-white"
>
Delete
</button>

</td>

</tr>

))
}

</tbody>

</table>

</div>

);

};

export default AdminUsers;