import React from 'react';
import { Form, Col, Container } from 'react-bootstrap';
import { getAutocomplete } from './Autocomplete';
import AsyncSelect from 'react-select/async';


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
    this.loadOptions = this.loadOptions.bind(this);
  }

  handleChange(value) {
    const searchingText = value.label;  
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

  onClick(value) {
    this.props.history.push({
      pathname: '/search',
      search: value.label
    })
    window.location.reload();
  }

  async loadOptions(searchingText, callback) {    
    if (searchingText != '') {
      getAutocomplete(searchingText).then((response) => {    
        this.setState({
          autocompleteArray: response.autocomplete,
          showTooltip: true
        });      
      }).catch(err=>console.log(err.message));      
    }
    const { autocompleteArray } = this.state;

    callback(
      autocompleteArray.map(objectItem => ({label: objectItem.query}))
    )
  }

  render() {
    return(
      <Container className="bg">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className='home'>
            <Form.Label>Photo search engine: </Form.Label>
              <Form.Row className="align-items-center">        
                <Col sm={12}>
                  <AsyncSelect 
                    cacheOptions
                    value={this.state.searchingText}
                    placeholder='Enter your search term here'
                    loadOptions={this.loadOptions}
                    defaultOptions
                    onInputChange={this.handleChange}
                    onChange={this.onClick}                  
                  />
                </Col>              
              </Form.Row>
          </Form.Group>
        </Form> 
      </Container>
    )
  };
};
