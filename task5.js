// Traversing the DOM
var itemlist = document.querySelector('#items');
//parentNode
// console.log(itemlist.parentNode);
// itemlist.parentNode.style.backgroundColor = '#f4f4f4';
// console.log(itemlist.parentNode.parentNode);

//parentElement
// console.log(itemlist.parentElement);
// itemlist.parentElement.style.backgroundColor = '#f4f4f4';
// console.log(itemlist.parentElement.parentElement);

//childNode
// console.log(itemlist.childNodes);
// console.log(itemlist.children);
// console.log(itemlist.children[1]);

// FirstChild
// console.log(itemlist.firstChild);
// FirstElementchild
// console.log(itemlist.firstElementChild);
// itemlist.firstElementChild.textContent ='HELLO'

// LastChild
// console.log(itemlist.lastChild);
// // LastElementchild
// console.log(itemlist.lastElementChild);
// itemlist.lastElementChild.textContent ='HELLO'

// // Nextsibling
// console.log(itemlist.nextSibling);
// // NextElementsibling
// console.log(itemlist.nextElementSibling);

//previousSibling
// console.log(itemlist.previousSibling);
// // previousElementSibling
// console.log(itemlist.previousElementSibling);

// creating new element
// create div
var newDiv = document.createElement('div');
//create classname
newDiv.className='HELLO';
//create id
newDiv.id='hello1'
//add attribute
newDiv.setAttribute('Title','Hello Div');
//create text node
var newDivText = document.createTextNode('Hello');
//add text to div
newDiv.appendChild(newDivText);
var container = document.querySelector('header .container');
var h1=document.querySelector('header h1');

console.log(newDiv);
newDiv.style.fontSize='50px';
container.insertBefore(newDiv,h1)








