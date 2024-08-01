import { useEffect, useState } from 'react'
import './App.css'
import CustomerList from './components/CustomerList';
import CustomerAddUpdateForm from './components/CustomerAddUpdateForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import {
  getAll,
} from './restdb'

function App() {
  const [customerList, setCustomerList] = useState([{'id': 1, name: 'Connect API', email: 'Connect API', password: 'Connect API'}]);
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

  const [colorPicked, setColor] = useState("#0077b6");



  return (
    <Router>
      <div className='wrapper'>

        <Routes>
          <Route path='/' element={
          <CustomerList 
            customerList={customerList} 
            selectCustomer={(id) => selectCustomer(id)} 
            customerSelectedID={customerSelectedID}
            isCustomerSelected={isCustomerSelected}
            colorPicked={colorPicked}
            setColor={setColor}
          />}
          />

          <Route path='/form' element={<CustomerAddUpdateForm
            isCustomerSelected={isCustomerSelected}
            customerSelectedID={customerSelectedID}
            customerList={customerList}
            getCustomers={() => getCustomers()}
            setCustomerSelectedID={setCustomerSelectedID}
            setIsCustomerSelected={setIsCustomerSelected}
            colorPicked={colorPicked}
              />}
          />

        </Routes>
      </div>
    </Router>
  )
}

export default App
