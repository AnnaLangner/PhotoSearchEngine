import React from 'react';
import { getPhoto } from './Photo';


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
        <li key={photo.id}>
          <p>{photo.user.name}</p>
          <p>{photo.alt_description}</p>
          <img src={photo.urls.small} alt='' />
        </li>
      );        
    });

    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
          Photo search engine:
          <input
            type='text'
            onChange={this.handleChange}
            placeholder='Enter your search term here'
            value={this.state.searchingText}
          />
          </label>
          <input type='submit' value='Send'/>
        </form>
        <div>
          <ul>
          { photoList }
          </ul>
        </div>
      </div>
    );
  }

}