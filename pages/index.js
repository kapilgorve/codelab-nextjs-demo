import { Component } from 'react';
import { Box, Container, Flex, Provider } from 'rebass';
import fetch from 'isomorphic-unfetch';
import AddForm from './components/form';
import Post from './components/post';

const API = 'http://localhost:4000';

class Index extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };

    this.add = this.add.bind(this);
  }
  static async getInitialProps() {
    {
      const res = await fetch(`${API}/posts`);
      const data = await res.json();
      return {
        posts: data
      };
    }
  }

  componentDidMount() {
    this.setState({ posts: this.props.posts });
  }

  add(post) {
    console.log(this);
    this.setState({ posts: [...this.state.posts, post] });
  }

  render() {
    return (
      <Provider>
        <Container>
          <AddForm posts={this.state.posts} add={this.add} />
          <div style={style}>
            {this.state.posts.map(post => (
              <Box width={1 / 3} px={2} key={post.id}>
                <Post post={post} />
              </Box>
            ))}
          </div>
        </Container>
      </Provider>
    );
  }
}

export default Index;

const style = {
  display: 'flex',
  flexWrap: 'wrap'
};
