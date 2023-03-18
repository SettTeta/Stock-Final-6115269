import mongoose from "mongoose";


const supplierSchema = new mongoose.Schema(
    {
        name: String,
        address: String,
        phone: String,
    },
    { strict: false }
);
module.exports = mongoose.models.supplier || mongoose.model('supplier', supplierSchema);