const List = document.getElementById('item')
let products = [];

fetch('http://localhost:8080/api/getProducts')
    .then(result => result.json())
    .then(data => {
        data.forEach(item => {
            const newItem = document.createElement('option');
            newItem.setAttribute('value', item._id);
            newItem.innerHTML = item.name;
            List.appendChild(newItem);
        })
    });