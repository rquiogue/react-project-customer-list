import React from 'react'

const CustomerList = (props) => {

  const filterBasedOnSearch = (customer) => {
    const customerLowerCaseName = customer.name.toLowerCase();
              const searchTextLowerCase = props.searchText.toLowerCase();
              return customerLowerCaseName.includes(searchTextLowerCase)
  }

  const filterBasedOnPage = (customer, index) => {
    console.log(`Index: ${index}`);
    const startingIndex = (props.page - 1) * props.perPage;
    console.log(`Range: ${startingIndex} - ${startingIndex + props.perPage}`)
    return index >= startingIndex && index < (Number(startingIndex) + Number(props.perPage))
  }

  return (
    <div className='container'>
        <h1 className='header'>Customer List</h1>
        <div>
          <button onClick={() => props.changePage(-1)}>{'<'}</button>
          <button onClick={() => props.changePage(1)}>{'>'}</button>
          <label htmlFor="perPage">Per Page:</label>
          <input type="number" id='perPage' onChange={props.changePerPage} value={props.perPage}/>
        </div>
        <div>
          Search(by name):
          <input type="text" style={{'width': '70%'}} onChange={props.changeSearchText} value={props.searchText}/>
        </div>
        <table className='customer-list'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Pass</th>
            </tr>
          </thead>
          <tbody>
            {props.customerList.filter(filterBasedOnSearch)
              .filter(filterBasedOnPage)
              .map((item) => {
              return (<tr key={item.id} onClick={() => props.selectCustomer(item)} className={props.customerSelectedID === item.id ? 'bold clickable' : 'clickable'}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>
  )
}

export default CustomerList