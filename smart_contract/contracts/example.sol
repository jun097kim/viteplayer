pragma soliditypp ^0.4.0;

contract A {
   message sum(uint result);
 
   onMessage add(uint a, uint b) {
        uint result = a + b;
        address sender = msg.sender;
        send(sender, sum(result));
   }
}

contract B {
    uint total;
    message add(uint a, uint b);
 
    function invoker(address addr, uint a, uint b) public {
       send(addr, add(a, b));
    }
 
    onMessage sum(uint result) {
        if (result > 10) {
           total += result;
       }
    }
}