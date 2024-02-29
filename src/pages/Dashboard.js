
import "./Dashboard.css"
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { getDatabase, ref, set, get, push,remove } from "firebase/database";
import app from '../firebaseConfig'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import { AiFillFileAdd } from "react-icons/ai";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, TextField, Input, MenuItem, Select } from "@mui/material";
import 'firebase/compat/storage';
import { useNavigate,useParams } from "react-router-dom";

const Dashboard = () => {
    const [open, SetOpen] = useState(false);
    const [openView, SetOpenView] = useState(false);
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [amountStock, setAmountStock] = useState(0)
    const [category, setCategory] = useState('')
    let [productArray, setProductArray] = useState([])
const navigate= useNavigate();
    const toastOptions = {
        autoClose: 400,
        pauseOnHover: true,
    }
    const openPopUp = () => {
        SetOpen(true);
    }
    const closePopUp = () => {
        SetOpen(false);
    }
    const openPopView = () => {
        fetchData()
        SetOpenView(true);
    }
    const closePopUpView = () => {
        SetOpenView(false);
    }
    const createData = async (state) => {
        const db = getDatabase(app);
        const newDocRef = push(ref(db, "menu/category"));
        set(newDocRef, {
            id:Math.random(50),
            title: title,
            price: price,
            category: category,
            amountStock: amountStock
        }).then(() => {
            // uploadImage()
            alert(`Added item to database`)
        }).catch((error) => {
            alert("error:", error.message)
        }
        )

    };
    const fetchData = async () => {
        const db = getDatabase(app);
        const dbRef = ref(db, "menu/category");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {

            const myData = snapshot.val();
            const temporaryArray = Object.keys(myData).map(myFireId => {
                return {
                    ...myData[myFireId],
                    itemId: myFireId,
                }
            })
            setProductArray(temporaryArray);
            console.log(temporaryArray, 'temporary array')
            console.log(myData)
        } else {
           console.log("No data")
        }
    }


    const deleteData = async(itemId) => {
        const db = getDatabase(app);
        const dbRef = ref(db, "menu/category/"+itemId);
        await remove(dbRef);
        window.location.reload();
    }
    return (
        <div class="container">

            <section class="main">
                <div class="main-top">
                    <h1>PRODUCTS</h1>
                    <i class="fas fa-user-cog"></i>
                </div>
                <div class="main-skills">
                    <div class="card">
                        <i class="fas fa-laptop-code"></i>
                        <h3>Meal</h3>
                        <button onClick={openPopUp}>Add Products</button>
                        <div style={{ textAlign: 'center' }}>

                            <Dialog open={open} onClose={closePopUp} fullWidth maxWidth="lg">
                                <DialogTitle>User Screen</DialogTitle>
                                <DialogContent>

                                    {/* <DialogContentText>This screen is user</DialogContentText> */}
                                    <Stack spacing={2} margin={2}>
                                        {/* <Input
                  type="file"
                  onChange={handleFileChange}
                  inputProps={{ accept: 'image/*' }}
                  name="img"
                // value={itemState.img}
                /> */}
                                        <TextField variant="outlined" label="Title" name="title" onChange={(e) => setTitle(e.target.value)}></TextField>
                                        <TextField variant="outlined" label="Price" name="price" type="number" onChange={(e) => setPrice(e.target.value)} ></TextField>
                                        {/* <TextField variant="outlined" value={itemState.category} label="Category" name="category" onChange={(e) => setCategory(e.target.value)}></TextField> */}
                                        <Select
                                            labelId="category"
                                            id="category"
                                            name="category"
                                            onChange={(e) => setCategory(e.target.value)}

                                        >
                                            <MenuItem value='' >Select Menu</MenuItem>
                                            <MenuItem value="Menu">Menu</MenuItem>
                                            <MenuItem value="Beverages">Beverages</MenuItem>
                                            <MenuItem value="Snacks">Snacks</MenuItem>
                                        </Select>
                                        <TextField variant="outlined" label="Amount in Stocks" name="amountStock" type="number" onChange={(e) => setAmountStock(e.target.value)} ></TextField>
                                        <Button color="primary" variant="contained" onClick={createData}>Submit</Button>
                                    </Stack>
                                </DialogContent>
                                <DialogActions>

                                    <Button color="error" variant="contained" onClick={closePopUp}>Close</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                    <div class="card">
                        <i class="fab fa-wordpress"></i>
                        <h3>View Products</h3>
                        <button onClick={openPopView}>Add Products</button>
                        <div style={{ textAlign: 'center' }}>

                            <Dialog open={openView} onClose={closePopUpView} fullWidth maxWidth="lg">
                                <DialogTitle>User Screen</DialogTitle>
                                <DialogContent>

                                    <div className='col-lg-12'>
                                        <div className='table-responsive bg-dark'>
                                            <table className='table table-responsive table-dark table-hover'>
                                                <thead>
                                                    <tr>

                                                        <td>Item ID</td>
                                                        <td>Name</td>
                                                        <td>Price</td>
                                                        <td>Category</td>
                                                        <td>Amount in Stocks</td>
                                                        <td>Action</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {productArray ? productArray.map((cartProduct, key) => <tr key={key}>


                                                    <td>{cartProduct.itemId}</td>
                                                        <td>{cartProduct.title}</td>
                                                        <td>{cartProduct.price}</td>
                                                        <td>{cartProduct.category}</td>
                                                        <td>{cartProduct.amountStock}</td>
                                                        <td>
                                                            <button className='btn btn-success btn-sm' onClick={()=>navigate(`/edit/${cartProduct.itemId}`)} >Edit</button> {''}
                                                            <button className='btn btn-danger btn-sm' onClick={()=>deleteData(cartProduct.itemId)} >Delete</button> {''}
                                                        </td>
                                                            
                                                       

                                                    </tr>)

                                                        : 'No Item in Cart'}
                                                </tbody>
                                            </table>


                                        </div>




                                    </div>
                                </DialogContent>
                                <DialogActions>

                                    <Button color="error" variant="contained" onClick={closePopUpView}>Close</Button>
                                </DialogActions>
                            </Dialog>
                        </div>



                    </div>
                    <div class="card">
                        <i class="fas fa-palette"></i>
                        <h3>Snacks</h3>
                        <button>Add Products</button>
                    </div>
                    <div class="card">
                        <i class="fab fa-app-store-ios"></i>
                        <h3>Steak</h3>
                        <button>Add Products</button>
                    </div>
                </div>

                <section class="main-course">
                    <h1>View POS</h1>
                    <div class="course-box">

                        <div class="course">
                            <div class="box">
                                <h3>POS</h3>
                                <button onClick={()=>navigate(`/pos`)} >continue</button>
                                <i class="fab fa-html5 html"></i>
                            </div>
                            
                        </div>
                    </div>
                </section>
            </section>
        </div>

    )
}

export default Dashboard