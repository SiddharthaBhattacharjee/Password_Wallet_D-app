import React, {useState, useEffect} from 'react';
import { List , ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';
import './PWL.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';

import { PWContractAddress } from './config.js';
import {ethers} from 'ethers';
import pwAbi from './utils/pwContract.json';


const PWL=(props)=>{
    let key_ = props.key_;
    let siteName = props.siteName;
    let userName = props.userName;
    let password = props.password;
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    let input = siteName;
    let input2 = userName;
    let input3 = password;


    const [edit, setEdit] = useState(false);
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
    
        setOpen(false);
    };
    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
    
        setOpen2(false);
    };
    const handleClose3 = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
    
        setOpen3(false);
    };

    // function to copy password to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setOpen(true);
        setOpen2(false);
        setOpen3(false);

    };


    const editData = () => {
        setEdit(true);
        setOpen2(true);
        setOpen(false);
        setOpen3(false);
    }

    const saveData = async () => {
        setEdit(false);
        let data = {
            siteName: input,
            userName: input2,
            password: input3
        }
        console.log(data)
        console.log(typeof(key_))
        console.log(key_)
        console.log(props.updateHandler)
        await props.updateHandler(props.key_, data.siteName, data.userName, data.password);
        console.log("data saved")
        setOpen3(true);
        setOpen(false);
        setOpen2(false);
    }

    return (
        <List className="pw__list" style={{width:'95%'}}> 
            <ListItem>
                <ListItemAvatar />
                    <TextField
                        id="standard-read-only-input"
                        label="Site Name"
                        defaultValue={siteName}
                        disabled={!edit}
                        variant="standard"
                        onChange={e=>{input=e.target.value}}
                    />
            </ListItem>
            <ListItem>
                <ListItemAvatar />
                <TextField
                        id="standard-read-only-input"
                        label="User Name"
                        defaultValue={userName}
                        disabled={!edit}
                        variant="standard"
                        onChange={e=>{input2=e.target.value}} 
                    />
            </ListItem>
            <ListItem>
                <ListItemAvatar />
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                    defaultValue={password}
                    style={{margin:"0px 5px" , height:"40px"}}
                    disabled={!edit}
                    onChange={e=>{input3=e.target.value}} 
                />
                </FormControl>
            </ListItem>
            <ContentCopyIcon fontSize="large" style={{opacity:0.8,cursor:"pointer"}} onClick={copyToClipboard}/>
            {
                edit ? <SaveIcon fontSize="large" style={{opacity:0.8,marginLeft:'6px',cursor:"pointer"}} onClick={saveData}/> : <EditIcon fontSize="large" style={{opacity:0.8,marginLeft:'6px',cursor:"pointer"}} onClick={editData}/>
            }
            <DeleteIcon fontSize="large" style={{opacity:0.8,marginLeft:'6px', marginRight:'30px',cursor:"pointer"}} onClick={props.onClick}/>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Password Coppied to clipboard!
                </Alert>
            </Snackbar>
            <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
                <Alert onClose={handleClose2} severity="info" sx={{ width: '100%' }}>
                You can now edit the data!
                </Alert>
            </Snackbar>
            <Snackbar open={open3} autoHideDuration={6000} onClose={handleClose3}>
                <Alert onClose={handleClose3} severity="success" sx={{ width: '100%' }}>
                Data saved successfully!
                </Alert>
            </Snackbar>
        </List> 
    )
};

export default PWL;