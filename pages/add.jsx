import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddSup() {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");

    const saveSupplier = async (data) => {
        const response = await fetch('https://stock-final-6115269.vercel.app/api/stock-final/supplier', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            referrerPolicy: "no-referrer", 
            body: JSON.stringify(data),
          });
        const result = await response.json();  
        if (result.error) {
            alert("Error: " + result.error)
        } else {
            alert("Supplier saved to database successfully")
            window.location.href = "/"
        }
        console.log(result)
        setData(JSON.stringify(data))
    }

    return (
        <div style={{ margin: '1rem' }}>
            <form onSubmit={handleSubmit(saveSupplier)}>
                <h1>Insert Supplier Information</h1>
                <label htmlFor="name">Name</label><br />
                <input id="name" {...register("name", { required: true })} placeholder="John Doe" /><br />

                <label htmlFor="address">Address</label>
                <input id="address" {...register("address", { required: true })} placeholder="123 Downing Street"/><br />

                <label htmlFor="phone">Phone Number</label><br />
                <textarea id="phone" {...register("phone")} placeholder="09047929" /><br />
                <button type="submit">Save</button>
            </form>
        </div>
    );
}