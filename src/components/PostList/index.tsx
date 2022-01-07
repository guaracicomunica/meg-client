import { PostType } from "../../types/Post";
import Post from "../Post";
import PostActivity from "../PostActivity";

type PostListProps = {
  items: PostType[],
};

export default function PostList(props: PostListProps) {
  const posts = props.items;

  return (
    <>
    {
      posts.map((post, index) => (
        post.activity != null
        ?
          <PostActivity
            key={index}
            id={post.id}
            title={post.body}
            teacher={post.creator}
          />
        : 
          <Post
            key={index}
            id={post.id}
            creator={post.creator}
            date={post.date}
            body={post.body}
            comments={post.comments}
          />
      ))
    }
    </>
  );
}