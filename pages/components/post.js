import { Card, BackgroundImage, Subhead } from 'rebass';

const Post = ({ post }) => (
  <Card key={post.id} width={256}>
    <BackgroundImage ratio={1} src={post.img} />
    <Subhead p={2}>{post.title}</Subhead>
  </Card>
);

export default Post;
