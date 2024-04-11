import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const POSTS = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

function BasicExample() {
const queryClient = useQueryClient()

  const postsQuery = useQuery({
    queryKey: ["demo-posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });

  const newPostMutation = useMutation({
    mutationFn: (title) => {
      return wait(1000).then(() =>
        POSTS.push({ id: crypto.randomUUID(), title })
      );
    },
    onSuccess: ()=>{
queryClient.invalidateQueries(['demo-posts'])
    }
  });

  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  return (
    <div>
      <ul>
      {postsQuery.data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
      </ul>
     <button disabled={newPostMutation.isPending} onClick={()=>newPostMutation.mutate("New Posts")}> Add new post </button>
    </div>
  );
}

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
export default BasicExample;
