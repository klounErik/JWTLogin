export const deletePost = (id) =>{
        fetch(`http://localhost:1234/post/deletepost/${id}`,{
            method: 'DELETE'
        })
    }
