import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {toast} from "react-toastify";
import { useGetUsersQuery } from '../slices/usersApiSlice';

function AdminUserScreen() {
  const{data: users, isLoading, error, refetch}=useGetUsersQuery();
  //console.log(users);

  const deleteHandler = async (id) => {
    console.log("user deleted", id);
  }

  return (
    <>
      <h2>Users</h2>
      {isLoading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailTo: ${user.email}`}>{user.email}</a></td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{color: "green"}}></FaCheck>
                  ) : (
                    <FaTimes style={{ color: "red" }}></FaTimes>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/users/${user._id}`}>
                    <Button variant="light" className="btn-sm">
                      <FaEdit></FaEdit>
                    </Button>
                  </LinkContainer>
                  <Button variant="danger" className="btn-sm" onClick={()=> deleteHandler(user._id)}>
                  <FaTrash style={{color: "white"}}></FaTrash></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default AdminUserScreen
