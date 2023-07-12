import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Post from "./Post";
import { fetchPosts } from "../store/posts";
import { fetchcategories } from "../store/category";
import { Link } from "react-router-dom";

function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const categories = useSelector((state) => state.category.categories);
  const location = useLocation();
  console.log('location', location);
  const { search } = location; // const search = location.search;
  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/categories");
      console.log("categories", res);
      dispatch(fetchcategories(res.data));
    };
    const getPosts = async () => {
      const res = await axios.get("/posts" + search);
      console.log("posts", res);
      dispatch(fetchPosts(res.data));
    };
    getCategories();
    getPosts();
  }, [search]);
  console.log("stateposts", posts);
  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
      <ListGroup>
        {categories.map((category) => (
          <ListGroup.Item key={category._id}>
            <Link to={`/?category=${category.name}`}>
            {category.name}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Posts;
