const productsList = [{
    name: "Mouse",
    price: 2000
},
{
    name: "Keyboard",
    price: 3500
},
{
    name: "Monitor",
    price: 9000
}
];
const tableElemnt = document.querySelector(".body-table");
const addName = document.querySelector(".add-name");
const addPrice = document.querySelector(".add-price")
const totalElement = document.querySelector("tfoot td");
const addModal = document.querySelector('.add-modal')
const updateNameModal = document.querySelector('.update-name-modal')
const updateNameInput = document.querySelector('.update-name')
const updateNameSubmit = document.querySelector('.update-name-submit');
const updatePriceModal = document.querySelector('.update-price-modal')
const updatePriceInput = document.querySelector('.update-price')
const updatePriceSubmit = document.querySelector('.update-price-submit');
const closeAddModal = document.querySelector('.close-add-modal')
const closeUpdateNameModal = document.querySelector('.close-update-name-modal')
const closeUpdatePriceModal = document.querySelector('.close-update-price-modal')


function renderTable() {

    let productHtml = productsList.map((item, index) => {

        return `<tr>
        <td>${index + 1}</td>
        <td class="name">${item.name}</td>
        <td class="price">${item.price}</td>
        <td class="action">X</td>
  </tr>`

    })

    let total = productsList.reduce((acc, curr) => {
        return acc + curr.price
    }, 0)

    tableElemnt.innerHTML = productHtml.join('')
    totalElement.textContent = total

    deleteRow();
    updateName();
    updatePrice();

}

function add() {
    let name;
    let price;

    document.querySelector('.add-btn').addEventListener('click', () => {
        addModal.classList.remove('hide')
    })


    closeAddModal.addEventListener('click', () => {
        addModal.classList.add('hide')
    })

    addName.addEventListener('change', (e) => {
        name = e.target.value;
    });
    addPrice.addEventListener('change', (e) => {
        price = e.target.value;

    });

    document.querySelector('.add-submit').addEventListener('click', () => {
        if (name && price) {
            productsList.push({ name: name, price: Number(price) })
            addModal.classList.add('hide');
            addName.value = "";
            addPrice.value = "";
            document.querySelector(".error-add").innerHTML = ""
            renderTable();
            name = "";
            price = "";
        } else {
            document.querySelector(".error-add").innerHTML = "Giá trị nhập chưa hợp lệ"
        }

    })

}

document.querySelector('.delete-btn').addEventListener('click', () => {
    while (productsList.length > 0) {
        productsList.pop()
    }
    renderTable();
})




function deleteRow() {
    const tdAction = document.querySelectorAll(".action");

    tdAction.forEach((item, index) => {
        item.addEventListener('click', () => {
            console.log("hi")
            productsList.splice(index, 1);
            console.log(productsList)
            renderTable();
        })
    })
}

function updateName() {
    const tdName = document.querySelectorAll('.name');
    tdName.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            let name
            updateNameModal.classList.remove('hide')
            updateNameInput.addEventListener('change', (e) => {
                name = e.target.value;
            })
            updateNameSubmit.addEventListener('click', () => {
                if (name) {
                    e.target.textContent = name
                    updateNameModal.classList.add('hide')
                    productsList[index].name = name
                    document.querySelector(".error-name").innerHTML = ""
                    document.querySelector('.update-name').value = "";
                    name = "";
                    console.log(productsList)
                } else {
                    document.querySelector(".error-name").innerHTML = "Giá trị nhập chưa hợp lệ"
                }
            })
            closeUpdateNameModal.addEventListener('click', () => {
                updateNameModal.classList.add('hide')
            })
        })
    })


}

function updatePrice() {
    const tdPrice = document.querySelectorAll('.price');
    tdPrice.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            let price
            updatePriceModal.classList.remove('hide')
            console.log(e.target.textContent)
            updatePriceInput.addEventListener('change', (e) => {
                price = e.target.value;
            })
            updatePriceSubmit.addEventListener('click', () => {
                if (price) {
                    e.target.textContent = price
                    updatePriceModal.classList.add('hide')
                    productsList[index].price = Number(price)
                    document.querySelector(".error-price").innerHTML = "";
                    document.querySelector(".update-price").value = "";
                    price = "";
                    console.log(productsList)
                    renderTable();
                } else {
                    document.querySelector(".error-price").innerHTML = "Giá trị nhập chưa hợp lệ"
                }
            })
            closeUpdatePriceModal.addEventListener('click', () => {
                updatePriceModal.classList.add('hide')
            })
        })
    })
}

add();

renderTable();

