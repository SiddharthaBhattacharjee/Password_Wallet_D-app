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

const PWL=({siteName,userName,password, onClick})=>{
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <List className="pw__list"> 
            <ListItem>
                <ListItemAvatar />
                    <ListItemText primary={siteName} />
            </ListItem>
            <ListItem>
                <ListItemAvatar />
                    <ListItemText primary={userName} />
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
                    value={password}
                    style={{margin:"0px 5px" , height:"40px"}}
                    disabled={true}
                />
                </FormControl>
            </ListItem>
            <DeleteIcon fontSize="large" style={{opacity:0.8}} onClick={onClick}/>
        </List> 
    )
};

export default PWL;