import Head from 'next/head'
import Header from '../components/header'


export default function Home({ supplier }) {

  function deleteSupplier(id) {
    fetch(`/api/stock-final/supplier/${id}`,
      {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        // alert("Deleting " + id)
        window.location.reload(false);
      })

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
                      {/* <td>
                        <button onClick={deleteSupplier(sup._id)}>Delete</button>
                      </td> */}
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
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