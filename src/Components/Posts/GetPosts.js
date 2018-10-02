export const getPosts = async () =>{
    const res = await fetch('http://localhost:1234/post/posts')
    const req = await res.json()
    return req
}
