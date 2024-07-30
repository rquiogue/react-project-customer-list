import { useEffect, useState } from 'react'
import './App.css'
import CustomerList from './components/CustomerList';
import CustomerAddUpdateForm from './components/CustomerAddUpdateForm';

import {
  getAll,
  post,
  put,
  deleteById
} from './restdb'

function App() {
  const [customerList, setCustomerList] = useState([]);
  const [customerSelectedID, setCustomerSelectedID] = useState(-1);
  const [isCustomerSelected, setIsCustomerSelected] = useState(false);


  // Setting up state and onChange handlers for the form fields
  const [name, setName] = useState('');
  const changeName = (e) => setName(e.target.value);

  const [email, setEmail] = useState('');
  const changeEmail = (e) => setEmail(e.target.value);

  const [password, setPassword] = useState('');
  const changePassword = (e) => setPassword(e.target.value);

  const [perPage, setPerPage] = useState(10);
  const changePerPage = (e) => {setPerPage(e.target.value); console.log(e.target.value)};

  const [page, setPage] = useState(1);

  const [searchText, setSearchText] = useState('');
  const changeSearchText = (e) => setSearchText(e.target.value);

  /*
   *  This section is for the customer selection feature
   *  Here we set the selected id to the correct value while setting it to -1 when the we are deselecting
   *  It also sets our boolean isCustomerSelected variable to the correct state
   *  The cancel onClick functions will make the isCustomerSelected = false and the id = -1
   *  This effectively deselects the selected person
   *  The useEffect hook is used in order to update the text fields whenever a customer is selected or deselected
   */

  const selectCustomer = (item) => {
    setCustomerSelectedID((prevState) => {
      if (prevState === item.id) {
        setIsCustomerSelected(false);
        return -1;
      }

      setIsCustomerSelected(true);
      return item.id;
    });
  }

  const clearSelection = () => {
    setIsCustomerSelected(false);
    setCustomerSelectedID(-1);
    setName('');
    setEmail('');
    setPassword('');
  }

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

  /*
   *  This section will be used in order to handle working with our memdb.js file
   *  We will have our basic useEffect for fetching data
   *  We will also have the onClick methods for deleting and posting
   */

  useEffect(() => {
    getCustomers()
  }, [customerSelectedID, page, perPage])

  const getCustomers = () => {
    getAll(setCustomerList)
  }

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

  function changePage(direction){
    setPage((prev) => prev + direction);
  }



  return (
    <div className='wrapper'>
      <CustomerList 
        customerList={customerList} 
        selectCustomer={(id) => selectCustomer(id)} 
        customerSelectedID={customerSelectedID}
        page={page}
        perPage={perPage}
        changePerPage={(e) => changePerPage(e)}
        changePage={(direction) => changePage(direction)}
        searchText={searchText}
        changeSearchText={changeSearchText}
      />

      <CustomerAddUpdateForm
        isCustomerSelected={isCustomerSelected}
        name={name}
        changeName={(e) => changeName(e)}
        email={email}
        changeEmail={(e) => changeEmail(e)}
        password={password}
        changePassword={(e) => changePassword(e)}
        onDeleteClick={() => onDeleteClick()}
        onSaveClick={() => onSaveClick()}
        clearSelection={() => clearSelection()}
      />
    </div>
  )
}

export default App
