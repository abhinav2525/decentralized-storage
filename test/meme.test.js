const { FormControlStatic } = require('react-bootstrap')

const Meme = artifacts.require("Meme")

require('chai')
 .use(require('chai-as-promised'))
 .should()

contract('meme', (accounts) =>{
   
   let meme 
   describe('deployment', async () =>{
       meme = await Meme.deployed()
       const address = meme.address
       console.log(address)
       
    })
})
