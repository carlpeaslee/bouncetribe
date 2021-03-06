import styled from 'styled-components'
// import React from 'react'
import {grey300, grey700, grey900, blue, purple} from 'theme'
import {BtLink} from 'styled'

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 60px;
  padding-bottom: 80px;
  width: ${({listenTab}) => (listenTab) ? '85%' : '100%'};
`
  export const ButtonRow = styled.div`
    display: ${({hide}) => (hide) ? 'none' : 'flex'};
    justify-content: center;
    margin-bottom: 20px;
  `
    export const ButtonColumn = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px 20px;
    `
    export const ButtonLabel = styled.span`
      display: flex;
      margin-top: 15px;
      font-size: 14px;
      color: #777777;
      font-weight: 300;
    `

export const CommentBox = styled.div`
  display: ${({hide}) => (hide) ? 'none' : 'flex'};
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
`
export const Single = styled.div`
  display: flex;
  flex-direction: column;
  transition: background-color 1.5s ease-out;
  border: 1px solid ${grey300};
  border-radius: 6px;
  width: 100%;
  margin: 10px;
  display: ${({hide}) => (hide) ? 'none': ''};
  min-width: 0;
`
  export const MainRow = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px 30px 30px 30px;
  `
  export const Top = styled.div`
    display: flex;
  `
  export const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    flex-grow: 1;
  `

  export const Bottom = styled.div`
    display: flex;
    font-size: 13px;
    padding-top: 10px;
  `
    export const ButtonCol = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
    `
      export const InfoRow = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
      `
        export const Handle = styled(BtLink)`
          color: #777777;
          font-weight: 400;
          font-size: 14px;
          &:hover {color: ${purple}}
        `
        export const BotLink = styled.span`
          cursor: pointer;
          color: ${grey700};
          display: ${({hideLink}) => hideLink ? 'none': ''};
          padding: 0 5px;
          font-size: 12px;
        `
        export const UpVote = styled(BotLink)`
          color: ${({secondary, hasUpvoted}) => {
            if (hasUpvoted) return '#999999'
            if (secondary) return blue
            else return purple
          }};
          font-weight: bold;
        `
    export const Text = styled.pre`
      display: flex;
      color: ${grey900};
      font-size: 16px;
      margin: 10px 0 0 0;
      overflow-wrap: break-word;
      word-wrap: break-word;
      word-break: break-word;
      white-space: pre-wrap;
    `
    export const Time = styled.div`
      font-size: 17px;
      font-weight: 300;
      display: flex;
      flex-direction: column;
      margin-bottom: 0px;
      margin-right: 10px;
      color: #999999;
      margin-left: auto;
      align-self: center;
      cursor: pointer;
      display: ${({hide}) => hide ? 'none': ''};
      &:hover {color: ${purple}}
    `

export const CommentScroller = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export const SCContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 30px 0 60px;
`

export const SubComment = styled.div`
  display: flex;
  padding: 10px 0;
  display: ${({hide}) => (hide) ? 'none': ''};
`

export const SCCol = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  width: 100%;
  justify-content: flex-start;
`

export const SCHandle = styled(BtLink)`
  font-weight: 400;
  color: #777777;
  font-size: 14px;
  &:hover {color: ${purple}}
`
export const SCBottom = styled.div`
  display: flex;
  margin-top: auto;
  font-size: 13px;
  padding-top: 5px;
  ${'' /* justify-content: flex-end; */}
`
export const SCText = styled.pre`
  display: flex;
  color: #777777;
  font-size: 14px;
  padding: 7px;
  margin: 4px 0 0 0;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
`
