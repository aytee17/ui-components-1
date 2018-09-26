import styled, { css } from 'styled-components'
import { Variables } from '../../../common'

interface IOptionListButton {
  selected?: boolean
  hidden: boolean
}

const OptionListButton = styled.button`
  background-color: ${Variables.Color.n100};
  color: ${Variables.Color.n800};
  display: block;
  font-size: ${Variables.FontSize.fzBody}px;
  line-height: ${Variables.LineHeight.lhBody}px;
  width: 100%;
  padding: 8px;
  text-align: left;
  outline: none;
  cursor: pointer;
  
  &:hover,
  &:focus {
    background-color: ${Variables.Color.n200};
  }
  
  ${(props: IOptionListButton) => {
    if (props.selected) {
      return css`
        background-color: ${Variables.Color.i100};
        color: ${Variables.Color.i600};
        
        &:hover,
        &:focus {
          background-color: ${Variables.Color.i100};
        }
      `
    }
  }}
  
  ${(props: IOptionListButton) => props.hidden && css`display: none;`}

  .left-component {
    margin-right: 8px;
  }

  .right-component {
    margin-left: 8px;
  }
`

export {
  OptionListButton
}
