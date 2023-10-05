import './index.css'

const RepositoryItem = props => {
  const {repoData} = props
  return (
    <li className="repository-items">
      <img src={repoData.avatarUrl} alt={repoData.name} className="image" />
      <h1 className="name">{repoData.name}</h1>
      <div className="div1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="star"
        />
        <p>{repoData.starsCount}</p>
      </div>
      <div className="div1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="star"
        />
        <p>{repoData.forksCount}</p>
      </div>
      <div className="div1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="star"
        />
        <p>{repoData.issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
