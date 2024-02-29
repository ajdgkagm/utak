import React,{useState} from 'react'
import { getDatabase, ref, set, push } from "firebase/database";
import app from '../firebaseConfig'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, TextField, Input, MenuItem, Select } from "@mui/material";
import 'firebase/compat/storage';

import { AiFillFileAdd } from "react-icons/ai";
const Add = (props) => {
    const [open, SetOpen] = useState(false);

   
    const toastOptions = {
        autoClose: 400,
        pauseOnHover: true,
    }

    // const productss = PRODUCTS;

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

    return (
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
                        <TextField variant="outlined" label="Title" name={props.title} ></TextField>
                        <TextField variant="outlined" label="Price" name={props.price} ></TextField>
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
                        <Button color="primary" variant="contained">Submit</Button>
                    </Stack>
                </DialogContent>
                <DialogActions>

                    <Button color="error" variant="contained">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Add