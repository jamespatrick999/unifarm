/**
    Create a smart contract with a write function allowing any user to enter a number (decimal or integer) and store it. 
    Have a get function that returns the total value and the total number of wallets that have entered the details.
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
 
contract Unifarm {
    // this variable number can handle upto 4 decimals
    struct Store{
        uint val;
    }  

    uint public total_sum;
    uint public total_count;
    
    mapping(address => Store[]) public numbers; // can store multiple numbers for a wallet

    function newStore(uint x) external {
        if(numbers[msg.sender].length == 0){ // increase wallet count only if it is first transaction 
            total_count ++;
        }
        numbers[msg.sender].push(Store(x));
        total_sum += x; 
    } 

    function getLength() external view returns (uint){
        return numbers[msg.sender].length;
    }
}