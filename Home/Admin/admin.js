const bookSubmitBtn = document.getElementById('bookSubmitBtn');
const bookInformationData = JSON.parse(localStorage.getItem('bookInformationData')) || [];
const registeredBookTable = document.getElementById('myTable');
var registeredBookObj = JSON.parse(localStorage.getItem('bookInformationData'));
console.log("all registered book", registeredBookObj)
const userPurchaseBooks = JSON.parse(localStorage.getItem('purchaseBooks'));



const logoutBtn = document.getElementsByClassName('logout-btn')[0];
const form = document.querySelector('form');
let pageRefreshed = false;
window.addEventListener('storage',(e)=>{
    if(e.key=='purchaseBooks'){
        if (!pageRefreshed) {
            location.reload();
            pageRefreshed = true;
          }
    }
})

logoutBtn.addEventListener('click', () => {
    window.location.href = '../../Login/Login.html'
})

bookSubmitBtn.addEventListener('click', (e) => {
    // e.preventDefault()
    const bookName = document.getElementById('book-name').value;
    const bookDescription = document.getElementById('book-description').value;
    const bookPrice = document.getElementById('book-price').value;
    const bookAuthorName = document.getElementById('book-authorName').value;

    let booKImformation = {
        bookName,
        bookDescription,
        bookPrice,
        bookAuthorName,
    }
    let isbookNameAlreadyRegistered = false;
    bookInformationData.find((bookInfoObj) => {
        if (bookInfoObj.bookName == bookName) {
            isbookNameAlreadyRegistered = true
        }
    })
    switch (true) {
        case bookName === '':
            const bookNameReq = document.getElementById('bookNameErr');
            bookNameReq.innerHTML = 'please enter book name';
            bookNameReq.classList.add('red');
            break;
        case bookDescription === '':
            const bookDescriptionReq = document.getElementById('bookDescriptionErr');
            bookDescriptionReq.innerHTML = 'please enter book description';
            bookDescriptionReq.classList.add('red');
            break;
        case bookPrice === '':
            const bookPriceReq = document.getElementById('bookPriceErr');
            bookPriceReq.innerHTML = 'please enter book price';
            bookPriceReq.classList.add('red');
            break;
        case bookPrice <= 0:
            const inValidBookPrice = document.getElementById('bookPriceErr');
            inValidBookPrice.innerHTML = 'please valid book price';
            inValidBookPrice.classList.add('red');
            break;
        case bookAuthorName == '':
            const bookAuthorNameReq = document.getElementById('bookAuthorNameErr');
            bookAuthorNameReq.innerHTML = 'please enter book author name';
            bookAuthorNameReq.classList.add('red');
            break;
        default:
            document.getElementById('bookNameErr').innerHTML = '';
            document.getElementById('bookDescriptionErr').innerHTML = '';
            document.getElementById('bookPriceErr').innerHTML = '';
            document.getElementById('bookAuthorNameErr').innerHTML = '';
    }
    const bookInfoFeild = () => {
        if (bookName !== '' && bookAuthorName !== '' && bookPrice !== '' && bookDescription !== '' && bookPrice >= 0) {
            return true;
        }
        else return false
    }
    if (isbookNameAlreadyRegistered) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'book is alredy registered!',
        })
    }
    else if (bookInfoFeild()) {

        bookInformationData.push(booKImformation);
        localStorage.setItem('bookInformationData', JSON.stringify(bookInformationData))
        closeBtn();
        
        Swal.fire(
            'Book has been successfully  added!',
            // 'You clicked the button!',
            'success'
        )
      
    }
   
form.reset();

})
 function closeBtn() {
    const btn=document.getElementsByClassName('CloseBtn')[0];
    btn.click()
 }
const userPurchasesByBook = {};
userPurchaseBooks.forEach(purchase => {
    const bookName = purchase.bookname;
    if (!userPurchasesByBook[bookName]) {
        userPurchasesByBook[bookName] = {};
    }
    if (!userPurchasesByBook[bookName][purchase.user]) {
        userPurchasesByBook[bookName][purchase.user] = 1;
    } else {
        userPurchasesByBook[bookName][purchase.user]++;
    }
});

for (let i = 0; i < registeredBookObj.length; i++) {
    console.log(registeredBookObj)
    const bookName = registeredBookObj[i].bookName;
    console.log(registeredBookObj[i].bookName)
    console.log("bookName", bookName)
    const users = userPurchasesByBook[bookName];
    let userStr = "";

    if (users) {
        Object.keys(users).forEach(user => {
            if (userStr !== "") {
                userStr += ", ";
            }
            userStr += `${user} (${users[user]})`;
        });
    }
    const row = registeredBookTable.insertRow();
    row.insertCell(0).innerHTML = bookName;
    row.insertCell(1).innerHTML = registeredBookObj[i].bookDescription;
    row.insertCell(2).innerHTML = registeredBookObj[i].bookPrice;
    row.insertCell(3).innerHTML = registeredBookObj[i].bookAuthorName;
    row.insertCell(4).innerHTML = userStr;
}

