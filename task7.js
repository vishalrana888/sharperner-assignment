const form = document.getElementById('addForm');
const item = document.getElementById('items');
const filter = document.getElementById('filter');
const itemList = document.getElementsByClassName('list-group-item');

form.addEventListener('submit', onSubmit);
item.addEventListener('click', ondelete);
filter.addEventListener('keyup', onfilter);

//adding edit btn to all list item
for (let i=0;i<itemList.length;i++)
{
  const editBtn = document.createElement('button');
  editBtn.className='btn btn-sm float-right editBtn';
  editBtn.appendChild(document.createTextNode('EDIT'))
  
  itemList[i].appendChild(editBtn)
  }
function onSubmit(e){
  e.preventDefault();

  const inputValue =document.getElementById('item').value;
  const description =document.getElementById('description').value;

  const li = document.createElement('li');

  li.className = 'list-group-item';

  const newText =document.createTextNode(inputValue)
  const descriptionNode =document.createTextNode(description)
  
  li.appendChild((newText));
  li.appendChild(descriptionNode);

  const deleteBtn = document.createElement('button');

  deleteBtn.className = 'btn btn-danger btn-sm float-right delete';

  deleteBtn.appendChild(document.createTextNode('X'));

  li.appendChild(deleteBtn);

  item.appendChild(li);
}

// Remove item
function ondelete(e){
  if(e.target.classList.contains('delete')){
    if(confirm('Are You Sure?')){
      const li = e.target.parentElement;
      item.removeChild(li);
    }
  }
}

// Filter Items
function onfilter(e){
  // convert text to lowercase
  const text = e.target.value.toLowerCase();
  // Get lis
 const items = item.getElementsByTagName('li');
  // Convert to an array
  Array.from(items).forEach(function(item){
    const itemName = item.firstChild.textContent;
    const description = item.childNodes[1].textContent;
    if(itemName.toLowerCase().indexOf(text) != -1 || description.toLowerCase().indexOf(text)!=-1)
    {
      item.style.display = 'block';
    }
    else
    {
      item.style.display = 'none';
    }
  });
}