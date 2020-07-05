import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      searchInput: '',
      results: [],
      currentPage: 0,
      pageCount: 0,
      perPage: 10
    };

    this.dBSearch = this.dBSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);


  };

  handleInputChange(event) {
    this.setState({
      searchInput: event.target.value
    });
  };

  
  dBSearch() {
    axios.get(`/events?q=${this.state.searchInput}&_page=${this.state.currentPage + 1}&_limit=${this.state.perPage}`)
      .then(response => {
        // console.log(response.headers);
        this.setState({
          results: response.data, 
          pageCount: Math.ceil(response.headers['x-total-count']/ this.state.perPage)

        });
      })
      .catch(err => {
        console.log('Error getting results: ', err);
      })
  };

  handlePageClick(page) {
    let selectedPage = page.selected;
    this.setState({ currentPage: selectedPage}, () => {
      this.dBSearch();
    });
  };

  render() {
    return(
      <div>

        <div>
        <input type='text' onChange={this.handleInputChange}/>
        <input type='submit' onClick={this.dBSearch}/>
        </div>
        <br></br>
        <h2>Events</h2>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
        <div>
        {
          this.state.results.map((result, index) => {
            return (
              <div key={index} >
                <div>{result.date}</div>
                <div id={index}>{result.description}</div>
                <br></br>
              </div>
            )
          })
        }
        </div>

      </div>

    )

  };








};

export default App;