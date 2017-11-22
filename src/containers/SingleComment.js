import React, {Component} from 'react'
import {Single, Bottom, Time, Text, Center, Handle, BotLink, UpVote, SCContainer, SubComment, SCHandle, CommentP, SCCol, SCText} from 'styled/Comments'
import {RoundButton, BtAvatar} from 'styled'
import Heart from 'icons/Heart'
import Comment from 'icons/Comment'
import formatTime from 'utils/formatTime'
import TextField from 'material-ui/TextField'
import UpdateComment from 'mutations/UpdateComment'
import Relay from 'react-relay'
import {white, purple, blue, grey700} from 'theme'
import CreateComment from 'mutations/CreateComment'
import DeleteComment from 'mutations/DeleteComment'
import AddToCommentUpvotes from 'mutations/AddToCommentUpvotes'


class SingleComment extends Component {

  constructor(props) {
    super()
    this.state = {
      text: props.comment.text,
      newSubcomment: "",
      children: ((props.comment.children || {}).edges || []).map(edge => edge.node)
    }
    console.log('singlecommentprops', props, this.state);

  }


  // componentWillMount(){
  //   this.setState({,})
  // }

  editComment = (e) => {
    if (e.charCode === 13) {
      if (this.props.index === 0) {
        Relay.Store.commitUpdate(
          new CreateComment({
            authorId: this.props.comment.author.id,
            projectId: this.props.comment.project.id,
            type: this.props.comment.type,
            timestamp: this.props.comment.timestamp,
            text: this.state.text,
            sessionId: this.props.sessionId
          })
        )
        this.props.commentCreated()
        this.setState({text: ""})
      } else {
        Relay.Store.commitUpdate(
          new UpdateComment({
            id: this.props.comment.id,
            text: this.state.text,
          })
        )
        this.props.deactivate(this.props.index)
      }
    }
  }

  text = () => {
    if (this.props.active || this.props.index === 0) {
      return (
        <TextField
          id={this.props.comment.id}
          value={this.state.text}
          onChange={(e,newValue)=>{this.setState({text:newValue})}}
          fullWidth
          autoFocus={(this.props.focus === this.props.comment.id || this.props.index === 0)}
          onKeyPress={this.editComment}
          style={{ marginTop: '-16px', }}
          inputStyle={{ color: grey700, fontSize: '16px' }}
          underlineFocusStyle={{
            borderColor: (this.props.comment.type === 'COMMENT' ) ? blue : purple
          }}
        />
      )
    } else {
      return (<CommentP>{this.props.comment.text}</CommentP>)
    }
  }

  componentDidMount(){
    if(this.props.focus === this.props.comment.id){
      document.getElementById(this.props.comment.id).scrollIntoView({behavior:'smooth',block: 'start'})
    }
  }

  hider = () => {
    if (this.props.index === 0) {
      return false
    } else if (this.props.user.id !== this.props.comment.author.id && this.props.tabs === 'listen') {
      return true
    } else {
      return false
    }
  }

  render() {
    let {author, timestamp, type, id, upvotes} = this.props.comment
    return (
      <Single id={id} hide={this.hider()} >
        <RoundButton
          icon={(type === 'COMMENT') ?
            <Comment height={25} width={25} fill={white} />
            :
            <Heart height={25} width={25} fill={white} />
          }
          mini
          secondary={(type === 'COMMENT')}
          style={{ marginTop: '30px' }}
        />
        <Center>
          <Text>
            <Handle to={author.deactivated ? null : `/${author.handle}`} >
              {author.handle}
            </Handle>
            {this.text()}
          </Text>
          <Bottom>
            <BotLink
              onClick={()=>{this.props.activate(this.props.index)}}
              hideLink={(this.props.tabs === 'view' || this.props.index === 0 || this.props.user.id !== this.props.comment.author.id)}
            >
              Edit
            </BotLink>
            <BotLink
              hideLink={(this.props.tabs === 'view' || this.props.index === 0 || this.props.user.id !== this.props.comment.author.id)}
              onClick={()=>{
                console.log("this.props.comment.project.id", this.props.comment.project.id )
                Relay.Store.commitUpdate(
                  new DeleteComment({
                    id: this.props.comment.id,
                    projectId: this.props.comment.project.id
                  })
                )
              }}
            >
              Delete
            </BotLink>
            <UpVote
              secondary={(type==='COMMENT')}
              hideLink={(this.props.tabs === 'listen' || this.props.session)}
              onClick={()=>{
                Relay.Store.commitUpdate(
                  new AddToCommentUpvotes({
                    upvotesUserId: this.props.user.id,
                    upvotesCommentId: this.props.comment.id
                  })
                )
              }}
            >
              Upvote | {(upvotes) ? upvotes.edges.length : 0}
            </UpVote>
            <BotLink
              hideLink={(this.props.tabs === 'listen')}
              onClick={()=>{
                this.setState({subcomments: !this.state.subcomments})
              }}
            >
              Comments | {(!!this.state.children.length) ?  this.state.children.length : 0}
            </BotLink>
            <BotLink hideLink={false} >

            </BotLink>
          </Bottom>
          {(this.state.subcomments) ?
            <SCContainer>
            {this.state.children.map(child=>{
              return (
                <SubComment key={child.id} >
                  <BtAvatar user={child.author} size={30} />
                  <SCCol>
                    <SCHandle>{child.author.handle}</SCHandle>
                    <SCText>{child.text}</SCText>
                  </SCCol>
                </SubComment>
              )
            })}
            <TextField
              value={this.state.newSubcomment}
              name={'newSubcomment'}
              hintText={'Add a comment'}
              onChange={(e,newValue)=>{this.setState({newSubcomment:newValue})}}
              style={{ marginLeft: '35px' }}
              onKeyPress={(e)=>{
                if (e.charCode === 13) {
                  let newSubcommentData = {
                    authorId: this.props.user.id,
                    author: this.props.user, //for real time
                    type: 'COMMENT',
                    text: this.state.newSubcomment,
                    parentId: this.props.comment.id
                  }
                  Relay.Store.commitUpdate(
                    new CreateComment(newSubcommentData), {
                      onSuccess: success => {
                        console.log('newSubcomment', this.state.children)
                        this.setState({
                          children: this.state.children.concat(newSubcommentData)
                        })
                      },
                      failure: failure => console.log('fail subcomment', failure)
                    }
                  )
                  this.setState({newSubcomment: ""})
                }
              }}
            />
            </SCContainer> : null
          }
        </Center>
        <Time>{formatTime(timestamp)}</Time>
      </Single>
    )
  }
}


export default SingleComment
