import React from 'react';
import { getPhoto } from './Photo';
import { Form, Col, Button, Container } from 'react-bootstrap';
import Gallery from 'react-grid-gallery';


export class Search extends React.Component {
  constructor(props){
    super(props);
    this.state={
      searchingText: '',
      photos: [],
      page: 1
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    getPhoto(this.props.location.search, 1).then((response) => {
      this.setState({
        photos: response,
      });
    }).catch(err=>console.log(err.message));
  }

  handleChange(e) {
    const searchingText = e.target.value;
    this.setState({
      searchingText: searchingText
    });
  }

  handleSubmit(e) {
    console.log(this.state.searchingText)
    this.props.history.push({
      pathname: '/search',
      search: this.state.searchingText
    })
    e.preventDefault();
    window.location.reload();
  }
    

  render(){
    const { photos } = this.state;

    let photoList = photos.map((photo) => {
      const thumbnailScale = photo.width / 200;

      return {
        src: photo.urls.full,
        thumbnail: photo.urls.thumb,
        thumbnailWidth: 200,
        thumbnailHeight: photo.height / thumbnailScale,
        isSelected: false,
        caption: "Author: " + photo.user.name + ", Description: " + photo.alt_description
      }      
    });

    return(
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className='form-group-search'>
            <Form.Row className="align-items-center">        
              <Col sm={9}>
              <Form.Control
                  type='text'
                  onChange={this.handleChange}
                  placeholder='You changed your mind? Enter the new term here'
                  value={this.state.searchingText}
                /> 
              </Col>  
              <Col sm={3}>
                  <Button type="submit" className='btn-submit-search'>Submit</Button>
                </Col>          
            </Form.Row>
          </Form.Group>            
        </Form>
        <div>
          <Gallery images= { photoList } enableImageSelection={false} />
        </div>
      </Container>
    );
  }
}