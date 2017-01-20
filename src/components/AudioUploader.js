import React, {Component} from 'react'
import Relay from 'react-relay'
import {Container} from 'styled/AudioUploader'
import Dropzone from 'react-dropzone'
import uploadFile from 'utils/uploadFile'
import createVisualization from 'utils/createVisualization'
import UpdateFile from 'mutations/UpdateFile'

class AudioUploader extends Component {

  onAudioDrop = (files, rejectedFile) => {
    let file = files[0]
    Promise.all([
      uploadFile(file),
      createVisualization(file)
    ])
    .then( ([fileId, visualization]) => {
      this.props.relay.commitUpdate(
        new UpdateFile({
          self: this.props.self,
          fileId: fileId,
          visualization: visualization
        }), {
          onSuccess: (transaction) => {
            this.props.fileSuccess(fileId)
          }
        }
      )
    })

  }


  render () {
    return (
      <Container>
        <Dropzone
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
          }}
          multiple={false}
          accept={'audio/*'}
          maxSize={10000000}
          onDrop={this.onAudioDrop}
        >

        </Dropzone>
      </Container>
    )
  }
}

export default Relay.createContainer(
  AudioUploader, {
    fragments: {
      self: () => Relay.QL`
        fragment on User {
          id
        }
      `,
    },
  }
)
