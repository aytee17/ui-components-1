import React from 'react'
import styled, { css, StyledComponentClass } from 'styled-components'
import { Variables } from '../../../../common'

interface ITimelineTitleProps {
  markerType: 'major' | 'minor',
  markerColor: 'primary' | 'neutral' | 'none'
}

const markerColorMap = {
  primary: Variables.Color.b400,
  neutral: Variables.Color.n400
}

function colorsForEventMarker (props: ITimelineTitleProps): any {
  if (props.markerColor === 'none') {
    return null
  }

  const mainColor = markerColorMap[props.markerColor]

  if (props.markerType === 'major') {
    return css`
      background-color: ${Variables.Color.n200};
      border-color: ${mainColor};
    `
  }

  return css`
    background-color: ${mainColor};
    border-color: ${Variables.Color.n100};
  `
}

function diameterForMarker (props: ITimelineTitleProps): number {
  return (props.markerType === 'major') ? 16 : 12
}

function offsetForMarker (props: ITimelineTitleProps): any {
  const radius = diameterForMarker(props) / 2

  return css`
    left: ${-24 - radius}px;
    top: calc(50% - ${radius}px);
  `
}

const TimelineEventTitle = styled.div<ITimelineTitleProps>`
  position: relative;
  width: 100%;
  
  ${props => props.markerColor !== 'none' && css`
    ::before {
      position: absolute;
      content: '';
      border: solid 2px;
      border-radius: 50%;
      background-color: ${Variables.Color.n400};
      
      height: ${diameterForMarker}px;
      width: ${diameterForMarker}px;
      ${offsetForMarker}
      ${colorsForEventMarker}
    }
  `}
`

export {
  TimelineEventTitle
}
