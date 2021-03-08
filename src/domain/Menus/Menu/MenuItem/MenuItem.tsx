import isEqual from 'lodash/isEqual'
import React, { useCallback, useState } from 'react'

import { Collapsible, IToggleType } from '../../../Internals/Collapsible'
import { IMenuItemProps } from './interfaces'
import {
  StyledCollapsibleChildren
} from './style'
import { MenuItemContent } from './MenuItemContent'

const MenuItem: React.FC<IMenuItemProps> = (
  {
    children,
    isOpen,
    handleSizeChange,
    anchorComponentProps,
    href,
    icon,
    isActive,
    isLoading,
    label,
    openInNewTab = false
  }) => {
  const [open, setOpen] = useState(isOpen || false)
  const onToggle = useCallback((type: IToggleType) => {
    setOpen(type === IToggleType.OPEN)
    if (handleSizeChange) {
      handleSizeChange()
    }
  }, [handleSizeChange])

  if (children) {
    return (
      <Collapsible
        isOpen={open}
        onToggle={onToggle}
        trigger={
          <MenuItemContent
            label={label}
            isActive={isActive}
            isOpen={open}
            href={href}
            anchorComponentProps={anchorComponentProps}
            icon={icon}
            isLoading={isLoading}
            openInNewTab={openInNewTab}
          />
        }
      >
        <StyledCollapsibleChildren>
          {children}
        </StyledCollapsibleChildren>
      </Collapsible>
    )
  }
  return (
    <MenuItemContent
      label={label}
      isActive={isActive}
      href={href}
      anchorComponentProps={anchorComponentProps}
      icon={icon}
      isLoading={isLoading}
      openInNewTab={openInNewTab}
    />
  )
}

const MemoMenuItem = React.memo(MenuItem,(prevProps, nextProps) => {
  return nextProps.href === prevProps.href &&
    nextProps.label === prevProps.label &&
    prevProps.icon === nextProps.icon &&
    nextProps.isLoading === prevProps.isLoading &&
    nextProps.isActive === prevProps.isActive &&
    nextProps.isOpen === prevProps.isOpen &&
    prevProps.children === nextProps.children &&
    prevProps.openInNewTab === nextProps.openInNewTab &&
    isEqual(prevProps.handleSizeChange, nextProps.handleSizeChange) &&
    (prevProps.anchorComponentProps === nextProps.anchorComponentProps || isEqual(prevProps.anchorComponentProps, nextProps.anchorComponentProps))
})

export {
  MemoMenuItem as MenuItem
}
