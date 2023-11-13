// //examine doc object

// // console.dir(document);
// console.log(document.URL);
// console.log(document.title);
// console.log(document.doctype);
// console.log(document.head);
// console.log(document.body);
// console.log(document.all);
// console.log(document.all[10]);
// // document.all[10].textContent = "namaste"



// getelementbyid
// console.log(document.getElementById('header-title'));
// var headerTitle= document.getElementById('header-title');
// var header = document.getElementById('main-header');
// console.log(headerTitle)
// // headerTitle.textContent ="Namaste";
// // headerTitle.innerText='jai shree ram';
// headerTitle.innerHTML='<h3>hello</h3>';
// header.style.borderBottom = 'solid 3px #000';

//get elementby classname



// var items = document.getElementsByClassName('list-group-item');
// console.log(items);
// console.log(items[1]);
// items[1].style.fontWeight = 'bold';
// items[1].style.color = 'green';
// // items[1].innerText = 'Hello 2';


// Get the element with class 'title' which contains "Add Items"
var addItemsTitle = document.querySelector('.title');

addItemsTitle.style.fontWeight = 'bold';
addItemsTitle.style.color = 'green';

