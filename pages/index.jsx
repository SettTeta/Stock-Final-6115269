import Head from 'next/head'
import Header from '../components/header'
import { useForm } from "react-hook-form";
import { useState } from "react";

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UpdateIcon from '@mui/icons-material/Update';

export default function Home({ supplier }) {

  const { register, handleSubmit } = useForm();
  const [editedSupplier, setEditedSupplier] = useState(null);
  const [sortedSuppliers, setSortedSuppliers] = useState(supplier);
  const [sorted, setSorted] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);


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

  const updateSupplier = async (data) => {
    const response = await fetch(`/api/stock-final/supplier/${selectedRow._id}`, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.error) {
      alert('Error: ' + result.error);
    } else {
      setSelectedRow(null);
      setEditedSupplier(null);
      window.location.reload(false);
    }
  };


  function setCurrentSupplier(supplier) {
    setEditedSupplier(supplier);
  }


  function sortSuppliersByName() {
    if (!sorted) {
      const sorted = [...sortedSuppliers].sort((a, b) => a.name.localeCompare(b.name));
      setSortedSuppliers(sorted);
      setSorted(true)
    } else {
      setSorted(false)
      setSortedSuppliers(supplier)
    }
  }

  const columns = [
    { field: 'name', headerName: 'Name:', width: 200 },
    { field: 'address', headerName: 'Address:', width: 300 },
    { field: 'phone', headerName: 'Phone Number:', width: 150 },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: (params) => (
        <Button
          onClick={(event) => {
            event.stopPropagation();
            deleteSupplier(params.row._id);
            
          }}
          color="error"
        ><DeleteForeverIcon></DeleteForeverIcon>
        </Button>
      ),
    },
    {
      field: 'update',
      headerName: 'Update',
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: (params) => (
        <Button
          onClick={(event) => {
            event.stopPropagation();
            setSelectedRow(params.row);
            setCurrentSupplier(params.row);
          }}
          color="success"
          data-bs-toggle='modal' data-bs-target='#updateModal'
        >
          <UpdateIcon></UpdateIcon>
        </Button>
      ),
    },

  ];



  return (
    <>
      <main>
        <Head>
          <title>Supplier List</title>
        </Head>

        <Header />

        {/* <div className="container">
          <h1 >Supplier</h1>
          <table>
            <thead>
              <tr>
                <th style={{ width: '20rem' }} onClick={sortSuppliersByName}>Name</th>
                <th style={{ width: '20rem' }}>Address</th>
                <th style={{ width: '10rem' }}>Phone Number</th>
                <th style={{ width: '5rem' }}>Update</th>
                <th style={{ width: '5rem' }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                sortedSuppliers.map(sup => {
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
                        <button data-bs-toggle='modal' data-bs-target='#updateModal' onClick={() => setCurrentSupplier(sup)}>Update</button>
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
        </div> */}

        <div className="container">
          <h1 style={{ marginTop: "70px" }}>Supplier</h1>

          <DataGrid
            rows={sortedSuppliers}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => row._id}
            autoHeight
            onRowClick={(params) => {
              setSelectedRow(params.row);
              setCurrentSupplier(params.row);
            }}
            selectionModel={selectedRow ? [selectedRow._id] : []}
          />
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
                      <div className='col-md-12 '>
                        <label htmlFor='title' className='col-form-label'>
                          Name:
                        </label>
                        <input
                          className='form-control'
                          id='title'
                          defaultValue={editedSupplier?.name ?? ''}
                          {...register('name', { required: false })}
                        />
                      </div>
                      <div className='col-md-12'>
                        <label htmlFor='link' className='col-form-label'>
                          Address:
                        </label>
                        <input
                          className='form-control'
                          id='address'
                          defaultValue={editedSupplier?.address ?? ''}
                          {...register('address', { required: false })}
                        ></input>
                      </div>
                      <div className='col-md-12'>
                        <label htmlFor='dateOfUpload' className='col-form-label'>
                          Phone Number:
                        </label>
                        <input
                          className='form-control'
                          type='phone'
                          id='phone'
                          defaultValue={editedSupplier?.phone ?? ''}
                          {...register('phone', { required: false })}
                        />
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