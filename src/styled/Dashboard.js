import styled from 'styled-components'
import React, {Component} from 'react'
import {View, BtAvatar, BtLink, BtFlatButton} from 'styled'
import InviteIcon from 'icons/InviteIcon'
import Send from 'icons/Send'
import Bolt from 'icons/Bolt'
import {grey500, grey400, grey119, grey222, purple, white} from 'theme'
import {Name} from 'styled/Tribe'
import {SubRow} from 'styled/Profile'
import AddFriend from 'icons/AddFriend'
import FlatButton from 'material-ui/FlatButton'
import { ProfCol, ProfHandle, Score} from 'styled/Project'

export const DashProfile = ({selectedUser}) => (
  <div style={{display: 'flex', padding: '21px 31px 15px 31px', minHeight: '60px'}}>
    <BtAvatar user={selectedUser} size={60} />
    <ProfCol>
      <ProfHandle to={`/${selectedUser.handle}`} >
        {selectedUser.handle}
      </ProfHandle>
      <Score>
        <Bolt style={{ marginRight: '5px' }} />
        {selectedUser.score}
      </Score>
    </ProfCol>
  </div>
)

export const DialogRow = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  padding: 25px 0;
  border-bottom: 1px solid ${grey400};
`
const FbDialogRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
`

export const DialogSpacer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding-left: 27px;
  box-sizing: border-box;
`
export const TopCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 30px;
`

export const BotRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  min-height: 50vh;
  max-height: 60vh;
`

export const DashLeft = styled.div`
  display: flex;
  border-radius: 5px;
  background-color: white;
  min-height: 50vh;
  flex: 0 0 285px;
  border: solid ${grey222} 1px;
  border-radius: 5px;
  margin-right: 20px;
  padding: 9px 0px 9px 9px;
  box-shadow: 0 1px 2px 0 rgba(202, 202, 202, 0.5);
`

export const DashView = styled(View)`
  background-color: transparent;
  border: none;
`

export const DashHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 80vw;
  padding-top: 0px;
`

export const DashHeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80vw;
  box-sizing: border-box;
`

export const TopPanel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  height: 140px;
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(202, 202, 202, 0.5);
  border-radius: 5px;
  border: solid ${grey222} 1px;
  margin-top: 20px;
`

export const ImgColumn = styled.div`
  padding: 30px 0 30px 15px;
  align-self: center;
`

export const TopColumn = styled.div`
  flex-direction: row;
  justify-content: space-between;
`

export const FeedbackRating = styled.div`
  color: ${grey119};
  font-size: 30px;
  font-weight: bold;
  margin: 50px 50px 0 0;
`

export const UserName = styled.h1`
  font-size: 1.5em;
  color: #555555;
  font-weight: normal;
  margin: -95px 0 0 115px;
`

export const NavLink = styled(BtLink)`
  text-decoration: none;
  color: ${grey119};
  cursor: pointer;
  font-size: 14px;
  font-weight: lighter;
  margin: 13px 0 0 115px;
`

export const LogoText = styled.h2`
  display: flex;
  flex: 1;
  margin-left: 5px;
  font-size: 1.5em;
  color: #777777;
  font-weight: lighter;
`

export const Divider = styled.hr`
  border: 1px solid #E5E5E5;
  height: 1px;
  margin: 6px 0;
  width: 80vw;
`

const InviteStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12pt;
  height: 40px;
  cursor: pointer;
  color: ${grey500};
`
const Span7pxRight = styled.span`
  margin-right: 7px;
`
const Span7pxLeft = styled.span`
  margin-left: 7px;
  font-size: 14px;
  font-weight: 400;
`
export const InviteButton = ({onClick, text, rightText}) => (
  <InviteStyled onClick={onClick}>
    {text && <Span7pxRight>{text}</Span7pxRight>}
    <InviteIcon/>
    {rightText && <Span7pxLeft>{rightText}</Span7pxLeft>}

  </InviteStyled>
)

export const SendInviteBtn = ({onClick}) => (
  <FlatButton
    label={'Send Invite'}
    backgroundColor={purple}
    labelStyle={{
      color: `${white}`,
      fontSize: '14px',
      textTransform: 'none'
    }}
    icon={
      <Send fill={white} height={14}
        style={{vertialAlign: 'middle', lineHeight: '41px'}}
      /> }
    onClick={onClick}
    style={{
      border: `1px solid ${grey400}`,
      borderRadius: '5px',
      width: '223px',
      height: '41px',
      marginTop: '18px'
    }}
  />
)

export class FbList extends Component {
  state = { invited: false, }
  render () {
    let {friend, createFriendRequest} = this.props
    let {invited} = this.state
    return (
      <FbDialogRow user={friend} >
        <SubRow>
          <BtAvatar user={friend} size={50} />
          <Name style={{lineHeight:'48px', paddingLeft: '7px'}} to={`/${friend.handle}`}>
            {friend.handle}
          </Name>
        </SubRow>
        <BtFlatButton
          onClick={()=>{
            this.setState({ invited: true, })
            createFriendRequest()
          }}
          backgroundColor={white}
          labelStyle={{ color: `${white}` }}
          icon={ <AddFriend fill={(invited) ? white : purple} height={16} /> }
          style={{
            border: `1px solid ${grey400}`,
            borderRadius: '5px',
            width: '60px',
            height: '4 0px'
          }}
          disabled={invited}
        />
      </FbDialogRow>
    )
  }
}
