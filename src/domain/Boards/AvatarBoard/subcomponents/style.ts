import styled, { css } from 'styled-components'

import { Props, Variables } from '../../../../common'
import { AvatarStatusDotColor } from '../../../Avatars/Avatar'
import { styleForMargins } from '../../../Spacers/services/margins'
import { styleForTruncatedText, styleForTypographyType } from '../../../Typographies/services/textStyles'

interface IAvatarTile {
  hovered: boolean
}

interface IStyledContainer extends IAvatarTile {
  onMouseEnter: () => void
  onMouseLeave: () => void
  margins?: Props.IMargins
  displayStatusBanner: boolean
}

interface IStyledStatusBanner extends IAvatarTile {
  statusColor?: AvatarStatusDotColor | 'primary' | 'secondary' | 'success' | 'warning' | 'alert' | 'neutral' | 'highlight' | 'dark'
}

interface IStyledDropdownMenu {
  displayStatusBanner: boolean
}

const StyledStatusBanner = styled.div`
  position: absolute;
  width: 100%;
  height: 22px;
  border-radius: 8px 8px 0px 0px;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  transition: ease-in 0.1s;
  transform: translateY(-30px);

  ${(props: IStyledStatusBanner) => {
    if (props.statusColor) {
      switch (props.statusColor) {
        case 'primary':
        case AvatarStatusDotColor.Indigo:
          return css`
            background-color: ${Variables.Color.i400};
          `
        case 'secondary':
        case AvatarStatusDotColor.Blue:
          return css`
            background-color: ${Variables.Color.b400};
          `
        case 'success':
        case AvatarStatusDotColor.Green:
          return css`
            background-color: ${Variables.Color.g400};
          `
        case 'warning':
        case AvatarStatusDotColor.Orange:
          return css`
            background-color: ${Variables.Color.o400};
          `
        case 'alert':
        case AvatarStatusDotColor.Red:
          return css`
            background-color: ${Variables.Color.r400};
          `
        case 'neutral':
        case AvatarStatusDotColor.Neutral:
          return css`
            background-color: ${Variables.Color.n500};
          `
        case 'highlight':
        case AvatarStatusDotColor.Cyan:
          return css`
            background-color: ${Variables.Color.c400};
          `
        case 'dark':
        case AvatarStatusDotColor.Dark:
          return css`
            background-color: ${Variables.Color.n700};
          `
      }
    }
  }}
`

const StyledDropdownMenu = styled.div`
  position: absolute;
  right: 4px;

  ${(props: IStyledDropdownMenu) => {
    if (props.displayStatusBanner) {
      return css`
        top: 26px;
      `
    }

    return css`
      top: 4px;
    `
  }}
`

const StyledDropdownButton = styled.div`
  color: ${Variables.Color.n700};
  cursor: pointer;
  outline: none;
  padding: 6px 0px 4px 0px;
  border-radius: 8px;
  transition: 0.15s ease-in;

  &:hover {
    background-color: ${Variables.Color.n250};
    transition: 0.2s ease-out;
  }

  &:active {
    background-color: ${Variables.Color.n300};
    transition: 0.2s ease-out;
  }

  &:focus {
    background-color: ${Variables.Color.n250};
    border-color: ${Variables.Color.n400};
    transition: 0.2s ease-out;
  }

  .icon {
    font-size: 1.5rem;
    line-height: 1;
    width: 1.3em;
  }
`

const StyledAvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: ease-out 0.2s;
  pointer-events: none;
  margin-top: 55px;
  margin-bottom: 4px;
`

const StyledTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: ease-out 0.2s;
  pointer-events: none;
`

const StyledPrimaryTextContainer = styled.span`
  max-width: 80%;
  font-weight: ${Variables.FontWeight.fwSemiBold};
  color: ${Variables.Color.n800};
  ${styleForTruncatedText()}

  ${(props: IAvatarTile) => {
    if (props.hovered) {
      return css`
        ${styleForTypographyType(Props.TypographyType.Small)}
        transition: ease-out 0.2s;
      `
    }

    return css`
      ${styleForTypographyType(Props.TypographyType.Body)}
      transition: ease-in 0.15s;
    `
  }}
`

const StyledSecondaryContainer = styled.div`
  max-width: 220px;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: ${Variables.LineHeight.lhXSmall}px;
`

const StyledSecondaryTextContainer = styled.span`
  display: block;
  flex: 1 0 0;
  color: ${Variables.Color.n800};

  ${(props: IAvatarTile) => {
    if (props.hovered) {
      return css`
        ${styleForTypographyType(Props.TypographyType.XSmall)}
        transition: ease-out 0.2s;
      `
    }

    return css`
      ${styleForTypographyType(Props.TypographyType.Small)}
      transition: ease-in 0.15s;
    `
  }}
  ${styleForTruncatedText()}
`

const StyledActionArea = styled.div`
  border-radius: 8px 8px 0px 0px;
  height: 162px;
  width: 100%;
  position: absolute;
  top: 0px;
  transition: ease-in 0.15s;

  ${(props: IAvatarTile) => {
    if (props.hovered) {
      return css`
        background-color: ${Variables.Color.n150};

        &:hover {
          background-color: ${Variables.Color.n250};
          transition: ease-out 0.2s;
        }
      `
    }
  }}
`

const StyledContentContainer = styled.div`
  height: 116px;
  padding: 16px;
  opacity: 0;
  transform: translateY(60px);
  transition: transform ease-in 0.15s, opacity 0.075s ease-in;
`

const StyledContainer = styled.div`
  position: relative;
  background-color: ${Variables.Color.n100};
  width: 100%;
  max-width: 540px;
  height: 278px;
  border-radius: 8px;
  transition: ease-in 0.15s;
  overflow: hidden;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12), 0px 3px 8px rgba(0, 0, 0, 0.14), 0px 1px 6px rgba(102, 115, 128, 0.2);

  ${(props: IStyledContainer) => styleForMargins(props.margins)}

  ${(props: IStyledContainer) => {
    if (props.hovered) {
      return css`
        ${StyledStatusBanner} {
          transform: translateY(0px);
          transition: ease-out 0.15s;
        }

        ${StyledContentContainer} {
          opacity: 1;
          transform: translateY(-60px);
          transition: transform ease-out 0.2s, opacity ease-out 0.4s;
        }

        ${StyledAvatarContainer} {
          transform: scale(0.6) translateY(-80px);
          transition: ease-out 0.2s;
        }

        ${StyledTitleContainer} {
          transform: translateY(-74px);
          transition: ease-out 0.2s;
        }
      `
    }
  }}

  ${(props: IStyledContainer) => {
    if (props.hovered && props.displayStatusBanner) {
      return css`
        ${StyledAvatarContainer} {
          transform: scale(0.6) translateY(-72px);
        }

        ${StyledTitleContainer} {
          transform: translateY(-66px);
        }
      `
    }
  }}
`

export {
  StyledStatusBanner,
  StyledDropdownMenu,
  StyledDropdownButton,
  StyledAvatarContainer,
  StyledTitleContainer,
  StyledPrimaryTextContainer,
  StyledSecondaryContainer,
  StyledSecondaryTextContainer,
  StyledActionArea,
  StyledContentContainer,
  StyledContainer
}
