import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from "axios"
import { toast } from 'react-toastify';
import { ComponentToPrint } from '../components/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';
import PRODUCTS from '../db';
import { getDatabase, ref, set, push } from "firebase/database";
import app from '../firebaseConfig'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, TextField, Input, MenuItem, Select } from "@mui/material";
import 'firebase/compat/storage';

import { AiFillFileAdd } from "react-icons/ai";
function POSPage() {

    //   const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [open, SetOpen] = useState(false);

    // const [size, setSize] = useState(''); // State for the size of the product
    // const [price, setPrice] = useState(0); // State for the price of the product

    // const pricePerSize = {
    //     small: 50,
    //     medium: 100,
    //     large: 150
    // }


    // const handleSizeChange = (event) => {
    //     const newSize = event.target.value;
    //     setSize(newSize);

    //     // Perform computation based on the size
    //     if (newSize === 'small') {
    //       setPrice(10); // Example price for small size
    //     } else if (newSize === 'medium') {
    //       setPrice(15); // Example price for medium size
    //     } else if (newSize === 'large') {
    //       setPrice(20); // Example price for large size
    //     }
    //   };
    // const [priceOfOption,setPriceOfOption] = useState([])
    const toastOptions = {
        autoClose: 400,
        pauseOnHover: true,
    }

    const productss = PRODUCTS;

    const openPopUp = () => {
        SetOpen(true);
    }
    const closePopUp = () => {
        SetOpen(false);
    }
    //   const fetchProducts = async() => {
    //     setIsLoading(true);
    //     const result = await axios.get('PRODUCTS');
    //     setProducts(await result.data);
    //     setIsLoading(false);
    //   }
    const createData = async (state) => {
        const db = getDatabase(app);
        const newDocRef = push(ref(db, "menu/category"));
        set(newDocRef, {
            // img: image,
            cart,
            totalAmount
        }).then(() => {
            // uploadImage()
            toast(`Added item to database`, toastOptions)
        }).catch((error) => {
            alert("error:", error.message)
        }
        )

    };

    const addProductToCart = async (product) => {
        // check if the adding product exist
        let findProductInCart = await cart.find(i => {
            return i.id === product.id
        });

        if (findProductInCart) {
            let newCart = [];
            let newItem;

            cart.forEach(cartItem => {
                if (cartItem.id === product.id) {
                    newItem = {
                        ...cartItem,
                        quantity: cartItem.quantity + 1,
                        totalAmount: cartItem.price * (cartItem.quantity + 1)
                    }
                    // console.log(newItem)
                    newCart.push(newItem);
                } else {
                    newCart.push(cartItem);
                }
            });

            setCart(newCart);
            toast(`Added ${newItem.name} to cart`, toastOptions)

        } else {
            let addingProduct = {
                ...product,
                'quantity': 1,
                'totalAmount': product.price,
            }
            setCart([...cart, addingProduct]);
            toast(`Added ${product.name} to cart`, toastOptions)
        }

    }

    const removeProduct = async (product) => {
        const newCart = cart.filter(cartItem => cartItem.id !== product.id);
        setCart(newCart);
    }

    const componentRef = useRef();

    const handleReactToPrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handlePrint = () => {
        handleReactToPrint();
    }

    useEffect(() => {
        // fetchProducts();
    }, []);

    useEffect(() => {
        let newTotalAmount = 0;
        cart.forEach(icart => {
            newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
        })
        setTotalAmount(newTotalAmount);
    }, [cart])


    console.log(cart)
    return (

        <MainLayout>
            {/* { productss.map(item =>{
    return (
        <ul>
            <li key={item.title}>{item.category}</li>
        </ul>
      );
  })} */}
            <div className='col-lg-12'>
                <div style={{ display: "none" }}>
                    <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef} />
                </div>
                <div className='table-responsive bg-dark'>
                    <table className='table table-responsive table-dark table-hover'>
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Image</td>
                                <td>Name</td>
                                <td>Price</td>
                                <td>Qty</td>
                                <td>Category</td>
                                <td>Option</td>
                                <td>Total</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {cart ? cart.map((cartProduct, key) => <tr key={key}>

                                <td>{cartProduct.itemId}</td>
                                <td><img src={cartProduct.img} style={{ width: 90 }} /></td>
                                <td>{cartProduct.name}</td>
                                <td>{cartProduct.price}</td>
                                <td>{cartProduct.quantity}</td>
                                <td>{cartProduct.category}</td>
                                <td>{cartProduct.option === '' ? <select>
                                    <option>Small</option>
                                    <option>Medium</option>
                                    <option>Large</option>
                                </select> : null}</td>
                                <td>{cartProduct.totalAmount}</td>
                                <td>
                                    <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)}>Remove</button>
                                </td>

                            </tr>)

                                : 'No Item in Cart'}
                        </tbody>
                    </table>
                    <h2 className='px-2 text-white'>Total Amount: ${totalAmount}</h2>
                </div>

                <div className='mt-3'>
                    {totalAmount !== 0 ? <div>
                        <button className='btn btn-primary' onClick={createData}>
                            Pay Now
                        </button>
                        

                    </div> : <div>
                        
                        <button className='btn btn-primary' onClick={openPopUp}>
                            Add a product
                        </button>
                        </div>

                    

                    }
                </div>


            </div>
            
            <div className='row'>
                <div className='col-lg-12'>
                    {isLoading ? 'Loading' : <div className='row'>
                        {productss.map((product, key) =>
                            <div key={key} className='col-lg-4 mb-4'>
                                <div className='container' onClick={() => addProductToCart(product)}>
                                    <div className='images'>
                                        <div className='image-box'>
                                            <h6>{product.name}</h6>
                                            <img src={product.img} className="img-fluid" alt={product.name} />
                                            <p>${product.price}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>}

                </div>

            </div>
            <div className="profile-container">

                            <div style={{ textAlign: 'center' }}>
                                <AiFillFileAdd className="nav-icons" onClick={openPopUp}>
                                    Open Popup</AiFillFileAdd>
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
                                            <TextField variant="outlined" label="Title" name="title" ></TextField>
                                            <TextField variant="outlined" label="Price" name="newPrice" ></TextField>
                                            {/* <TextField variant="outlined" value={itemState.category} label="Category" name="category" onChange={(e) => setCategory(e.target.value)}></TextField> */}
                                            <Select
                                                labelId="category"
                                                id="category"
                                                name="category"


                                            >
                                                <MenuItem value='' >Select Menu</MenuItem>
                                                <MenuItem value="Menu">Menu</MenuItem>
                                                <MenuItem value="Beverages">Beverages</MenuItem>
                                                <MenuItem value="Snacks">Snacks</MenuItem>
                                            </Select>
                                            <Button color="primary" variant="contained" onClick={createData}>Submit</Button>
                                        </Stack>
                                    </DialogContent>
                                    <DialogActions>

                                        <Button color="error" variant="contained" onClick={closePopUp}>Close</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>

                        </div>
        </MainLayout>
    )
}

export default POSPage