import React, { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import { toast } from 'react-toastify';
import { getDatabase, ref, set, push, get } from "firebase/database";
import app from '../firebaseConfig'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import { useNavigate } from 'react-router-dom';
function POSPage() {

    //   const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [currentStock, setCurrentStock] = useState([])
    let [productArray, setProductArray] = useState([])

    const toastOptions = {
        autoClose: 400,
        pauseOnHover: true,
    }

    const navigate = useNavigate();

    const productss = productArray;



    useEffect(() => {
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
            } else {
                toast("No data")
            }
        }
        fetchData();
    }, [])
   
    function fetchAmountStock(id) {
        const db = getDatabase(app);
        const itemRef = ref(db, 'menu/category/' + id);

        
        get(itemRef).then((snapshot) => {
            if (snapshot.exists()) {
                const itemData = snapshot.val();
                toast("Current Amount Stock:", itemData);
            } else {
                toast('Item not found.');
            }
        }).catch((error) => {
            toast('Error getting data:', error.message);
        });
    }


    function updateAmountStock(id, title, price, category, newAmountStock) {
        const db = getDatabase(app);
        const itemRef = ref(db, 'menu/category/' + id);


        if (!isNaN(newAmountStock)) {


            set(itemRef, { id, title, price, category, amountStock: newAmountStock })
                .then(() => {
                    toast('Amount Stock updated successfully.');
                })
                .catch((error) => {
                    toast('Error updating Amount Stock:', error.message);
                });
        } else {
            toast('Invalid amountStock value:', newAmountStock);
        }

    }


    const createData = async () => {

        const db = getDatabase(app);
        const newDocRef = push(ref(db, "menu/orders"));

        await set(newDocRef, {
            cart,
            totalAmount,
        })

        for (const item of cart) {
            fetchAmountStock(item.itemId);
            updateAmountStock(item.itemId, item.title, item.price, item.category, item.amountStock);
        }
        toast(`Added item to database`, toastOptions)

    };



    const addProductToCart = async (product) => {
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
                        amountStock: cartItem.amountStock - 1,
                        quantity: cartItem.quantity + 1,
                        totalAmount: cartItem.price * (cartItem.quantity + 1),
                    }

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
                amountStock: product.amountStock - 1
            }

            setCart([...cart, addingProduct]);
            toast(`Added ${product.name} to cart`, toastOptions)

        }


    }

    const removeProduct = async (product) => {
        const newCart = cart.filter(cartItem => cartItem.id !== product.id);
        setCart(newCart);
    }

    // const componentRef = useRef();




    useEffect(() => {
        let newTotalAmount = 0;

        cart.forEach(icart => {
            newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
    
        })
        setTotalAmount(newTotalAmount);
 
    }, [cart])

    return (

        <MainLayout>
           
            <div className='col-lg-12'>
                <div className='table-responsive bg-dark'>
                    <table className='table table-responsive table-dark table-hover'>
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Name</td>
                                <td>Price</td>
                                <td>Qty</td>
                                <td>Category</td>
                                <td>Option</td>
                                <td>Stocks</td>
                                <td>Total</td>

                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {cart ? cart.map((cartProduct, key) => <tr key={key}>

                                <td>{cartProduct.itemId}</td>
                                <td>{cartProduct.title}</td>
                                <td>{cartProduct.price}</td>
                                <td>{cartProduct.quantity}</td>
                                <td>{cartProduct.category}</td>

                                <td>{cartProduct.option === '' ? <select>
                                    <option>Small</option>
                                    <option>Medium</option>
                                    <option>Large</option>
                                </select> : null}</td>
                                <td name={(e) => setCurrentStock(e.target.value)}>{cartProduct.amountStock}</td>

                                <td>{cartProduct.totalAmount}</td>

                                <td>

                                    <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)}>Remove</button>
                                </td>

                            </tr>)

                                : 'No Item in Cart'}
                        </tbody>
                    </table>
                    <h2 className='px-2 text-white'>Total Amount: ${totalAmount}    </h2>

                </div>

                <div className='mt-3'>
                    {totalAmount !== 0 ? <div>
                        <button className='btn btn-primary' onClick={createData} >
                            Pay Now
                        </button>


                        {'  '}
                        <button className='btn btn-primary' onClick={() => navigate("/")}>
                            Go Back
                        </button>


                    </div> : <div>

                        <button className='btn btn-primary' onClick={() => navigate(`/`)} >
                            Go Back
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
                                    <div className='flex-container'>
                                        <div className='flex-box' style={{ backgroundColor: 'red' }}>
                                            <p>{product.title}</p>
                                            
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>}

                </div>

            </div>
            <div className="profile-container">



            </div>
        </MainLayout>
    )
}

export default POSPage