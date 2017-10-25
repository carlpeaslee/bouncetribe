import React, {Component} from 'react'
import Relay from 'react-relay'
import {ProjectItemSm} from 'components/ProjectItemSm'
import {ProjectsContainerSm} from 'containers/Projects'


class Bounces extends Component {

componentDidMount = () => {
  console.log('mounted', this.props.viewer.User.handle);
}
  edgeFilter = (project, type) => {
    return project.comments.edges.filter( (edge) =>
      edge.node.type === type
    )
  }

  makeList = () => {
    let User = this.props.viewer.User
    return User.bounces.edges.map(edge => {
      let project = edge.node.project
      if (project.privacy === 'PRIVATE') {
        return null //shouldnt have been able to bounce a private project anyway
      } else {
        let comments = this.edgeFilter(project, 'COMMENT')
        let likes = this.edgeFilter(project, 'LIKE')
        return (
          <ProjectItemSm
            key={project.id}
            User={User}
            project={project}
            comments={comments}
            likes={likes}
            bounceTab />
        )
      }
    } )
  }

  render () {
    return (
      <ProjectsContainerSm>
        {this.makeList()}
      </ProjectsContainerSm>
    )
  }
}

export default Relay.createContainer(
  Bounces, {
    initialVariables: { userHandle: '' },
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          user {
            id
            handle
          }
          User (handle: $userHandle) {
            id
            handle
            bounces (
              first:999
            ) {
              edges {
                node {
                  id
                  project {
                    id
                    title
                    createdAt
                    artwork {url}
                    privacy
                    creator {handle}
                    comments (first: 999){
                      edges {
                        node {
                          type
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
    }
  }
)
