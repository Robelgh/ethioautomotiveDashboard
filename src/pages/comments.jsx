import React from 'react'
import Table from '../components/table/Table'
import customerList from '../assets/JsonData/customers-list.json';


const customerTableHead = [
  '',
  'name',
  'email',
  'comment'
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td><textarea id="w3review" name="w3review" rows="4" cols="70">
             {item.location}
            </textarea>
        </td>
    </tr>
)

const Customers = () => {
  return (
    <div>
       <h2 className="page-header">
         customer
       </h2>
       <div className="row">
         <div className="col-12">
            <div className="card_body">
                 <Table
                      limit='11'
                      headData={customerTableHead}
                      renderHead={(item, index) => renderHead(item, index)}
                      bodyData={customerList}
                      renderBody={(item, index) => renderBody(item, index)}
                  />
            </div>
         </div>
       </div>
    </div>
  )
}

export default Customers