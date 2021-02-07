import React from 'react';
import { getPhoto } from './Photo';


export class Search extends React.Component {
  constructor(){
    super();
    this.state={
      searchingText:'london',
      photos: []
    }
  }

  componentWillMount() {
    getPhoto(this.state.searchingText).then((response) => {
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

    if (searchingText.length > 3) {
			this.props.onSearch(searchingText);
		}
  }

  handleKeyUp(e) {
		if (e.keyCode === 13) {
			this.props.onSearch(this.state.searchingText);
		}
	}    

  render(){
    const { photos } = this.state;
    console.log(photos)

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
        <input
          type='text'
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          placeholder='Enter your search term here'
          value={this.state.searchText}
        />
        <div>
          <ul>
          { photoList }
          </ul>
        </div>
      </div>
    );
  }

}