import dbConnect from "@/lib/dbConnect"
import Supplier from "@/models/supplier"

export default async function handler(req, res) {
    await dbConnect()

    const id = req.query.id
    if (req.method === 'GET') {
        // Get only one document
        const doc = await Supplier.findOne({ _id: id })
        res.status(200).json(doc)
    } else if (req.method === 'DELETE') {
        const deletedDoc = await Supplier.deleteOne({ _id: id })
        res.status(200).json(deletedDoc)
    } else if (req.method === 'PUT') {
        console.log('id', req.query.id)
        console.log(req.body)
        const updatedDoc = await Supplier.updateOne({ _id: id }, req.body)
        res.status(200).json(updatedDoc)
    } else {
        res.setHeader('Allow', ['GET', 'DELETE', 'PUT'])
        res.status(405).end(`Method ${req.method} Not Allowed`)

    }
}