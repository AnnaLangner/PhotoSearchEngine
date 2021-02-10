import React from 'react';
import { getPhoto } from './Photo';
import { getAutocomplete } from './Autocomplete';
import { Form, Col, Button, Container } from 'react-bootstrap';
import Gallery from 'react-grid-gallery';
import Pagination from "react-js-pagination";


export class Search extends React.Component {
  constructor(props){
    super(props);
    this.state={
      searchingText: '',
      autocompleteArray: [],
      photos: [],
      page: 1,
      numberOfPhotos: 0,
      showTooltip: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.onClick= this.onClick.bind(this);
  }

  componentWillMount() {
    getPhoto(this.props.location.search, 1).then((response) => {
      this.setState({
        photos: response.results,
        numberOfPhotos: response.total
      });
    }).catch(err=>console.log(err.message));
  }

  handlePageChange(pageNumber) {
    getPhoto(this.props.location.search, pageNumber).then((response) => {
      this.setState({
        photos: response.results,
        page: pageNumber
      });
    }).catch(err=>console.log(err.message));
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
    }
    this.setState({
      searchingText: searchingText,
      showTooltip: false
    });    
  }

  handleSubmit(e) {
    this.props.history.push({
      pathname: '/search',
      search: this.state.searchingText
    })
    e.preventDefault();
    window.location.reload();
  }

  onClick(e) {
    this.props.history.push({
      pathname: '/search',
      search: e.target.innerText
    })
    window.location.reload();
  }    

  render(){
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
      <Container className="search-container">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className='search'>
            <Form.Row className="align-items-center">        
              <Col sm={9}>
              <Form.Control
                  type='text'
                  onChange={this.handleChange}
                  placeholder='Changed your mind? Enter the new term here'
                  value={this.state.searchingText}
                /> 
              </Col>  
              <Col sm={3}>
                  <Button type="submit" className='btn-submit-search'>Submit</Button>
                </Col>          
            </Form.Row>
            {this.state.showTooltip && (<Form.Row className="autocomplete">{autocompleteList}</Form.Row>)}
          </Form.Group>            
        </Form>
        <div className="gallery-box">
          <Gallery images= { photoList } enableImageSelection={false}/>
        </div>
        <div className="pagination-div">
          <Pagination
            activePage={this.state.page}
            itemsCountPerPage={30}
            totalItemsCount={this.state.numberOfPhotos}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange }
            innerClass={'pagination-controls'}
            itemClass={'pagination-controls-button'}
            linkClass={'pagination-links'}
          />
        </div>
      </Container>
    );
  }
}