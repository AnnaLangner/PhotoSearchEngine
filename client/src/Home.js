import React from 'react';
import { Form, Col, Button, Container } from 'react-bootstrap';
import { getAutocomplete } from './Autocomplete';


export class Home extends React.Component {
  constructor(props){
    super(props);
    this.state={
      searchingText:'',
      autocompleteArray: [],
      showTooltip: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClick= this.onClick.bind(this);
  }

  handleChange(e) {
    const searchingText = e.target.value;  
    if (searchingText != '') {
      getAutocomplete(searchingText).then((response) => {     
        this.setState({
          autocompleteArray: response.autocomplete,
          showTooltip: true
        });      
      }).catch(err=>console.log(err.message));      
    } else {

      this.setState({
        autocompleteArray: [],
        showTooltip: false
      }); 
    }

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

  onClick(e) {
    this.props.history.push({
      pathname: '/search',
      search: e.target.innerText
    })
    window.location.reload();
  }

  render() {
    const { autocompleteArray } = this.state;

    let autocompleteList = (
        <ul className='suggestions'>
          {autocompleteArray.map((objectItem) => {
            return (        
              <li className='suggestions-li' onClick={this.onClick} key={objectItem.query}>{objectItem.query}</li>        
            )
          })} 
        </ul>     
    );

    return(
      <Container className="bg">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className='home'>
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
              {this.state.showTooltip && (<Form.Row className="autocomplete">{autocompleteList}</Form.Row>)}
          </Form.Group>
        </Form> 
      </Container>
    )
  };
};
