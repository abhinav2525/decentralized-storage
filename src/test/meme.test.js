const { assert } = require('chai')
const { FormControlStatic } = require('react-bootstrap')
const { Item } = require('react-bootstrap/lib/Breadcrumb')

const Meme = artifacts.require("Meme")

require('chai')
 .use(require('chai-as-promised'))
 .should()

contract('meme', (accounts) =>{
   
   let meme 
   before(async ()=> {
       meme = await Meme.deployed()

   })
    describe('deployment', async () =>{

        Item('deploys successfully', async() => {
            meme = await Meme.deployed()
            const address = meme.address
            console.log(address)
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)

        })
    })
    describe('storage', async() => {
        it('updates the memeHash' , async()=>{
            let memeHash
            memeHash = 'abc123'
            await meme.set(memeHash)
            const result = await meme.get()
            assert.equal(result, memeHash)
        })
    })
})
