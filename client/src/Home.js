import React from 'react';
import { Form, Col, Button, Container } from 'react-bootstrap'


export class Home extends React.Component {
  constructor(props){
    super(props);
    this.state={
      searchingText:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const searchingText = e.target.value;
    this.setState({
      searchingText: searchingText
    });    
  }

  handleSubmit() {
    return this.props.history.push({
      pathname: '/search',
      search: this.state.searchingText
    })
  }

  render() {
    return(
      <Container className="bg">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className='form-group'>
            <Form.Label>Photo search engine: </Form.Label>
              <Form.Row className="align-items-center">        
                <Col sm={9}>
                <Form.Control
                    type='text'
                    onChange={this.handleChange}
                    placeholder='Enter your search term here'
                    value={this.state.searchingText}
                  /> 
                </Col>  
                <Col sm={3}>
                    <Button type="submit" className='btn-submit-home'>Submit</Button>
                  </Col>          
              </Form.Row>
          </Form.Group>
        </Form> 
      </Container>
    )
  };
};
