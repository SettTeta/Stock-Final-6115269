import { connect, model, models, Schema } from "mongoose"
const connectionString = process.env.MONGODB_URI


export default async function handler(req, res) {
    await connect(connectionString);
    console.log("req.method: ", req.method)
    console.log("req.query.id", req.query.id)

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



const supplierSchema = new Schema({
    name: String,
    address: String,
    phone: String,
});

console.log("Mongoose Models", models)
const Supplier = models?.supplier || model('supplier', supplierSchema);