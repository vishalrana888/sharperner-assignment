// an arrow function which returns the product of two numbers

// const product =(a,b)=>{
//     return (a*b) ;
// }
// console.log(product(4,5));

// // student object

// const student ={
//     name: "vishal",
//     roll_no: 76,
//     greet() {
//        console.log('Hi, Iam ' + this.name);
//     }
// };
// student.greet();

// array

// const a =['apple', 'oranges' , ' ', 'mango', ' ' , 'lemon'];
// let transform_a=(a.map(fruit => fruit === ' ' ? 'empty string' : fruit));

// // console.log(a);
// // console.log(transform_a);
// a.push("banana");
// console.log(a)


// async/Promise

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const asyncFunction = async () => {
  console.log('a');
  console.log('b');
  
   await delay(3000);
  console.log('c');
  
  await delay(0);
  console.log('d');

  console.log('e');
};

asyncFunction()