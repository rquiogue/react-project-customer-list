import { useEffect, useState } from 'react'
import './App.css'
import CustomerList from './components/CustomerList';
import CustomerAddUpdateForm from './components/CustomerAddUpdateForm';

import {
  getAll,
} from './restdb'
import Header from './components/Header';

function App() {
  const [customerList, setCustomerList] = useState([]);
  const [customerSelectedID, setCustomerSelectedID] = useState(-1);
  const [isCustomerSelected, setIsCustomerSelected] = useState(false);
  
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

  useEffect(() => {
    getCustomers()
  }, [customerSelectedID])

  const getCustomers = () => {
    getAll(setCustomerList)
  }



  return (
    <div className='wrapper'>
      <Header/>

      <CustomerList 
        customerList={customerList} 
        selectCustomer={(id) => selectCustomer(id)} 
        customerSelectedID={customerSelectedID}
      />

      <CustomerAddUpdateForm
        isCustomerSelected={isCustomerSelected}
        customerSelectedID={customerSelectedID}
        customerList={customerList}
        getCustomers={() => getCustomers()}
        setCustomerSelectedID={setCustomerSelectedID}
        setIsCustomerSelected={setIsCustomerSelected}
      />
    </div>
  )
}

export default App
