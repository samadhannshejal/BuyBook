const bookList = JSON.parse(localStorage.getItem('bookInformationData'));
const dropdownMenu = document.querySelector('.dropdown-menu');
const tableBody = document.getElementById('myTable');
let purchaseBooks = JSON.parse(localStorage.getItem('purchaseBooks')) || [];
const params = new URLSearchParams(window.location.search);
const logoutBtn = document.getElementsByClassName('logout-btn')[0]
logoutBtn.addEventListener('click', () => {
    window.location.href = '../../Login/Login.html'
})
let names = params.get('username');
const username = names.split('@')[0];
const liveUserBookPurchases = purchaseBooks.filter((item) => item.user == username)
console.log(liveUserBookPurchases)
bookList.forEach((i) => {
    const li = document.createElement('li');
    li.innerHTML = `<li class="d-flex align-items-center mb-1"><a class="dropdown-item" href="#">${i.bookName}</a><button class="btn btn-success me-2">purchase</button></li>`;
    dropdownMenu.appendChild(li);
    const purchaseBtn = li.querySelector('button');
    purchaseBtn.addEventListener('click', (e) => {
        Swal.fire({
            title: 'Are you sure you want to purchase this book?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            window.location.reload()
            if (result.isConfirmed) {

                const bookName = i.bookName;
                bookObj = bookList.find((item) => {
                    if (item.bookName == bookName) return true
                })
                const purchaseObj = {
                    bookname: bookObj.bookName,
                    author: bookObj.bookAuthorName,
                    price: bookObj.bookPrice,
                    description: bookObj.bookDescription,
                    user: username
                }
                purchaseBooks.push(purchaseObj);
                localStorage.setItem('purchaseBooks', JSON.stringify(purchaseBooks))
            }
        });
    });
})
for (let i = 0; i < liveUserBookPurchases.length; i++) {
    console.log(liveUserBookPurchases[i])
    var row = tableBody.insertRow();
    
    row.insertCell(0).innerHTML = liveUserBookPurchases[i].bookname;
    row.insertCell(1).innerHTML = liveUserBookPurchases[i].description;
    row.insertCell(2).innerHTML = liveUserBookPurchases[i].author;
    row.insertCell(3).innerHTML = liveUserBookPurchases[i].price;

}




