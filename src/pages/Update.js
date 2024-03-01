import "./Dashboard.css"
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getDatabase, ref, set, get } from "firebase/database";
import app from '../firebaseConfig'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import { Button, DialogActions, DialogContent, DialogTitle,Stack, TextField, MenuItem, Select } from "@mui/material";
import 'firebase/compat/storage';
import { useNavigate,useParams } from "react-router-dom";
const Update = () => {
    const navigate = useNavigate()
    const {firebaseId} = useParams()
    let [inputValue1, setInputValue1] = useState("");
    let [inputValue2, setInputValue2] = useState();
    let [inputValue3, setInputValue3] = useState("");
    let [inputValue4, setInputValue4] = useState("");

    useEffect(()=>{
        const fetchData = async () => {
            const db = getDatabase(app)
            const dbRef = ref(db, "menu/category/"+firebaseId)
            const snapshot = await get(dbRef)
            if (snapshot.exists()) {
                const targetObject = snapshot.val();
                setInputValue1(targetObject.title);
                setInputValue2(targetObject.price);
                setInputValue3(targetObject.category);
                setInputValue4(targetObject.amountStock);
            }
            else {
                alert("error")
            }
        }
        fetchData();
    },[firebaseId])
    

    const overwriteData = async() => {
        const db = getDatabase(app)
        const newDocRef = ref(db,"menu/category/"+ firebaseId)
        set(newDocRef,{
            title:inputValue1,
            price:inputValue2,
            category:inputValue3,
            amountStock:inputValue4
        }).then(()=>{
            toast("Data saved successfully")
        }).catch((error)=>{
            toast(error)
        })
    }
    return (
        <div className="card">
            <i className="fas fa-laptop-code"></i>
            
            <div style={{ textAlign: 'center' }}>

                
                    <DialogTitle>User Screen</DialogTitle>
                    <DialogContent>

                       
                        <Stack spacing={2} margin={2}>
                          
                            <TextField variant="outlined" value={inputValue1} onChange={(e) => setInputValue1(e.target.value)}></TextField>
                            <TextField variant="outlined" value={inputValue2}  onChange={(e) => setInputValue2(e.target.value)} ></TextField>
                            <Select
                                labelId="category"
                                id="category"
                                value={inputValue3}
                                onChange={(e) => setInputValue3(e.target.value)}
                            
                            >
                                <MenuItem value={inputValue3}></MenuItem>
                                <MenuItem value="Menu" >Menu</MenuItem>
                                <MenuItem value="Beverages">Beverages</MenuItem>
                                <MenuItem value="Snacks">Snacks</MenuItem>
                            </Select>
                            <TextField variant="outlined" value={inputValue4} onChange={(e) => setInputValue4(e.target.value)} >{inputValue4}</TextField>
                            <Button color="primary" variant="contained" onClick={overwriteData}>Submit</Button>
                            <Button color="primary" variant="contained" onClick={()=>navigate('/')}>Cancel</Button>
                        </Stack>
                    </DialogContent>
                    <DialogActions>

                        
                    </DialogActions>
                
            </div>
        </div>

    )
}

export default Update