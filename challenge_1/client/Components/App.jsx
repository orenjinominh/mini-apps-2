import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      searchInput: '',
      results: []
    };

    this.dBSearch = this.dBSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);


  };

  handleInputChange(event) {
    this.setState({
      searchInput: event.target.value
    });
  };

  
  dBSearch() {
    axios.get(`/events?q=${this.state.searchInput}&_page=1&_limit=10`)
      .then(response => {
        console.log(response.data);
        this.setState({
          results: response.data
        });
      })
      .catch(err => {
        console.log('Error getting results: ', err);
      })
  };

  render() {
    return(
      <div>
        <input type='text' onChange={this.handleInputChange}/>
        <input type='submit' onClick={this.dBSearch}/>
      </div>
    )

  };








};

export default App;