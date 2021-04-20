import React, { Component } from 'react';
//import logo from '../logo.png';
import './App.css';
import Web3 from 'web3'
import Meme from '../abis/Meme.json'


//connecting ipfs-http in nodejs
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({host:'ipfs.infura.io',port: 5001, protocol: 'https'})


class App extends Component {
   //this will run before page loads
   //this will connect to web3 and loadblock chain data
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  //get the account
  //get the network
  // gwt smart contract
  // get Meme Hash
  async loadBlockchainData(){
    const web3 = window.web3
    const account = await web3.eth.getAccounts()
    this.setState({account: account[0]})
    const networkId = await web3.eth.net.getId()
    const networkData = Meme.networks[networkId]
    if(networkData){
      //Fetch contract
      const abi = Meme.abi
      const address = networkData.address
      const contract = web3.eth.Contract(abi, address)
      this.setState({contract})
      //console.log(console)
      const memeHash = await contract.methods.get().call()
      this.setState({memeHash})

    }else{
      window.alert('Smart contract not deployed to detected network')

    }
    console.log(account)
  }

  constructor(props) {
    super(props);
    this.state = {
      buffer:null,
      contract: null,
      file_hash:'QmSQMWVmBfNCyadD6Wbg4RVDAEfsPnQDKfU4eSu9S14dtf'
      //QmSQMWVmBfNCyadD6Wbg4RVDAEfsPnQDKfU4eSu9S14dtf
 
    };
  } 
  //this connects web3 and smartcontract
  async loadWeb3(){
    if(window.ethereum){
      console.log('eth')
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      
    } 
    if (window.web3){
      console.log('web3')
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Please use metamask!!!')
    }
  }
  
  captureFile = (event) =>{ 
    event.preventDefault()
    console.log('file captured....')
    //process file for ipfs...
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
        this.setState({buffer:Buffer(reader.result)})
      //console.log('buffer', Buffer(reader.result))
      
    }
  } 

  onSubmit = (event) => { 
    event.preventDefault()
    console.log("Submitting ths form...")
    //adding file to ipfs
    ipfs.add(this.state.buffer,(error, result) => {
      console.log('Ipfs result', result)
      const file_hash = result[0].hash
      this.setState({file_hash})
      if(error){
        console.error(error)
        return
       }
       this.state.contract.methods.set(file_hash).send({ from: this.state.account }).then((r) =>{
         this.setState({file_hash})
       })
      })
  }
   
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        
          <small className="text-white">DECENTRALIZED FILE STORAGE SYSTEM USING BLOCKCHAIN</small>
         
          <ul className="navbar-nav px3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white">{this.state.account}</small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <img src={`https://ipfs.infura.io/ipfs/${this.state.file_hash}`} style={{height:"600px", width:"800px"}}  />
                
                <p>&nbsp;</p>
                <h2>FILE UPLOAD</h2>
                <form onSubmit={this.onSubmit}>
                  <input type='file' onChange={this.captureFile}></input>
                  <input type='submit'></input>
                </form>
                </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
