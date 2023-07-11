import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Post(props) {
    const { post } = props;
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>
          {post.description}
        </Card.Text>
        <Button variant="primary">
            <Link to={`/post/${post._id}`}
            style= {{textDecoration: 'none', color: 'inherit'}}
            >
            More details
            </Link>
            </Button>
      </Card.Body>
    </Card>
  );
}

export default Post;