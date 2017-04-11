import React from 'react'
import styled from 'styled-components'
import {white, grey230, grey215, size, grey800, grey700, purple, blue, btTheme, bigTheme} from 'theme'
import {Link} from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FlatButton from 'material-ui/FlatButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


export const BtLink = styled(Link)`
  display: flex;
  color: ${grey700};
  text-decoration: none;
  cursor: pointer;
`

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const View = styled.section`
  background-color: ${white};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-top: 50px;
  border: solid ${grey230} .5px;
  border-radius: 10px;
  min-height: 80vh;
  margin-bottom: 50px;
  padding-bottom: 50px;
`
export const FeedView = styled(View)`
  width: 65%;
`

export const ProjectNewView = styled(View)`
  min-height: 85vh;

`

export const IconTextContainer = styled(BtLink)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
  font-size: 30px;
`
export const IconText = styled.span`
  margin-left: 12px;
  color: ${grey800};
`


export const ButtonLink = styled(Link)`
  color: none;
  text-decoration: none;
`

export const DropContainer = styled.div`
  display: flex;
  min-width: 30%;
  max-width: 400px;
  height: 200px;
  border-radius: 10px;
  cursor: pointer;
`

export const ImageDropContainer = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
  max-width: 800px;
  max-height: 800px;
  border-radius: 10px;
  cursor: pointer;
  border: ${({image})=>(image) ? `none` : `2px dashed ${grey215}`};
`

export const CroppedImage = styled.img`
  max-height: 600px;
  max-width: 600px;
  margin: auto;
`

export const Button = (props) => {
  return (
    <ButtonLink
      to={props.to}
    >
      <RaisedButton
        {...props}
        labelStyle={{
          textTransform: 'none',
        }}
      >
        {props.children}
      </RaisedButton>

    </ButtonLink>
  )
}

export const BtFlatButton = (props) => {
  return (
    <ButtonLink
      to={props.to}
    >
      <FlatButton
        {...props}
        labelStyle={{
          textTransform: 'none',
          ...props.labelStyle
        }}
      >
        {props.children}
      </FlatButton>

    </ButtonLink>
  )
}

export const RoundButton = (props) => {
  return (
    <ButtonLink
      to={props.to}
    >
      <MuiThemeProvider
        muiTheme={
          (props.big) ? bigTheme : btTheme
        }
      >
        <FloatingActionButton
          style={{
            boxShadow: 0,
            ...props.style
          }}
          secondary={props.secondary}
          backgroundColor={props.backgroundColor}
          onClick={props.onClick}
        >
          {props.icon}
        </FloatingActionButton>
      </MuiThemeProvider>

    </ButtonLink>
  )
}

export const BotNav = styled.div`
  display: none;
  position: fixed;
  width: 100%;
  height: 200px;
  top: 0;
  left: 0;
  z-index: 1000;
  ${size.m`
    display: flex;
  `}
`

export const Bubble = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({secondary}) => (secondary) ? blue : purple}
  height: 30px;
  width: 30px;
  border-radius: 30px;
`
