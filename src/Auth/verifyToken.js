export const verifyToken = () =>{
    if(localStorage.getItem('token')){
        return true
    }else{
        return false
    }
}