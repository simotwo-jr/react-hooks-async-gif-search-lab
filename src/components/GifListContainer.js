import React, { Component } from 'react';
import GifList from './GifList';
import GifSearch from './GifSearch';

class GifListContainer extends Component {
  constructor() {
    super();
    this.state = {
      gifs: []
    };
  }

  componentDidMount() {
    this.fetchGifs("dolphin"); 
  }

  fetchGifs = (query) => {
    const apiKey = "YOUR_API_KEY"; 
    const url = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&rating=g`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ gifs: data.data.slice(0, 3) });
      })
      .catch(error => console.error("Error fetching gifs: ", error));
  }

  handleSearchSubmit = (query) => {
    this.fetchGifs(query);
  }

  render() {
    return (
      <div>
        <GifSearch onSubmit={this.handleSearchSubmit} />
        <GifList gifs={this.state.gifs} />
      </div>
    );
  }
}

export default GifListContainer;