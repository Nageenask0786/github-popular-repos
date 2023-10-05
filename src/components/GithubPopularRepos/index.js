import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    ReposList: [],
    activeLanguageId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeLanguageId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        ReposList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateActiveLanguageId = activeLanguageId => {
    this.setState({activeLanguageId}, this.getRepos)
  }

  renderFailureView = () => (
    <div className="api-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderReposList = () => {
    const {ReposList} = this.state
    return (
      <ul className="repos-list">
        {ReposList.map(each => (
          <RepositoryItem key={each.id} repoData={each} />
        ))}
      </ul>
    )
  }

  renderLanguageFilterList = () => {
    const {activeLanguageId} = this.state
    return (
      <ul className="language-details-container">
        {languageFiltersData.map(each => (
          <LanguageFilterItem
            isSelected={each.id === activeLanguageId}
            key={each.id}
            languageDetails={each}
            updateActiveLanguageId={this.updateActiveLanguageId}
            activeLanguageId={activeLanguageId}
          />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFinalOutput = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderReposList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="repos-app">
        <h1 className="popular-heading">Popular</h1>
        {this.renderLanguageFilterList()}
        {this.renderFinalOutput()}
      </div>
    )
  }
}

export default GithubPopularRepos
