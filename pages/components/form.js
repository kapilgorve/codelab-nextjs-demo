import React, { Component } from 'react';
import {
  Heading,
  Button,
  Container,
  Box,
  Overlay,
  Fixed,
  Input,
  Label,
  Close,
  ButtonOutline
} from 'rebass';
import fetch from 'isomorphic-unfetch';

const API = 'http://localhost:4000';

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      title: '',
      img: '',
      description: ''
    };
    this.add = this.add.bind(this);
  }

  handleChange(event) {
    let { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  async add() {
    let { title, img, description } = this.state;
    let id = this.props.posts.length + 1;
    let data = { id, title, img, description };
    let res;
    try {
      res = await fetch(`${API}/posts`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      res = await res.json();
    } catch (e) {
      console.log(e);
    }
    this.setState({ isVisible: false });
    this.props.add(res);
  }
  render() {
    return (
      <Container>
        <div>
          <Button
            onClick={e => this.setState({ isVisible: true })}
            children="Add New Post"
          />
          {this.state.isVisible && (
            <div>
              <Fixed
                top
                right
                bottom
                left
                onClick={e => this.setState({ isVisible: false })}
              />
              <Overlay w={800}>
                <Box mb={4}>
                  <Heading>
                    Add New New Post <Close />
                  </Heading>
                </Box>

                <Box mb={2}>
                  <Label>Title</Label>
                  <Input name="title" onChange={e => this.handleChange(e)} />
                </Box>

                <Box mb={2}>
                  <Label>Image URL</Label>
                  <Input name="img" onChange={e => this.handleChange(e)} />
                </Box>

                <Box mb={2}>
                  <Label>Description</Label>
                  <Input
                    name="description"
                    onChange={e => this.handleChange(e)}
                  />
                </Box>
                <ButtonOutline children="Submit" onClick={this.add} />
              </Overlay>
            </div>
          )}
        </div>
      </Container>
    );
  }
}

export default AddForm;
