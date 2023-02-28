import {Component} from 'react'

import './index.css'

import HistoryItem from '../HistoryItem'

class History extends Component {
  state = {searchInput: '', historyList: []}

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  filteredHistoryList = () => {
    const {initialHistoryList} = this.props
    this.setState({historyList: initialHistoryList})
    const {searchInput, historyList} = this.state
    const updatedList = historyList.filter(eachHistory =>
      eachHistory.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return updatedList
  }

  onDeleteHistory = id => {
    const {historyList} = this.state
    const updatedHistoryList = historyList.filter(
      eachHistory => eachHistory.id !== id,
    )
    this.setState({historyList: updatedHistoryList})
  }

  render() {
    const {searchInput} = this.state
    const filteredHistoryList = this.filteredHistoryList()
    return (
      <div className="bg-container">
        <div className="header-container">
          <div className="header">
            <img
              src="https://assets.ccbp.in/frontend/react-js/history-website-logo-img.png"
              alt="app logo"
            />
            <div className="search-bar-container">
              <div className="search-icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/search-img.png"
                  alt="search"
                />
              </div>
              <div className="search-container">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search history"
                  value={searchInput}
                  onChange={this.onChangeSearch}
                />
              </div>
            </div>
          </div>
        </div>
        {filteredHistoryList.length === 0 ? (
          <p className="para">There is no history to show.</p>
        ) : (
          <ul className="history-container">
            {filteredHistoryList.map(eachHistory => (
              <HistoryItem
                key={eachHistory.id}
                historyDetails={eachHistory}
                onDeleteHistory={this.onDeleteHistory}
              />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default History
