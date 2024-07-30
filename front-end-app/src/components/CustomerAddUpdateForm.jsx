import React from 'react'
import { useState, useEffect } from 'react';
import {
  post,
  put,
  deleteById
} from '../restdb'

const CustomerAddUpdateForm = (props) => {
  const {
    customerSelectedID,
    isCustomerSelected,
    customerList,
    getCustomers,
    setCustomerSelectedID,
    setIsCustomerSelected
  } = props


  // Setting up state and onChange handlers for the form fields
  const [name, setName] = useState('');
  const changeName = (e) => setName(e.target.value);

  const [email, setEmail] = useState('');
  const changeEmail = (e) => setEmail(e.target.value);
  
  const [password, setPassword] = useState('');
  const changePassword = (e) => setPassword(e.target.value);

  useEffect(() => {
    const customer = customerList.find((customer) => customer.id === customerSelectedID);

    if(isCustomerSelected){
      setName(customer.name);
      setEmail(customer.email);
      setPassword(customer.password);
    } else {
      setName('');
      setEmail('');
      setPassword('');
    }
  }, [customerSelectedID]);


  const onDeleteClick = () => {
    if (!isCustomerSelected) {
      return
    }

    deleteById(customerSelectedID);
    clearSelection();
    getCustomers();
  }

  const onSaveClick = () => {
    const id = getNextId();

    const customer = {
      'name': name,
      'email': email,
      'password': password,
      'id': id,
    }

    if(isCustomerSelected){
      put(customerSelectedID, customer)
    } else {
      post(customer);
    }

    getCustomers();
    clearSelection();
  }

  function getNextId(){
    let maxid = 0;
    for( let item of customerList){
      maxid = (item.id > maxid)?item.id:maxid;
    }  
    return maxid + 1;
  }

  const clearSelection = () => {
    setIsCustomerSelected(false);
    setCustomerSelectedID(-1);
    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <div className='container'>
        <h1 className='header'>{props.isCustomerSelected ? 'Update' : 'Add'}</h1>
        <div className='form'>
          <table className='form-table'>
            <tbody>
              <tr className='form-table-row'>
                <td>Name:</td>
                <td><input type="text" placeholder='Customer Name' value={name} onChange={changeName}/></td>
              </tr>
              <tr>
                <td>Email:</td>
                <td><input type="text" placeholder='name@company.com' value={email} onChange={changeEmail}/></td>
              </tr>
              <tr>
                <td>Pass:</td>
                <td><input type="text" placeholder='Password' value={password} onChange={changePassword}/></td>
              </tr>
            </tbody>
          </table>
          <div className='buttons'>
            <button onClick={onDeleteClick}>Delete</button>
            <button onClick={onSaveClick}>Save</button>
            <button onClick={clearSelection}>Cancel</button>
          </div>
        </div>
      </div>
  )
}

export default CustomerAddUpdateForm