import React, {Component} from 'react'
import Relay from 'react-relay'
import {white, purple, blue, grey700} from 'theme'
import {Single, MainRow, Bottom, Content, Time, Text, Top, ButtonCol, Handle, BotLink, UpVote, SCContainer, SubComment, SCHandle, SCBottom, SCCol, SCText} from 'styled/Comments'
import {RoundButton, BtAvatar, SeeMore} from 'styled'
import Heart from 'icons/Heart'
import Comment from 'icons/Comment'
import formatTime from 'utils/formatTime'
import truncateText from 'utils/truncateText'
import {mapNodes} from 'utils/mapNodes'
import TextField from 'material-ui/TextField'
import UpdateComment from 'mutations/UpdateComment'
import CreateComment from 'mutations/CreateComment'
import DeleteComment from 'mutations/DeleteComment'
import AddToCommentUpvotes from 'mutations/AddToCommentUpvotes'

//for 'See More'
const maxChars = 300
const maxLines = 6

class SingleComment extends Component {

  constructor(props) {
    super()

    let children = mapNodes(props.comment.children)
    let commentUpvotes = mapNodes(props.comment.upvotes)
    
    let childrenText = children.reduce((map, obj) => {
        map[obj.id] = obj.text
        return map
    }, {})

    this.user = props.user
    this.isNew = props.comment.id==='new'
    this.isOwnComment = (props.user.id === props.comment.author.id)

    this.state = {
      text: props.comment.text,
      seeMore: {},
      newUpvote: 0,
      hasUpvoted: commentUpvotes.some(id=>(id===props.user.id)),
      newSubcomment: "",
      deleted: [],
      children,
      childrenText
    }
    // console.log('cmt,', this );
  }

  componentDidMount() {
    if(this.props.focus === this.props.comment.id){
      document.getElementById(this.props.comment.id).scrollIntoView({behavior:'instant', block: 'nearest'})
    }
  }

  editComment = (comment, text) => {
    if (this.isNew) {
      let commentData = {
        authorId: comment.author.id,
        projectId: comment.project ? comment.project.id : undefined,
        type: comment.type,
        timestamp: comment.timestamp,
        text,
        // parentId: comment.parent ? comment.parent : this.props.comment.id
        // sessionId: this.props.sessionId
      }
      console.log('commentdate', commentData);
      Relay.Store.commitUpdate(new CreateComment(commentData), {
        onSuccess: success => {
          commentData.author = this.user
          commentData.id = success.createComment.comment.id
          commentData.key = success.createComment.comment.id
          this.props.commentCreated(commentData)
          // this.setState({text: ""})
        }
      }
    )
    } else {
      Relay.Store.commitUpdate(new UpdateComment({id: comment.id, text}))
      this.props.deactivate(comment.id)
    }
  }

  text = (comment, childId) => {
    let text = childId ? this.state.childrenText[childId] : this.state.text
    let isActive = this.props.activeIds.includes(comment.id)
    let shortText = !isActive && truncateText({text, maxChars, maxLines})
    if (isActive) {
      return (
        <TextField
          id={comment.id}
          value={text}
          onChange={(e,newVal)=>{
            if (childId) {
              let childrenText = {...this.state.childrenText}
              childrenText[childId] = newVal
              this.setState({childrenText})
            } else {
              this.setState({text:newVal})
            }
          }}
          fullWidth
          multiLine
          autoFocus={(this.props.focus === comment.id || this.isNew)}
          onKeyPress={(e)=>{
            if (e.charCode === 13 && !e.shiftKey) {
              e.preventDefault()
              this.editComment(comment, text)
            }
          }}
          textareaStyle={{
            color: grey700,
            fontSize:'16px',
            wordBreak:'break-all',
            lineHeight: '18px'
          }}
          underlineFocusStyle={{
            borderColor: (comment.type === 'COMMENT' ) ? blue : purple
          }}
        />
      )
    } else if (shortText) {
      let id = childId || comment.id
      let showingMore = this.state.seeMore[id]
      return (
        <SeeMore onClick={()=>this.seeMore(id)} seeLess={showingMore}>
          {showingMore ? text : shortText}
        </SeeMore>
      )
    } else {
      return (text)
    }
  }

  seeMore = (id) => {
    let seeMore = {...this.state.seeMore}
    seeMore[id] = seeMore[id] ? false : true
    console.log('setting state', this.state.seeMore);
    this.setState({seeMore})
  }

  addUpvote = () => {
    Relay.Store.commitUpdate(
      new AddToCommentUpvotes({
        upvotesUserId: this.user.id,
        upvotesCommentId: this.props.comment.id
      }), { onSuccess: (res) => {
        console.log('upvote res', res);
        this.setState({
          newUpvote: this.state.newUpvote + 1,
          hasUpvoted: true
        })
      } }
    )
  }

  deleteComment = (id) => Relay.Store.commitUpdate(
    new DeleteComment({
      id,
      projectId: this.props.comment.projectId || this.props.comment.project.id
    }), {
      onSuccess: (res)=>this.setState({deleted: this.state.deleted.concat([id])})
    }
  )

  hider = () => {
    if (this.props.index===0) return false
    else if (!this.isOwnComment && this.props.tabs==='listen') return true
    else return false
  }

