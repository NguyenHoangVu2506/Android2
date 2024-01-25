import httpapi from "../httpapi";

function AddUser(user){
    return httpapi.post('/user/adduser',user);
}

function Login(user){
    return httpapi.post('/user/login',user);
}
const Userservice = {
   AddUser:AddUser,
   Login:Login,
}
export default Userservice;