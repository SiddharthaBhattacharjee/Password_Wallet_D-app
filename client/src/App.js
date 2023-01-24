import React, {useState, useEffect} from 'react';
import {Button,TextField} from "@mui/material";
import PWL from './PWL';
import './App.css';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

import { PWContractAddress } from './config.js';
import {ethers} from 'ethers';
import pwAbi from './utils/pwContract.json';


function App(){
  const [Data, setData] = useState([]);
  const [input, setInput] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [currentAccount, setCurrentAccount] = useState('');
  const [correctNetwork, setCorrectNetwork] = useState(false);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const connectWallet = async () => {
    try{
      const {ethereum} = window;
      if(!ethereum){
        alert('Metamask Not Found ! Get MetaMask and Try Again.');
        return;
      }

      let chainId = await ethereum.request({method: 'eth_chainId'});

      const shardeumChainId = '0x1f91';
      console.log(chainId);
      if(chainId !== shardeumChainId){
        alert('Please Connect to Shardeum Testnet');
        return;
      }
      else{
        setCorrectNetwork(true);
      }

      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      setCurrentAccount(accounts[0]);
      console.log('Connected', accounts[0]);
    } catch(error){
      console.log(error);
    }
  }


  const getAllData = async () => {
    try{
      const {ethereum} = window;
      if(ethereum){
        //setting up provider
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        console.log('signer : ',signer);
        const PWContract = new ethers.Contract(PWContractAddress, pwAbi.abi, signer);
        console.log('PWContract : ',PWContract);
        //calling the smart contract
        let allData = await PWContract.getMyData();
        console.log('allData : ',allData);
        setData(allData);
      }
      else{
        console.log('Ethereum object not found');
      }
    }catch(error){
      console.log(error);
    }
  }


  const addData = async () => {
    let data = {
      'sitename': input,
      'username': input2,
      'password': input3,
      'isDeleted': false,
    };

    try{
      //setting up provider
      const {ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();//signer is the user's wallet
        const PWContract = new ethers.Contract(PWContractAddress, pwAbi.abi, signer);//this step is to connect to the smart contract
        //calling the smart contract
        PWContract.addData(data.sitename, data.username, data.password, data.isDeleted)
        .then(response => {
          setData([...Data, data]);
        })
        .catch(err => {
          console.log(err);
        });
      }
      else{
        console.log('Ethereum object not found');
      }
    }catch(error){
      console.log(error);
    }

    setInput('');
    setInput2('');
    setInput3('');
  }

  const deleteData = key => async () => {

    try{
      //setting up provider
      const {ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const PWContract = new ethers.Contract(PWContractAddress, pwAbi.abi, signer);
        //calling the smart contract to delete the Data
        let deleteTx = await PWContract.deleteData(key, true);
        let allData = [];
        for(let i in Data){
          if(Data[i].id !== key){
            allData.push(Data[i]);
          }
        }
        setData(allData);
      }
      else{
        console.log('Ethereum object not found');
      }
    }catch(error){
      console.log(error);
    }

    setInput('');
    setInput2('');
    setInput3('');
  }

  const generatePassword = () => {
    let password = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@_!%&*@_!%&*0123456789@_!%&*@_!%&*@!*_&123456789';
    let charactersLength = characters.length;
    let length = Math.floor(Math.random() * (14 - 8 + 1)) + 8;
    for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setInput3(password);
  }


  useEffect(()=>{
    connectWallet();
    getAllData();
  }, []);
  // useEffect is used to call the function only once when the page loads

  return (
    <div>
      {currentAccount === '' ? (
        <div className="loading" style={{width:"100%",height:"100vh",backgroundColor:"white",display:'flex',alignItems:"center", justifyContent:"center",flexDirection:"column"}}>
          <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
            <CircularProgress />
          </Stack>
        <Button variant="outlined"
        onClick={connectWallet}
        style={{marginTop:"20px",fontWeight:"bold"}}
        >
        Connect Wallet</Button>
        
        </div>
        ) : correctNetwork ? (
          <div className="App">
            <h2> Password Wallet App</h2>
            <form>
              <TextField id="outlined-basic" label="Site" variant="outlined" style={{margin:"0px 5px",marginTop:"7.5px"}} size="small" value={input}
              onChange={e=>setInput(e.target.value)} />
              <TextField id="outlined-basic2" label="User Name" variant="outlined" style={{margin:"0px 5px",marginTop:"7.5px"}} size="small" value={input2}
              onChange={e=>setInput2(e.target.value)} />

          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" >
          <InputLabel htmlFor="outlined-adornment-password" style={{textAlign: 'center'}} size="small">Password</InputLabel>
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
            value={input3}
            onChange={e=>setInput3(e.target.value)} 
            size="small"
          />
        </FormControl>
              <Button variant="contained" color="primary" onClick={generatePassword}  style={{marginTop:"10px"}}>Generate Password</Button>
              <Button variant="contained" color="primary" onClick={addData}  style={{marginTop:"10px",marginLeft:"8px"}}>Add Data</Button>
            </form>
            <ul>
                {Data.map(item=> 
                  <PWL 
                    key={item.id}
                    siteName={item.sitename}
                    userName={item.username}
                    password={item.password}
                    onClick={deleteData(item.id)}
                  />)
                }
            </ul>
          </div>
        ) : (
        <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
        <div>-----------------------------------------</div>
        <div>Please connect to the Shardeum Testnet</div>
        <div>and reload the page</div>
        <div>-----------------------------------------</div>
        </div>
      )}
  </div>
  )
}

export default App;