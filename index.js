let productsList = [{
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
const searchInput = document.querySelector('.search_input');
const searchBtn = document.querySelector('.search-btn');
const errorName = document.querySelector(".error-name");
const errorPrice = document.querySelector(".error-price")

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
        return acc + Number(curr.price)
    }, 0)

    tableElemnt.innerHTML = productHtml.join('')
    totalElement.textContent = total

    const tdName = document.querySelectorAll('.name');
    const tdPrice = document.querySelectorAll('.price');


    deleteRow();
    update(tdName, updateNameModal, updateNameInput, updateNameSubmit, errorName, "name", closeUpdateNameModal);
    update(tdPrice, updatePriceModal, updatePriceInput, updatePriceSubmit, errorPrice, "price", closeUpdatePriceModal);
    // updateName();
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
            productsList.splice(index, 1);
            renderTable();
        })
    })
}


function update(element, modal, input, submit, error, type, iconClose) {

    element.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            let value
            let currentIndex;
            modal.classList.remove('hide')
            input.addEventListener('change', (e) => {
                value = e.target.value;
            })

            submit.addEventListener('click', () => {

                if (value && currentIndex != index) {
                    e.target.textContent = value
                    modal.classList.add('hide')
                    productsList[index][type] = value
                    currentIndex = index;
                    renderTable()
                    error.innerHTML = ""
                    input.value = "";
                    value = "";
                } else {
                    error.innerHTML = "Giá trị nhập chưa hợp lệ"
                }
            })


            iconClose.addEventListener('click', () => {
                modal.classList.add('hide')
            })
        })
    })
}


function search() {
    let value;
    searchInput.addEventListener('change', (e) => {
        value = e.target.value;
    })
    searchBtn.addEventListener('click', () => {

        productsList = productsList.filter(item => {
            return item.name.toLowerCase().includes(value);
        })

        renderTable()
    })
}

search();

add();

renderTable();

