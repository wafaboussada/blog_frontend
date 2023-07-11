import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Post from "./Post";
import { fetchPosts } from '../store/posts';

function Posts () {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.post.posts);
    useEffect(() => {
        const getPosts = async() => {
            const res = await axios.get('/posts');
            console.log('posts', res);
            dispatch(fetchPosts(res.data));
        }
        getPosts();
    }, []);
    console.log('stateposts', posts);
    return (
        <div>
           {posts.map((post) => (
                <Post post={post}/>
           ))}
        </div>
    )
}

export default Posts;