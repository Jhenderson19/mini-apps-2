//reactstuff
import React from 'react';
import ReactPaginate from 'react-paginate';

//libraries
import axios from 'axios';
import _ from 'underscore';

//other components
import EventTable from './EventTable.jsx';
import SearchBar from './SearchBar.jsx';


class App extends React.Component{
  constructor(props) {
    super(props);

    this.defaultState = {
      lastSearch: '',
      events: [],
      pageLinks: [],
      query: '',
      pageCount: 0
    };
    this.state = this.defaultState;
  }

  async getEvents(searchTerms, page = 1) {
    if(!searchTerms) {
      searchTerms = this.state.lastSearch;
    }
    if(searchTerms.length) {
      var results = await axios.get(`/events?q=${searchTerms}&_page=${page}`);
      console.log(results);
      let events = results.data;
      let query = searchTerms;
      let pageLinks = [];

      try {
        pageLinks = results.headers.link.split(', ').map(link => {
          var linkTuple = link.split('; ');
          var linkObj = {
            link: linkTuple[0].slice(1, -1),
            rel: linkTuple[1].slice(5, -1)
          }
          return linkObj;
        })
        var pageCount = pageLinks.reduce((acc, cur) => {
          if (acc) return acc;
          if (cur.rel === 'last') {
            var index = cur.link.lastIndexOf('_page=') + 6;
            var endIndex = cur.link.indexOf('&', index);
            return endIndex !== -1 ?
              cur.link.slice(index, endIndex) : cur.link.slice(index);
          }
        }, 0);
      } catch (e) {
        pageLinks = [];
        pageCount = 0;
      }

      this.setState({
        lastSearch: searchTerms,
        events,
        query,
        pageLinks,
        pageCount
      });
      console.log(pageLinks);
    } else {
      this.setState(this.defaultState);
    }
  }
  changePage = (page) => {
    this.getEvents(undefined, page.selected + 1);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h1>Historical Events!</h1>
        <SearchBar getEvents={_.debounce(this.getEvents.bind(this), 100)}/>
        {this.state.events.length ?
          <EventTable events={this.state.events} /> : this.state.query.length ?
            `No Results Found For: '${this.state.query}'` : ``}
        {this.state.events.length > 1 ?
          <ReactPaginate
            pageCount={this.state.pageCount}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            onPageChange={this.changePage.bind(this)}
          /> : null}
      </div>
    )
  }
}

export default App;