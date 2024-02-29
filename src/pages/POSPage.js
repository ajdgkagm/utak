import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import { toast } from 'react-toastify';
import { ComponentToPrint } from '../components/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';
import { getDatabase, ref, set, push, get } from "firebase/database";
import app from '../firebaseConfig'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import { useNavigate,useParams } from 'react-router-dom';
function POSPage() {

    //   const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [open, SetOpen] = useState(false);
    const [currentStock, setCurrentStock] = useState([])
    let [productArray, setProductArray] = useState([])
    const [cartID, setCartID] = useState("")
    
    const toastOptions = {
        autoClose: 400,
        pauseOnHover: true,
    }

    const navigate = useNavigate();

    const productss = productArray;

    const {firebaseId} = useParams()
    let [itemId,setItemId] = useState('')

    
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
                console.log(temporaryArray, 'temporary array')
                console.log(myData)
                
            } else {
                console.log("No data")
            }
        }
        fetchData();
    }, [firebaseId])

    const overwriteData = async() => {
        const db = getDatabase(app)
        const newDocRef = ref(db,"menu/category/"+ firebaseId)
        set(newDocRef,{
            // title:inputValue1,
            // price:inputValue2,
            // category:inputValue3,
            // amountStock:inputValue4
        }).then(()=>{
            alert("Data saved successfully")
        }).catch((error)=>{
            alert("Error")
        })
    }
    console.log(cartID, 'cartid')
    
        // const handleEditDocument = async (firebaseId) => {
        //     const db = getDatabase(app)
        // const newDocRef = ref(db,"menu/category/"+ firebaseId)
        // set(newDocRef,{
        //     ...productss,
        //     amountStock:currentStock
        // }).then(()=>{
        //     alert("Data saved successfully")
        // }).catch((error)=>{
        //     alert(error)
        // })
        //   };
        
        // const db = getDatabase(app)
        // const newDocRef = ref(db,"menu/category")
        
        // set(newDocRef,{
        //     // title:inputValue1,
        //     // price:inputValue2,
        //     // category:inputValue3,
        //     ...productss,
        //     updatedData
        //     // amountStock:test
        // }).then(()=>{
        //     alert("Data saved successfully")
        // }).catch((error)=>{
        //     alert("Error")
        // })
    
    const createData = async () => {
        const db = getDatabase(app);
        const newDocRef = push(ref(db, "menu/orders"));
        
        set(newDocRef, {
            // img: image,
            cart,
            totalAmount,
        }).then(() => {
            // uploadImage()
          
            console.log(cart,'cart items')
            toast(`Added item to database`, toastOptions)
            // handleEditDocument(itemid)
            // overwriteData(updatedData)
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
        console.log(product.id,'product')
        console.log(product,'item id')
       

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
                        // currentStock: cartItem.amountStock - cartItem.quantity
                    }
                    console.log(cartItem,'test')
                    // console.log(product.itemId,'tangina')
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

    const componentRef = useRef();

    // const overwriteData = async() => {
    //     const db = getDatabase(app)
    //     const newDocRef = ref(db,"menu/category")
    //     set(newDocRef,{
    //         ...productArray,
    //         amountStock:currentStock
    //     }).then(()=>{
    //         alert("Data saved successfully")
    //     }).catch((error)=>{
    //         alert("Error")
    //     })
    // }

    

    

    useEffect(() => {
        let newTotalAmount = 0;
        // let newTotalStock = 0;
        cart.forEach(icart => {
            newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
            // newTotalStock = newTotalStock - parseInt(icart.currentStock)
        })
        setTotalAmount(newTotalAmount);
        // setCurrentStock(newTotalAmount)
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
                <div style={{ display: "none", position: 'absolute', left: 10, bottom: 200 }}>
                    <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef} />
                </div>
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

                                <td onChange={(e)=>setCartID(e.target.value)}>{cartProduct.itemId}</td>
                                <td>{cartProduct.title}</td>
                                <td>{cartProduct.price}</td>
                                <td>{cartProduct.quantity}</td>
                                <td>{cartProduct.category}</td>
                                
                                <td>{cartProduct.option === '' ? <select>
                                    <option>Small</option>
                                    <option>Medium</option>
                                    <option>Large</option>
                                </select> : null}</td>
                                <td name={(e)=>setCurrentStock(e.target.value)}>{cartProduct.amountStock}</td>

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
                        <button className='btn btn-primary' onClick={()=> navigate("/")}>
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
                                        <div className='flex-box' style={{backgroundColor: 'red'}}>
                                            <h6>{product.title}</h6>
                                            {/* <p>{product.amountStock}</p> */}
                                            <p>{product.price}</p>
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