import React, { Component } from 'react'

import axios from 'axios'

class Search extends Component {
  state = {
    userInput: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2',
    searchResults: []
  }

  makeApiCall = async searchTerm => {
    const resp = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?primary_release_year=1989&sort_by=popularity.desc&api_key=6ace706710ef6a37e0b50b31f5814c90`
    )
    this.setState({
      //  searchResults: resp.data.results
      searchResults: resp.data.results.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      )
    })
    console.log(
      this.state.searchResults.sort((a, b) => a.popularity - b.popularity)
    )
    //  console.log(this.state.searchResults['release_dates'])
  }

  componentDidMount = () => {
    this.makeApiCall()
  }

  displayMovies = () => {}

  render() {
    return (
      <main>
        <div>
          <article>
            <h1>The best of the year of 1989!</h1>
          </article>
          <section>
            <ul className="list-container">
              {this.state.searchResults.map(results => {
                return (
                  <li className="list" key={results.id}>
                    <img
                      src={`${this.state.userInput}${results['poster_path']}`}
                      alt="picture-of-movie"
                    />
                    <br />
                    <h3>{results.title}</h3>
                    <h5>{results['release_date']}</h5>
                    {results.overview}
                  </li>
                )
              })}
            </ul>
          </section>
        </div>
      </main>
    )
  }
}

export default Search
