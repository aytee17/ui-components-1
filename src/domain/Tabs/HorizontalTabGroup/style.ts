import React from 'react'
import styled, { css, StyledComponentClass } from 'styled-components'
import { Variables } from '../../../common'

const TabStyleConstants = {
  GroupHeight: 40,
  MarginSize: 16,
  ScrollDuration: 250
}

const TabGroupContainer = styled.div`
  box-shadow: inset 0 -1px 0 0 ${Variables.Color.n300};
  height: ${TabStyleConstants.GroupHeight}px;
  width: 100%;
`

interface ITabChevronButtonProps {
  float: 'left' | 'right'
}

const TabChevronButton = styled.button`
  color: ${Variables.Color.n600};
  cursor: pointer;
  float: ${(props: ITabChevronButtonProps) => props.float};
  line-height: ${TabStyleConstants.GroupHeight}px;
  outline: none;
  text-align: center;
  transition: color .15s ease-in;

  &:hover {
    color: ${Variables.Color.n800};
  }

  &:disabled {
    color: ${Variables.Color.n400};
    cursor: not-allowed;
  }
  
  .fa {
    margin: 0;
  }
`

const TabList = styled.ul`
  overflow-x: scroll;
  overflow-y: hidden;
  padding-left: 0;
  position: relative;
  margin: 0;
  font-size: ${Variables.FontSize.fzBody}px;
  line-height: ${TabStyleConstants.GroupHeight}px;
  list-style-type: none;
  white-space: nowrap;
  
  &:after,
  &:before {
    display: table;
    content: ' ';
  }
  
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  
  &::-webkit-scrollbar {
    background: transparent;
    width: 0;
  }
`

const TabListItem = styled.li`
  display: inline-block;
  margin: 0 ${TabStyleConstants.MarginSize}px;
`

interface ITabListItemAnchorProps {
  active: boolean
}

const TabListItemAnchor = styled.a`
  color: ${Variables.Color.n600};
  display: block;
  font-weight: ${Variables.FontWeight.fwMedium};
  line-height: ${TabStyleConstants.GroupHeight}px;
  outline: none;
  position: relative;
  text-decoration: none;
  transition: color .15s ease-in;

  &:before {
    background-color: transparent;
    bottom: -2px;
    content: '';
    height: 2px;
    left: 0; 
    position: absolute;
    transition: all .15s ease-in-out;
    width: 100%;
  }
  
  ${(props: ITabListItemAnchorProps) => props.active && css`&,`}
  &:active,
  &:hover,
  &:focus {
    color: ${Variables.Color.i400};
  
    &:before {
      background-color: ${Variables.Color.i400};
      bottom: 0;
    }
  }

  .left-component {
    margin-right: 5px;
  }

  .right-component {
    margin-left: 5px;
  }
`

export {
  TabStyleConstants,
  TabGroupContainer,
  TabChevronButton,
  TabList,
  TabListItem,
  TabListItemAnchor
}
