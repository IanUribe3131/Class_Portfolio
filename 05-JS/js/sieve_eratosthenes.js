/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/
const button = document.getElementById("btn");
const result = document.getElementById("primes");
const input = document.getElementById("num");
const MAXIMUM_LIMIT = 1000000;

const sieve = function (n) {
  "use strict";
  if (n <= 2) return [];

  // Each array index represents a number from 0 up to (but not including) n.
  const isPrime = new Uint8Array(n);
  isPrime.fill(1);
  isPrime[0] = 0;
  isPrime[1] = 0;

  const maximum = Math.sqrt(n - 1);

  for (let i = 2; i <= maximum; i++) {
    if(isPrime[i] === 1){
      for(let j = i * i; j < n; j += i){
        isPrime[j] = 0;
      }
  }

  var primes = [];
  for(let i = 2; i < n; i++){
    if(isPrime[i] ===1)
      primes.push(i);
  }

  return primes;
};
}

button.addEventListener("click", (e)=>{
  e.preventDefault();

  const number = Number(input.value);

  if (!Number.isInteger(number) || number < 2 || number > MAXIMUM_LIMIT) {
    result.textContent = "Please enter a whole number from 2 to 1000000";
    return;
  }

  const primesArray = sieve(number);
  result.textContent = primesArray.join(", ");
})