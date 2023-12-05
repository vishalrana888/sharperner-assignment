console.log('person1: shows ticket');
console.log('person2: shows ticket');


const preMovie = async()=>{
    const promiseWifeBringTicks =new Promise((resolve, reject)=>{
        setTimeout(()=> resolve('ticket'), 3000);
    });
    const getPopcorn =new Promise((resolve, reject)=>resolve(`popcorn`));
    const getButter =new Promise((resolve, reject)=>resolve(`butter`));
    const getColdDrinks =new Promise((resolve, reject)=>resolve(`colddrinks`));

    let ticket = await promiseWifeBringTicks;

    let[popcorn,butter,colddrinks] = await Promise.all([getPopcorn,getButter,getColdDrinks])

    console.log(`${popcorn}, ${butter}, ${colddrinks}`)

    return ticket;
}

preMovie().then((m) => console.log(`person3: shows ${m}`));

console.log('person4: shows ticket');
console.log('person5: shows ticket');