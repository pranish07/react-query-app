import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../api/posts";
import { useRef } from "react";
import Post from "../UseQueryHook/Post";
import propTypes from "prop-types";
export const CreatePost = ({ setCurrentPage }) => {
  const titleRef = useRef();
  const bodyRef = useRef();
  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      queryClient.setQueryData(["posts", data.id], data);
      queryClient.invalidateQueries(["posts"], { exact: true });
      setCurrentPage(<Post id={data.id} />);
    },
  });
  function handleSubmit(e) {
    e.preventDefault();
    createPostMutation.mutate({
      title: titleRef?.current?.value,
      body: bodyRef?.current?.value,
    });
  }

  return (
    <div>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">
            {" "}
            Title
            <input type="text" id="title" ref={titleRef} /> <br />
          </label>
          <label htmlFor="body">
            Body
            <input type="text" id="body" ref={bodyRef} /> <br />
          </label>
        </div>
        <button disabled={createPostMutation.isLoading}>
          {createPostMutation.isLoading ? "Loading" : "Create"}
        </button>
      </form>
    </div>
  );
};

CreatePost.propTypes = { setCurrentPage: propTypes.func };
