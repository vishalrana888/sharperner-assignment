// an arrow function which returns the product of two numbers

const product =(a,b)=>{
    return (a*b) ;
}
console.log(product(4,5));

// student object

const student ={
    name: "vishal",
    roll_no: 76,
    greet() {
       console.log('Hi, Iam ' + this.name);
    }
};
student.greet();