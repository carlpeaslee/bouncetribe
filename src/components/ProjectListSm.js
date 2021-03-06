import React from 'react'
import styled from 'styled-components'
import {PanelScrollContainer} from 'styled'
import {ProjectItemSm} from 'components/ProjectItemSm'

export const ProjectsContainerSm = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0 10px;
  width: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
`

const edgeFilter = (project, type) => (
  project.comments.edges.filter( (edge) => edge.node.type === type)
)

const makeList = (props) => {
  let bounceTab = props.location.pathname.includes('/bounces/')
  console.log('projsm ', props);
  let User = props.mentor ? props.viewer.Mentor : props.viewer.User
  let edges = bounceTab ? User.bounces.edges : User.projects.edges
  return edges.map((edge, index) => {
    let project = edge.node.project || edge.node
    let comments = edgeFilter(project, 'COMMENT')
    let likes = edgeFilter(project, 'LIKE')
    let bounces = project.bounces.edges.map(edge => edge.node)
    return (
      <ProjectItemSm
        key={project.id + index}
        User={User}
        project={project}
        comments={comments}
        likes={likes}
        bounces={bounces}
        bounceTab={bounceTab}
       />
    )
  } )
}

export const ProjectListSm = (props) => {
  return (
    <PanelScrollContainer>
      <ProjectsContainerSm>
        {makeList(props)}
      </ProjectsContainerSm>
    </PanelScrollContainer>
  )
}
