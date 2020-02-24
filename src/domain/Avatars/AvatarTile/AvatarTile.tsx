import React, { useState } from 'react'

import { Props, Variables } from '../../../common'
import { FontAwesomeIcon } from '../../Icons'
import { Anchor } from '../../Internals'
import { DropdownMenu, IDropdownMenuToggleComponentProps } from '../../Popovers/DropdownMenu'
import { ISectionProps } from '../../Popovers/DropdownMenu/subcomponents/Section'
import { Text } from '../../Typographies'
import { Avatar } from '../Avatar'
import {
  StyledActionArea,
  StyledAvatarContainer,
  StyledContainer,
  StyledContentContainer,
  StyledDropdownButton,
  StyledDropdownMenu,
  StyledSecondaryContainer,
  StyledSecondaryTextContainer,
  StyledPrimaryTextContainer,
  StyledStatusBanner,
  StyledTitleContainer
} from './style'

interface IAvatarTileProps {
  /** The primary text */
  primaryText: string
  /** The secondary text */
  secondaryText?: string
  /** The component to display to the right of the secondary text */
  secondaryRightElement?: JSX.Element
  /** Initials to display if no valid `imageUrl` is provided */
  initials?: string
  /** Image URL for the avatar */
  imageUrl?: string
  /** dropdown sections to show in the action button dropdown */
  dropdownSections?: ISectionProps[]
  /** The url to navigate to when clicking the top half of the tile */
  href?: string
  /** The colour of the status, if one is to be displayed */
  statusColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'alert' | 'neutral' | 'highlight' | 'dark'
  /** Text to describe the status */
  statusText?: string
  /** The margins around the component */
  margins?: Props.IMargins
  /** Children to render beneath the avatar on hover */
  children?: React.ReactNode
  /** The data-component-context */
  componentContext?: string
}

const AvatarTile: React.FC<IAvatarTileProps> = ({
  primaryText,
  initials,
  secondaryText,
  secondaryRightElement,
  imageUrl,
  dropdownSections,
  href,
  statusColor,
  statusText,
  margins,
  children,
  componentContext
}) => {
  const [hovered, setHovered] = useState(false)
  const onMouseEnter = () => setHovered(true)
  const onMouseLeave = () => setHovered(false)

  const displayStatusBanner = !!statusColor && !!statusText

  const actionButton = ({ toggleMenu, toggleComponentRef, ariaProps }: IDropdownMenuToggleComponentProps) => (
    <StyledDropdownButton
      onClick={toggleMenu}
      ref={toggleComponentRef}
      {...ariaProps}
    >
      <FontAwesomeIcon type='solid' icon='ellipsis-v' />
    </StyledDropdownButton>
  )

  const actionButtonDropdownMenu = (): JSX.Element | null => {
    if (dropdownSections && hovered) {
      return (
        <StyledDropdownMenu
          displayStatusBanner={displayStatusBanner}
        >
          <DropdownMenu
            toggleComponent={actionButton}
            sections={dropdownSections}
            parentAnchorPosition={{
              xPos: Props.Position.Right,
              yPos: Props.Position.Bottom
            }}
            dropdownAnchorPosition={{
              xPos: Props.Position.Right,
              yPos: Props.Position.Top
            }}
          />
        </StyledDropdownMenu>
      )
    }

    return null
  }

  const actionArea = (): JSX.Element | null => {
    if (href) {
      return (
        <Anchor href={href}>
          <StyledActionArea hovered={hovered} />
        </Anchor>
      )
    }

    return null
  }

  const statusBanner = (): JSX.Element | null => {
    if (displayStatusBanner) {
      return (
        <StyledStatusBanner statusColor={statusColor} hovered={hovered}>
          <Text
            type={Props.TypographyType.XSmall}
            color={Variables.Color.n100}
            weight={Variables.FontWeight.fwSemiBold}
          >
            {statusText}
          </Text>
        </StyledStatusBanner>
      )
    }

    return null
  }

  return (
    <StyledContainer
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      hovered={hovered}
      margins={margins}
      displayStatusBanner={displayStatusBanner}
      data-component-type={Props.ComponentType.AvatarTile}
      data-component-context={componentContext}
    >
      {actionArea()}
      {statusBanner()}
      {actionButtonDropdownMenu()}
      <StyledAvatarContainer>
        <Avatar
          initials={initials}
          size={Props.AvatarSize.XLarge}
          imageUrl={imageUrl}
          statusDot={statusColor}
        />
      </StyledAvatarContainer>
      <StyledTitleContainer>
        <StyledPrimaryTextContainer hovered={hovered}>
          {primaryText}
        </StyledPrimaryTextContainer>
        <StyledSecondaryContainer>
          <StyledSecondaryTextContainer>
            {secondaryText}
          </StyledSecondaryTextContainer>
          {secondaryRightElement}
        </StyledSecondaryContainer>
      </StyledTitleContainer>
      <StyledContentContainer>
        {children}
      </StyledContentContainer>
    </StyledContainer>
  )
}

export {
  AvatarTile
}
