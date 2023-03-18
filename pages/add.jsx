import { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../components/header";

import Divider from '@mui/material/Divider';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

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
        <>
            <Header />
            <div
                className="container"
                style={{
                    margin: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <form onSubmit={handleSubmit(saveSupplier)}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginBottom: "1rem",
                        }}
                    >
                        <h1 style={{ marginTop: "70px" }}>Insert Supplier Information</h1>
                        <Divider variant="large" />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <TextField
                            required
                            id="name filled-required"
                            label="Name"
                            placeholder="John Doe"
                            variant="filled"
                            {...register("name", { required: true })}
                            style={{ marginBottom: "1rem" }}
                        />

                        <TextField
                            required
                            id="address filled-required"
                            label="Address"
                            placeholder="123 Downing Street"
                            variant="filled"
                            {...register("address", { required: true })}
                            style={{ marginBottom: "1rem" }}
                        />

                        <TextField
                            required
                            id="phone filled-required"
                            label="Phone Number"
                            placeholder="09047929"
                            variant="filled"
                            {...register("phone", { required: true })}
                            style={{ marginBottom: "1rem" }}
                        />

                        <Button type="submit" variant="contained">
                            <AddToPhotosIcon style={{ paddingRight: "5px" }} />
                            Save
                        </Button>
                    </div>


                </form>
            </div>
        </>
    );
}