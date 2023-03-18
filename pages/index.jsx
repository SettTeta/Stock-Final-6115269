import Head from 'next/head'
import Image from 'next/image'


export default function Home({ supplier }) {
  return (
    <>
      <Head>
        <title>Supplier List</title>
      </Head>
      <main>

        <table>
          <thead>
            <tr>
              <th style={{ width: '20rem' }}>Name</th>
              <th style={{ width: '10rem' }}>Address</th>
              <th style={{ width: '10rem' }}>Phone Number</th>
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
                  </tr>
                )
              })
            }
          </tbody>
        </table>

      </main>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`https://stock-final-6115269.vercel.app/api/stock/supplier`)
  const supplier = await res.json()
  return { props: { supplier } }
}