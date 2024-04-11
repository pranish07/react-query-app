import axios from "axios";

export function getPosts() {
  return axios
    .get("http://localhost:3000/posts", { params: { _sort: "title" } })
    .then((res) => res.data)
   
}
export function getPost(id){
  return axios.get(`http://localhost:3000/posts/${id}`).then(res=>res.data)
}

export function createPost({title, body}){
  return axios.post("http://localhost:3000/posts",{
    title, 
    body, 
    userId:1,
    id:String(Date.now()),
  }).then(res=>res.data)
}

// export function getPostsPaginated(page) {
//   return axios
//     .get("http://localhost:3000/posts", {
//       params: { _page: page, _sort: "title", _limit: 2 },
//     })
//     .then(res => {
//       const hasNext = page * 2 <= parseInt(res.headers["x-total-count"])
// console.log("debug",page,res.headers["x-total-count"])

//       return {
//         nextPage: hasNext ? page + 1 : undefined,
//         previousPage: page > 1 ? page - 1 : undefined,
//         posts: res.data,
//       }
//     })
// }
// console.log(getPostsPaginated(3))



export function getPostsPaginated(page, limit = 2) {
  // Calculate the offset based on the page number
  const offset = (page - 1) * limit;

  // Query posts for the specified page
  return axios.get("http://localhost:3000/posts", {
    params: { _start: offset, _limit: limit, _sort: "title" },
  })
  .then(res => {
    const posts = res.data;
    const hasNextPage = posts.length === limit; // If the number of posts received is equal to the limit, there might be more pages.
    const hasPreviousPage = page > 1; // If the page number is greater than 1, there is a previous page.
    
    return {
      nextPage: hasNextPage ? page + 1 : null,
      previousPage: hasPreviousPage ? page - 1 : null,
      posts: posts,
    };
  })
  .catch(error => {
    console.error("Error fetching posts:", error);
    throw error; // Rethrow the error for handling in the calling code.
  });
}

