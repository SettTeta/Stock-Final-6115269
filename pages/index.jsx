import Head from 'next/head'
import Header from '../components/header'
import { useForm } from "react-hook-form";
import { useState } from "react";


export default function Home({ supplier }) {

  const { register, handleSubmit } = useForm();
  const [editedSupplier, setEditedSupplier] = useState(null);


  function deleteSupplier(id) {
    const confirmed = window.confirm("Are you sure you want to delete this supplier?");
    if (confirmed) {
      fetch(`/api/stock-final/supplier/${id}`, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(data => {
          window.location.reload(false);
        })
    }
  }

  const updateSupplier = async () => {
    const response = await fetch(`/api/stock-final/supplier/${editedSupplier}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // serialisation
        body: JSON.stringify(editedSupplier), // body data type must match "Content-Type" header
    });
    const result = await response.json();   // deserialise
    if (result.error) {
        alert("Error: " + result.error)
    }
    setData(JSON.stringify(editedSupplier))
    setEditedSupplier(null)
    window.location.reload(true);
}

  function setCurrentSupplier(id){
    console.log(id)
    setEditedSupplier(id)
  }

  return (
    <>
      <main>
        <Head>
          <title>Supplier List</title>
        </Head>

        <Header />

        <div className="container">
          <h1 style={{ marginTop: "70px" }}>Supplier</h1>
          <table>
            <thead>
              <tr>
                <th style={{ width: '20rem' }}>Name</th>
                <th style={{ width: '20rem' }}>Address</th>
                <th style={{ width: '10rem' }}>Phone Number</th>
                <th style={{ width: '5rem' }}>Update</th>
                <th style={{ width: '5rem' }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                supplier.map(sup => {
                  return (
                    <tr key={sup._id}>
                      <td>
                        {sup.name}
                      </td>
                      <td>
                        {sup.address}
                      </td>
                      <td>
                        {sup.phone}
                      </td>
                      <td>
                        <button data-bs-toggle="modal" data-bs-target="#updateModal" onClick={() => setCurrentSupplier(sup._id)}>Update</button>
                      </td>
                      <td>
                        <button onClick={() => deleteSupplier(sup._id)}>Delete</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>

        <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Supplier</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <form onSubmit={handleSubmit(updateSupplier)}>
                                    <div className="row d-flex justify-content-start">
                                        <div className="col-md-7 ">
                                            <label htmlFor="title" className="col-form-label">Name:</label>
                                            <input className="form-control" id="title" {...register("name", { required: false })} />
                                        </div>
                                        <div className="col-md-5">
                                            <label htmlFor="link" className="col-form-label">Address:</label>
                                            <input className="form-control" id="address" {...register("address", { required: false })} ></input>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="dateOfUpload" className="col-form-label">Phone Number:</label>
                                            <input className="form-control" type="phone" id="phone" {...register("phone", { required: false })} />
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

      </main>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`https://stock-final-6115269.vercel.app/api/stock-final/supplier`)
  const supplier = await res.json()
  return { props: { supplier } }
}