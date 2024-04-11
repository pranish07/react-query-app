import { useState } from "react";
import { PostFile1 } from "./PostFile1";
import { PostFile2 } from "./PostFile2";
import Post  from "./Post";
import { CreatePost } from "../UseMutationHook/CreatePost";
import { PostListPaginated } from "../pagination/PostListPaginated";
import { InfiniteScroll } from "../infiniteScroll/InfiniteScroll";

// const POSTS = [
//     { id: 1, title: "Post 1" },
//     { id: 2, title: "Post 2" },
//   ];

//  /posts ->["posts"]
// /posts/1 -> ["posts",post.id]
// /posts?authorId=1 -> ["posts", {authorId:1}]
// /posts/2/comments -> ["posts",post.id,"comments"]

export const UseQueryHook = () => {
  const [currentPage, setCurrentPage] = useState(<PostFile1 />);

  // const postsQuery = useQuery({
  //     queryKey: ["posts"],
  //     queryFn: obj =>
  //       wait(1000).then(() => {
  //         console.log(obj);
  //         return [...POSTS];
  //       }),
  //   });
  //   if (postsQuery.isLoading) return <h1>Loading...</h1>;
  //   if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  // const abc = postsQuery.status ==="idle"

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostFile1 />)}>Post file 1</button>
      <button onClick={() => setCurrentPage(<PostFile2 />)}>Post file 2</button>
      <button onClick={() => setCurrentPage(<Post id={1} />)}>
        {" "}
        First post
      </button>
      <button onClick={()=>setCurrentPage(<CreatePost setCurrentPage ={setCurrentPage}/>)}>Create Post</button>

      <button onClick={()=>setCurrentPage(<PostListPaginated/>)}>Post List Paginated</button>
      <button onClick={() => setCurrentPage(<InfiniteScroll/>)}>
        Post List Infinite
      </button>

      <br />
      {currentPage}
    </div>
  );
};

export default UseQueryHook;
