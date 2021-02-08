import React from 'react';
import { getPhoto } from './Photo';
import { Form, Col, Button, Container } from 'react-bootstrap';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'


export class Search extends React.Component {
  constructor(props){
    super(props);
    this.state={
      searchingText: '',
      photos: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    getPhoto(this.props.location.search).then((response) => {
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
      return (
        <Item 
          key={photo.id}
          original={photo.urls.full}
          thumbnail={photo.urls.thumb}
          width="1024"
          height="768"
          title={`Author: ${photo.user.name}, Description: ${photo.alt_description}`}          
        >
          {({ ref, open }) => (
            <img style={{ cursor: 'pointer', objectFit: 'cover', width: '100%', maxHeight: '100%',}} ref={ref} onClick={open} src={photo.urls.thumb}/>
          )}                      
        </Item>
      );        
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
          <h1>{this.state.searchingText}</h1>
        </div>
        <div>
          <Gallery>
            <div className='gallery-div'
              style={{
                display: 'grid',
                gridTemplateColumns: '240px 171px 171px',
                gridTemplateRows: '114px 114px',
                gridGap: 12,
              }}
            >
              { photoList }
            </div>
          </Gallery>
        </div>
      </Container>
    );
  }
}