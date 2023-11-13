//get elementby classname

var items = document.getElementsByClassName('list-group-item');
console.log(typeof(document.getElementsByClassName))
console.log(items);
console.log(items[2]);
items[0].style.fontWeight = 'bold';
items[0].style.color = 'red';
items[1].style.fontWeight = 'bold';
items[1].style.color = 'red';
items[2].style.fontWeight = 'bold';
items[2].style.color = 'red';
items[3].style.fontWeight = 'bold';
items[3].style.color = 'red';
items[2].style.background = 'green';
items[2].style.color = 'red';
