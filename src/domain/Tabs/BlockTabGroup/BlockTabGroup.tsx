import {
  isNumber,
  map,
  toNumber
} from 'lodash'
import React, { MouseEvent } from 'react'

import { Props } from '../../../common'
import {
  TabGroupContainer,
  TabList,
  TabListItem,
  TabListItemButton
} from './style'

export interface IBlockTab {
  /** String title to use for the tab */
  title?: string
}

type TabSize = 'small' | 'medium' | 'large'

export interface IBlockTabGroupProps {
  /** The current tab selected */
  currentTab: string | number
  /** A list of tabs and their content to render */
  tabs: IBlockTab[]
  /** Callback to run when clicking between tabs */
  onTabChange?: (tab: IBlockTab, index: number) => void
  /** Size of the tab */
  tabSize?: TabSize
  /** The data-component-context */
  componentContext?: string
}

export class BlockTabGroup extends React.Component<IBlockTabGroupProps, never> {
  public static defaultProps = {
    tabSize: 'medium'
  }

  public render (): JSX.Element | null {
    const {
      tabs,
      componentContext
    } = this.props

    if (tabs.length === 0) {
      return null
    }

    return (
      <TabGroupContainer
        data-component-type={Props.ComponentType.BlockTabGroup}
        data-component-context={componentContext}
      >
        <TabList role='tablist'>
          {map(tabs, this.listItemForTab)}
        </TabList>
      </TabGroupContainer>
    )
  }

  private listItemForTab = (tab: IBlockTab, index: number): JSX.Element => {
    const { tabSize } = this.props
    const currentTabIndex = this.currentTabIndex

    return (
        <TabListItem
          key={index}
          role='tab'
          active={currentTabIndex === index}
        >
          <TabListItemButton
            active={currentTabIndex === index}
            tabSize={tabSize}
            onClick={this.handleOnClick}
            aria-selected={currentTabIndex === index}
            data-tabindex={index}
          >
            {tab.title}
          </TabListItemButton>
        </TabListItem>
    )
  }

  private indexForTab = (tabIdentifier?: number | string): number => {
    if (!tabIdentifier) {
      return 0
    }

    if (isNumber(tabIdentifier)) {
      return tabIdentifier
    }

    return 0
  }

  private get currentTabIndex (): number {
    const {
      currentTab
    } = this.props

    return this.indexForTab(currentTab)
  }

  private handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    const {
      tabs,
      onTabChange
    } = this.props

    const newTabIndex = toNumber(event.currentTarget.dataset.tabindex || 0)

    if (onTabChange && (this.currentTabIndex !== newTabIndex)) {
      onTabChange(tabs[newTabIndex], newTabIndex)
    }
  }
}