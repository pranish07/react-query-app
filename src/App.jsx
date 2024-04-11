import BasicExample from "./components/BasicExample";
// import { CreatePost } from "./components/UseMutationHook/CreatePost";
import UseQueryHook from "./components/UseQueryHook/UseQueryHook";

export const App = () => {
  return (
    <div>
      <h1>Basic Example</h1>
      <BasicExample />

      <h1>UseQuery Example</h1>
      <UseQueryHook />
      
      <h1>UseMutation Example</h1>
      {/* <CreatePost /> */}

    </div>
  );
};
