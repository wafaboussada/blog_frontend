import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { fetchcategories } from "../store/category";
function PostItem() {
    const location = useLocation();
    console.log(location);
    const path = location.pathname.split('/')[2];
    console.log(path);
    const [post, setPost] = useState({});
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);
    const user = useSelector((state) => state.user.user);
    console.log('userrr', user);
    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            console.log(res);
            setPost(res.data);
        }
        getPost();
      }, []);
      const handleSelectedCat = (event) => {
        const options =event.target.options;
        console.log('options', options);
        let values = [];
        for (let i =0; i < options.length; i++) {
            if (options[i].selected) {
                values.push(options[i].value);
            }
        }
        console.log(values);
        setCategoeisSelected(values);
      }
      const handleChangeFile  = (e) => {
        console.log('file', e.target.files);
        setFile(e.target.files[0]);
      }
      const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            title,
            description,
            categories: categoriesSelected,
            username: user.username,
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            try {
                await axios.post("/upload", data);
                newPost.picture = filename;
            } catch (err) {
                console.log('err', err);
            }
        }
        try {
            const res = await axios.post("/posts", newPost);
            console.log('create post result', res);
        } catch (err) {
            console.log(err);
        }
      }
      const imagePath = "http://localhost:5000/images/";
  return (
    <Form className="container mt-5" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Categories</Form.Label>
            {post.categories.map((cat) => (
                <span key={cat._id}>{cat}</span>
            ))}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Image</Form.Label>
        {post.picture && (
            <img src={post.picture} alt="" width="100"/>
        )}
        {/* <Form.Control type="file" placeholder="Password" onChange={(e) => handleChangeFile(e)}/> */}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Post Title" 
        onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Description" 
        onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
      >
        Submit
      </Button>
      {/* {error && (
        <Alert className="mt-2" key="danger" variant="danger">
          Please verify your username/password !
        </Alert>
      )} */}
    </Form>
  );
}

export default PostItem;
