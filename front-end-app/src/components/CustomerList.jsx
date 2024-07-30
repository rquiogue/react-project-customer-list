import React from 'react'

const CustomerList = (props) => {
  const {
    customerList,
    selectCustomer,
    customerSelectedID,
    page,
    perPage,
    changePerPage,
    changePage,
    searchText,
    changeSearchText
  } = props
  const startingIndex = (page - 1) * perPage
  const finalIndex = Number(startingIndex) + Number(perPage)

  const filterBasedOnSearch = (customer) => {
    const customerLowerCaseName = customer.name.toLowerCase();
              const searchTextLowerCase = searchText.toLowerCase();
              return customerLowerCaseName.includes(searchTextLowerCase)
  }

  const filterBasedOnPage = (customer, index) => {
    return index >= startingIndex && index < finalIndex
  }

  return (
    <div className='container'>
        <h1 className='header'>Customer List</h1>
        <div>
          <button onClick={() => changePage(-1)} disabled={page <= 1}>{'<'}</button>
          Page: {page}
          <button onClick={() => changePage(1)} disabled={customerList.length <= finalIndex}>{'>'}</button>
          <label htmlFor="perPage">Per Page:</label>
          <input type="number" id='perPage' onChange={changePerPage} value={perPage}/>
        </div>
        <div>
          Search(by name):
          <input type="text" style={{'width': '70%'}} onChange={changeSearchText} value={searchText}/>
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
            {customerList.filter(filterBasedOnSearch)
              .filter(filterBasedOnPage)
              .map((item) => {
              return (<tr key={item.id} onClick={() => selectCustomer(item)} className={customerSelectedID === item.id ? 'bold clickable' : 'clickable'}>
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