import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, updateActiveLanguageId, activeLanguageId} = props

  const onChangelanguage = () => {
    updateActiveLanguageId(languageDetails.id)
  }

  const ClassName =
    activeLanguageId === languageDetails.id ? 'active' : 'inactive'
  return (
    <li className="items">
      <button type="button" onClick={onChangelanguage} className={ClassName}>
        {languageDetails.language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
