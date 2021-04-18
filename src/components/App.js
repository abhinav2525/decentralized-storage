import React, { Component } from 'react';
//import logo from '../logo.png';
import './App.css';
import Web3 from 'web3'


//connecting ipfs-http in nodejs
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({host:'ipfs.infura.io',port: 5001, protocol: 'https'})
class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
  }

  //get the account
  //get the network
  // gwt smart contract
  // get Meme Hash
  async localBlockchainData(){
    const web3 = window.web3
    const account = await web3.eth.getAccounts()
  }

  constructor(props) {
    super(props);
    this.state = {
      buffer:null,
      file_hash:'QmSQMWVmBfNCyadD6Wbg4RVDAEfsPnQDKfU4eSu9S14dtf'
      //QmSQMWVmBfNCyadD6Wbg4RVDAEfsPnQDKfU4eSu9S14dtf
 
    };
  } 
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
      })
  }
   
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            ipfs_upload
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={`https://ipfs.infura.io/ipfs/${this.state.file_hash}`} style={{height:"600px", width:"800px"}}  />
                </a>
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
