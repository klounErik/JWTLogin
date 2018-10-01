export const checkResetToken = async (token) =>{
    const res = await fetch('http://localhost:1234/api/auth', {
      method: 'POST',
      headers: {
        'Authorization': ' Bearer ' + token
      }
    })
    const req = await res.json()
    return req
}
