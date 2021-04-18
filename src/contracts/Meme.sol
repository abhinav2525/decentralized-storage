pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Meme {

 string memeHash;
   //Write function
  function set(string memory _memeHash) public {
    memeHash = _memeHash;
  }
   //read fuction
  function get() public view returns (string memory) {
    return memeHash;
  }
}

