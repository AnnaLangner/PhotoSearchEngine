import React from 'react';


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
    //przejście na strone search
    return this.props.history.push({
      pathname: '/search',
      search: this.state.searchingText
    })
  }

  render() {
    return(
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
    )
  }
}