import './index.css'

const ProjectCards = props => {
  const {ProjectDetails} = props
  const {name, imageUrl} = ProjectDetails
  console.log(name)

  return (
    <li className="projects-list-items">
      <div>
        <img src={imageUrl} alt={name} />
        <p>{name}</p>
      </div>
    </li>
  )
}

export default ProjectCards
