import React from 'react'

import { Variables } from '../../../../common'
import { Icon, IconType } from '../../../Icons'
import {
  ButtonDescriptionLabel,
  ButtonTextContentWrapper,
  ButtonTitleLabel,
  ButtonWrapper,
  StyledIconWrapper,
  StyledTileLabel,
  TileContentWrapper
} from './style'

interface IBoardButtonTileContentProps {
  /** Text displayed above the content of tile */
  label?: string
  /** button icon type displayed in the tile */
  iconType?: IconType
  /** button title displayed in the tile */
  buttonTitle?: string
  /** button description displayed after button title */
  buttonDescription?: string
}

class ButtonTileContent extends React.PureComponent<IBoardButtonTileContentProps, never> {

  private get icon (): JSX.Element | null {
    const {
      iconType
    } = this.props

    if (iconType) {
        return (
          <StyledIconWrapper>
            <Icon type={iconType} color={Variables.Color.i300} size='xlarge' />
          </StyledIconWrapper>
        )
    }

    return null
  }

  private get buttonTitle (): JSX.Element | null {
    const {
      buttonTitle
    } = this.props

    if (buttonTitle) {
      return (
        <ButtonTitleLabel>
          {buttonTitle}
        </ButtonTitleLabel>
      )
    }

    return null
  }

  private get buttonDescription (): JSX.Element | null {
    const {
      buttonDescription
    } = this.props

    if (buttonDescription) {
      return (
        <ButtonDescriptionLabel>
          {buttonDescription}
        </ButtonDescriptionLabel>
      )
    }

    return null
  }

  private get content (): JSX.Element | null {
    return (
      <ButtonWrapper>
        {this.icon}
        <ButtonTextContentWrapper>
        {this.buttonTitle}
        {this.buttonDescription}
        </ButtonTextContentWrapper>
      </ButtonWrapper>
    )
  }

  private get tileLabel (): JSX.Element | null {
    const {
      label
    } = this.props

    if (label) {
      return (
        <StyledTileLabel>
          {label}
        </StyledTileLabel>
      )
    }

    return null
  }

  public render (): JSX.Element {
    return (
      <TileContentWrapper
      >
        {this.tileLabel}
        {this.content}
      </TileContentWrapper>
    )
  }
}

export {
  ButtonTileContent
}