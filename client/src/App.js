import './App.css';
import React from 'react';

class App extends React.Component {
  state = {
    photos: [],
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/photos')
      .then(res => res.json())
      .then(res => {
        this.setState({ photos: res });
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.photos.map(photo => <li key={photo.id}>
            <p>{photo.user.name}</p>
            <p>{photo.alt_description}</p>
            <img src={photo.urls.small} alt='' /></li>)}
        </ul>
      </div>
    );
  }
};

export default App;

