import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import ProjectCards from '../ProjectCards'

import './index.css'

const apiConstants = {
  success: 'SuCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
  initial: 'INITIAL',
}

const ShowProjects = props => {
  const {categoriesList} = props
  const [activeCategory, setActiveCategory] = useState(categoriesList[0].id)
  const [projectData, setProjectData] = useState([])
  const [apiStatus, setApiStatus] = useState(apiConstants.initial)

  const getData = async () => {
    setApiStatus(apiConstants.progress)
    const response = await fetch(
      `https://apis.ccbp.in/ps/projects/?category=${activeCategory}`,
    )

    if (response.ok === true) {
      const data = await response.json()
      const updateProjectData = data.projects.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
      }))

      setApiStatus(apiConstants.success)
      setProjectData(updateProjectData)
    } else {
      setApiStatus(apiConstants.failure)
    }
  }

  console.log(projectData)

  useEffect(() => {
    getData()
  }, [activeCategory])

  const onChangeActiveCategory = event => {
    setActiveCategory(event.target.value)
  }

  const SuccessView = () => (
    <ul className="ProjectList-container">
      {projectData.map(each => (
        <ProjectCards ProjectDetails={each} key={each.id} />
      ))}
    </ul>
  )

  const LoadingView = () => (
    <div data-testid="loader" className="loading">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  const FailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something went wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={getData()}>
        Retry
      </button>
    </div>
  )

  const renderProjectsView = () => {
    switch (apiStatus) {
      case apiConstants.success:
        return SuccessView()

      case apiConstants.failure:
        return FailureView()

      case apiConstants.progress:
        return LoadingView()
      default:
        return null
    }
  }

  return (
    <div className="main-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
        alt="website logo"
      />
      <div>
        <select value={activeCategory} onChange={onChangeActiveCategory}>
          {categoriesList.map(each => (
            <option key={each.id} value={each.id}>
              {each.displayText}
            </option>
          ))}
        </select>
      </div>
      {renderProjectsView()}
    </div>
  )
}

export default ShowProjects
