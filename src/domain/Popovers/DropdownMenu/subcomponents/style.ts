import styled, { css } from 'styled-components'

import { Variables } from '../../../../common'
import { SectionType } from './Section'

interface IStyledSection {
  hasSecondaryText: boolean
}

const DefaultDropdownButton = styled.button`
  background-color: transparent;
  border: 1px solid transparent;
  color: ${Variables.Color.n700};
  cursor: pointer;
  margin: 0;
  outline: none;
  padding: 7px 6px;
  transition: background-color .25s ease-out, color .25s ease-out;
  vertical-align: bottom;

  &:hover {
    background-color: ${Variables.Color.n200};
  }

  &:active {
    background-color: ${Variables.Color.n300};
  }

  &:focus {
    background-color: ${Variables.Color.n200};
    border-color: ${Variables.Color.n400};
  }

  .icon {
    font-size: 1.5rem;
    line-height: 1;
    margin: 0;
    width: 1.3em;
  }
`

const StyledContentWrapper = styled.div`
  background-color: ${Variables.Color.n100};
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, .15), 0 2px 4px rgba(0, 0, 0, .29);
  min-width: 140px;
`

const StyledDropdownSectionList = styled.ul`
  margin: 0;
  padding: 0;
`

const StyledDropdownCustomContent = styled.div`
  padding: 16px;
`

interface IStyledSectionProps {
  sectionType: SectionType,
  clickable: boolean
}

const stripMapping: { [n: string]: { stripColor: string, backgroundColor: string } } = {
  stripAlert: {
    stripColor: Variables.Color.r400,
    backgroundColor: Variables.Color.r100
  },
  stripSuccess: {
    stripColor: Variables.Color.g400,
    backgroundColor: Variables.Color.g100
  },
  stripWarning: {
    stripColor: Variables.Color.o400,
    backgroundColor: Variables.Color.o100
  },
  stripPrimary: {
    stripColor: Variables.Color.i400,
    backgroundColor: Variables.Color.i100
  },
  stripSecondary: {
    stripColor: Variables.Color.b400,
    backgroundColor: Variables.Color.b100
  },
  stripNeutral: {
    stripColor: Variables.Color.n400,
    backgroundColor: Variables.Color.n200
  }
}

function styleForSectionType (section: IStyledSectionProps) {
  if (section.sectionType in stripMapping) {
    const mapping = stripMapping[section.sectionType]

    return css`
      color: ${Variables.Color.n800};
      border-left: 5px solid ${mapping.stripColor};

      ${section.clickable && css`
        cursor: pointer;

        &:hover,
        &:active,
        &:focus {
          background-color: ${mapping.backgroundColor};
        }
      `}
    `
  }

  if (section.sectionType === 'alert') {
    return css`
      &,
      .left-component,
      .right-component {
        background-color: transparent;
        border-color: transparent;
        color: ${Variables.Color.r600};

        ${section.clickable && css`
          cursor: pointer;

          &:focus,
          &:hover {
            background-color: ${Variables.Color.r100};
            color: ${Variables.Color.r600};
          }

          &:active,
          &.active {
            background-color: ${Variables.Color.r200};
            color: ${Variables.Color.r600};
          }
        `}
      }
    `
  }

  if (section.sectionType === 'default') {
    return css`
      &,
      .left-component,
      .right-component {
        color: ${Variables.Color.n700};

        ${section.clickable && css`
          cursor: pointer;

          &:hover,
          &:active,
          &:focus {
            background-color: ${Variables.Color.n200};

            &,
            .left-component,
            .right-component {
              color: ${Variables.Color.i400};
            }
          }
        }
      `}
    `
  }
}

const StyledSection = styled.li`
  background: transparent;
  border: none;
  display: block;
  list-style: none;
  padding: 0;
  white-space: pre;
  width: 100%;

  hr {
    height: 0;
    margin-bottom: 0;
    margin-top: 0;
    padding: 0;
  }

  > a,
  > button,
  > span {
    border-radius: 0;
    display: block;
    line-height: 1;
    min-width: 100%;
    outline: 0;
    padding: 1em;
    text-align: left;
    ${(props: IStyledSection) => props.hasSecondaryText ? css`padding: 7px 1em;` : css` padding: 1em;`}

    &,
    .left-component,
    .right-component {
      transition: background .3s ease-in-out, color .3s ease-in-out;
    }

    ${styleForSectionType}
  }

  &:first-of-type {
    border-radius: 4px 4px 0 0;

    > a,
    > button {
      border-radius: 4px 4px 0 0;
    }
  }

  &:last-of-type {
    border-radius: 0 0 4px 4px;

    > a,
    > button {
      border-radius: 0 0 4px 4px;
    }
  }

  &:only-of-type {
    border-radius: 4px;

    > a,
    > button {
      border-radius: 4px;
    }
  }

  .left-component {
    margin-right: 5px;
  }

  .right-component {
    margin-left: 5px;
  }
`

const StyledSectionContentWithTooltip = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledSectionContent = styled.div`
  display: flex;
  align-items: center;
`

const FontAwesomeIconWrapper = styled.div`
  width: ${Variables.Spacing.sLarge}px;
  display: flex;
  justify-content: space-around;
`

export {
  DefaultDropdownButton,
  StyledContentWrapper,
  StyledSection,
  StyledDropdownSectionList,
  StyledDropdownCustomContent,
  StyledSectionContentWithTooltip,
  StyledSectionContent,
  FontAwesomeIconWrapper
}
