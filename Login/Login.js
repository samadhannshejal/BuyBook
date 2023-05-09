const loginBtn = document.querySelector("#LoginBtn");
const form=document.querySelector('form');
const navigateToRegister=document.getElementById('navigateToRegister');

 const registeredDataOfUserAndAdmin=JSON.parse(localStorage.getItem('RegisterData'))


loginBtn.addEventListener('click',(e)=>{
    e.preventDefault()
 
    const userName = document.querySelector("#LoginInputUserName").value;
    const password = document.querySelector("#LoginInputpassword").value;
     for(const registeredAcc of registeredDataOfUserAndAdmin){
        
        if(userName==registeredAcc.userName&&password==registeredAcc.password){
            if(registeredAcc.userType=='User'){
              
                const encodedUserUsername =encodeURIComponent(registeredAcc.userName);
                window.location.href=`../Home/User/User.html?username=${encodedUserUsername}`  
            }
            else{
              
                const encodedAdminUsername =encodeURIComponent(registeredAcc.userName);
                window.location.href=`../Home/Admin/admin.html?username=${encodedAdminUsername}`
            }      
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                // footer: '<a href="">Why do I have this issue?</a>'
              })
        }
     }
     form.reset()
    
})


navigateToRegister.addEventListener('click',(e)=>{
      e.preventDefault()
      window.location.href="../Register/Register.html";
    })





// navigateToRegister.addEventListener('click',(e)=>{
//   e.preventDefault()
//   window.location.href="../Register/Register.html";
// })
// loginBtn.addEventListener("click", (e) => {
//   e.preventDefault();
 
//   const username = document.querySelector("#LoginInputUserName").value;
//   const password = document.querySelector("#LoginInputpassword").value;
//   const userData = JSON.parse(localStorage.getItem('RegisterData'));
//   console.log("registerData",userData)
//   const filterRegisterData = userData.find((user) => {
//     return user.userName == username && user.password == password
//   });
 
//   let logedUser = JSON.parse(localStorage.getItem('logedUser')) || [];
//   let logedAdmin = JSON.parse(localStorage.getItem('logedAdmin')) || [];
//   if (filterRegisterData) {
//     if (filterRegisterData.userType === 'User') {
//       const userlogin = {
//         username: filterRegisterData.userName,
//         UserFirstName: filterRegisterData.firstName,
//         UserlastName: filterRegisterData.lastName,
//         UserEmail: filterRegisterData.email,
//         isActive: true,
//       }
      
//       let existsUser = logedUser.find((item) => item.username === filterRegisterData.userName);
//       let existsUserIndex = logedUser.findIndex((item) => item.username === filterRegisterData.userName)
//       if(existsUser) {
//         existsUser = {
//           ...existsUser,
//           isActive: true,
//         }
//         logedUser[existsUserIndex] = existsUser;
//       } else  {
//         console.log("login new",userlogin)
//         logedUser.push(userlogin);
//       }
//       localStorage.setItem('logedUser', JSON.stringify(logedUser))
//       location.reload()
//       window.location.href = "./../Home/User/User.html"
//     }
//     else if (filterRegisterData.userType == "Admin") {
//       const adminlogin = {
//         username: filterRegisterData.userName,
//         AdminFirstName: filterRegisterData.firstName,
//         AdminlastName: filterRegisterData.lastName,
//         AdminEmail: filterRegisterData.email,

//       }
//       logedAdmin.push(adminlogin);
//       localStorage.setItem('logedAdmin', JSON.stringify(logedAdmin))
//       location.reload()
//       window.location.href = "./../Home/Admin/Admin.html"
//     }
//   } else {
//     // login failed
//     Swal.fire({
//       // position: 'top-end',
//       icon: 'error',
//       title: 'Oops...',
//       text: `somthing went wrong !`,
//       // footer: '<a href=""></a>'
//     })
//   }
//   form.reset()
// });
