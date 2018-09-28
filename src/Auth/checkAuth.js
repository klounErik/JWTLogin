export const checkAuth = async () =>{
    const res = await fetch('http://localhost:1234/api/auth', {
      method: 'POST',
      headers: {
        'Authorization': ' Bearer ' + localStorage.getItem('token')
      }
    })
    const req = await res.json()
    return req
  }