import React from 'react'

const CustomerAddUpdateForm = (props) => {
  return (
    <div className='container'>
        <h1 className='header'>{props.isCustomerSelected ? 'Update' : 'Add'}</h1>
        <div className='form'>
          <table className='form-table'>
            <tbody>
              <tr className='form-table-row'>
                <td>Name:</td>
                <td><input type="text" placeholder='Customer Name' value={props.name} onChange={props.changeName}/></td>
              </tr>
              <tr>
                <td>Email:</td>
                <td><input type="text" placeholder='name@company.com' value={props.email} onChange={props.changeEmail}/></td>
              </tr>
              <tr>
                <td>Pass:</td>
                <td><input type="text" placeholder='Password' value={props.password} onChange={props.changePassword}/></td>
              </tr>
            </tbody>
          </table>
          <div className='buttons'>
            <button onClick={props.onDeleteClick}>Delete</button>
            <button onClick={props.onSaveClick}>Save</button>
            <button onClick={props.clearSelection}>Cancel</button>
          </div>
        </div>
      </div>
  )
}

export default CustomerAddUpdateForm