  subcomments = () => {
    return (
      <SCContainer>
        {this.state.children.map(child=>{
          let {id, author, text} = child
          return (
            <SubComment key={id} hide={this.state.deleted.includes(id)}>
              <BtAvatar user={author} size={30} style={{paddingTop: '5px'}} />
              <SCCol>
                <SCHandle to={author.deactivated ? null : `/${author.handle}/`}>
                  {author.handle}
                </SCHandle>
                <SCText>{this.text(child, id)}</SCText>
                {this.user.id===author.id && <SCBottom>
                  <BotLink
                    onClick={()=>{
                      if (this.props.activeIds.includes(id)) {
                        this.setState({text})
                        this.editComment(child, this.state.childrenText[id])
                      } else {
                        this.props.activate(id)
                      }
                    }}
                  >Edit</BotLink>
                  {'|'}
                  <BotLink onClick={()=>this.deleteComment(id)}>
                    Delete
                  </BotLink>
                </SCBottom>}
            </SCCol>
            </SubComment>
          )
        })}
        <SubComment key={'input'} >
          <BtAvatar user={this.user} size={30} style={{paddingTop: '5px'}} />
          <SCCol>
            <SCHandle to={this.user.deactivated ? null : `/${this.user.handle}/`}>
              {this.user.handle}
            </SCHandle>
          <TextField
            ref='scTextField'
            value={this.state.newSubcomment}
            name={'newSubcomment'}
            hintText={'Add a comment'}
            hintStyle={{fontSize: '14px'}}
            onChange={(e,newVal)=>this.setState({newSubcomment:newVal})}
            multiLine
            fullWidth
            textareaStyle={{
              color: grey700,
              fontSize:'14px',
              wordBreak:'break-all',
              lineHeight: '16px'
            }}
            onKeyPress={(e)=>{
              if (e.charCode === 13 && !e.shiftKey) {
                e.preventDefault()
                let newSubcommentData = {
                  authorId: this.user.id,
                  author: this.user, //for real time
                  type: 'COMMENT',
                  text: this.state.newSubcomment,
                  parentId: this.props.comment.id
                }
                Relay.Store.commitUpdate(
                  new CreateComment(newSubcommentData), {
                    onSuccess: success => {
                      this.refs.scTextField.blur();
                      let childrenText = {...this.state.childrenText}
                      newSubcommentData.id = success.createComment.comment.id
                      childrenText[newSubcommentData.id] = newSubcommentData.text

                      this.setState({
                        children: this.state.children.concat(newSubcommentData),
                        newSubcomment: '',
                        childrenText
                      })
                    },
                    onFailure: failure => console.log('fail subcomment', failure)
                  }
                )
              }
            }}
          />
        </SCCol>
        </SubComment>
      </SCContainer>)
  }

  render() {
    let {author, timestamp, type, id, upvotes} = this.props.comment
    // console.log({timestamp});
    // it looks like everything is rendere every secind a song is playing
    let {newUpvote} = this.state
    let totalUpvotes = (upvotes||newUpvote) && (upvotes.edges.length + newUpvote)
    let hideEditDelete = this.isNew || !this.isOwnComment
    return (
      <Single id={id} hide={this.hider() || this.state.deleted.includes(id)} >
        <MainRow>
          <Top>
            <ButtonCol>
              <RoundButton
                onClick={()=>{
                  console.log('button click', this.props, timestamp)
                  timestamp && this.props.jumpToTime(timestamp)
                }}
                icon={(type === 'COMMENT') ?
                  <Comment height={25} width={25} fill={white} />
                  : <Heart height={25} width={25} fill={white} />
                }
                mini
                secondary={(type === 'COMMENT')}
              />
            </ButtonCol>
            <Content>
              <Handle to={author.deactivated ? null : `/${author.handle}/`} >
                {author.handle}
              </Handle>
              <Text>{this.text(this.props.comment)}</Text>
            </Content>
            <Time hide={!timestamp} onClick={()=>{
              console.log('time click', this.props, timestamp)
              this.props.jumpToTime(timestamp)
            }}>{formatTime(timestamp)}</Time>
          </Top>
          <Bottom>
            {!hideEditDelete && <BotLink
              onClick={()=>{this.props.activeIds.includes(id) ?
                this.editComment(this.props.comment, this.state.text) : this.props.activate(id)}}
            >Edit</BotLink>}
            {!hideEditDelete && '|'}
            {!hideEditDelete &&
              <BotLink onClick={()=>this.deleteComment(id)}>Delete</BotLink>}
            <UpVote
              secondary={(type==='COMMENT')}
              hideLink={this.props.tabs==='listen'}
              hasUpvoted={this.state.hasUpvoted}
              onClick={!this.isOwnComment && !this.state.hasUpvoted && this.addUpvote}
            >Upvote{this.state.hasUpvoted && 'd'} | {totalUpvotes}</UpVote>
            <BotLink hideLink={this.props.comment.id==='new'}
              onClick={()=>{
                this.setState({subcomments: !this.state.subcomments})
              }}
            >
              {this.state.children.length ?
                `View Comments | ${this.state.children.length}`
                : 'Add Comment'}
            </BotLink>
          </Bottom>
        </MainRow>
        {this.state.subcomments && this.subcomments()}
      </Single>
    )
  }
}

// editAndDelete = () => {
//   return (
//     <div>
//       <BotLink
//         onClick={()=>{this.props.activeIds.includes() ?
//           this.editComment() : this.props.activate(comment.id)}}
//       >Edit</BotLink>
//       {this.props.tabs==='listen' && '|'}
//       <BotLink
//         onClick={this.deleteComment}
//       >Delete</BotLink>
//     </div>
//   )
// }

export default SingleComment
