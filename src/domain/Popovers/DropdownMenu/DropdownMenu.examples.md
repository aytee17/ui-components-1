#### Basic DropdownMenu

```jsx
<DropdownMenu
  sections={[
    {
      text: 'Item 1',
      onClick: () => alert('Item 1')
    },
    {
      text: 'Item 2',
      href: 'https://www.intellihr.com.au'
    }
  ]}
/>
```

#### DropdownMenu inside overflow: hidden, position: relative bounding box

```jsx
<div
  style={{
    height: 90,
    width: 90,
    border: '1px black solid',
    padding: 10,
    overflow: 'hidden',
    position: 'relative'
  }}
>
  <DropdownMenu
    sections={[
      {
        text: 'Item 1',
        onClick: () => alert('Item 1')
      },
      {
        text: 'Item 2',
        href: 'https://www.intellihr.com.au'
      }
    ]}
  />
</div>
```

#### DropdownMenu with tooltip

```jsx
<DropdownMenu
  sections={[
    {
      text: 'Hover and View Tooltip',
      href: 'https://www.intellihr.com.au',
      tooltipMessage: 'I am a tooltip for item 1'
    },
    {
      text: 'Archive',
      onClick: () => alert('Archive'),
      tooltipMessage: 'This template has been used to create a goal so it cannot be deleted. Archived templates are hidden when creating goals.',
      tooltipProps: { width: 300 }
    }
  ]}
/>
```

#### DropdownMenu with secondary text and icon

```jsx
<DropdownMenu
  sections={[
    {
       text: 'Create',
       componentProps: {
         style: {'fontWeight':600}
       },
       onClick: () => alert('Create')
     }, 
    {
      text: 'Note',
      secondaryText: 'add a note to yourself or share',
      iconProps: {
        icon: 'sticky-note',
        iconType: 'solid'
      },
      onClick: () => alert('Note')
    },
    {
      text: 'Training',
      secondaryText: 'add a training to yourself or others',
      iconProps: {
        icon: 'chalkboard-teacher',
        iconType: 'solid'
      },
      onClick: () => alert('Training')
    },
    {
      text: 'Goal',
      secondaryText: 'set a goal to yourself or others',
      iconProps: {
        icon: 'bullseye-arrow',
        iconType: 'solid'
      },
      onClick: () => alert('Goal')
    }
  ]}
/>
```

#### Dropdown Menu using strip colors

```jsx
import { Button } from '@Domain/Buttons';

<DropdownMenu
  toggleComponent={({ toggleMenu, toggleComponentRef, ariaProps }) =>
    <Button
      onClick={toggleMenu}
      innerRef={toggleComponentRef}
      buttonOverrides={{...ariaProps}}
    >
      Colored Dropdown
    </Button>
  }
  sections={[
    {
      text: 'Alert',
      onClick: () => alert('Test'),
      sectionType: 'stripAlert'
    },
    {
      text: 'Success',
      href: 'https://www.intellihr.com.au',
      sectionType: 'stripSuccess'
    },
    {
      text: 'Warning',
      onClick: () => alert('Test'),
      sectionType: 'stripWarning'
    },
    {
      text: 'Primary',
      onClick: () => alert('Test'),
      sectionType: 'stripPrimary'
    },
    {
      text: 'Secondary',
      onClick: () => alert('Test'),
      sectionType: 'stripSecondary'
    },
    {
      text: 'Neutral',
      onClick: () => alert('Test'),
      sectionType: 'stripNeutral'
    },
  ]}
/>
```

#### Dropdown Alignment

By default, dropdowns will be positioned according to their location on the page.
They will default to flipping direction after reaching a 2/3 cutoff on the page window.

Optionally, you can manually define the alignment for the dropdown.
Specify a corner on the toggle component and a corner on the dropdown itself
and the two will be anchored when the dropdown is displayed.

Alignment also determines the animation direction for showing and
hiding the dropdown.

```jsx
import { Button, ButtonGroup } from '@Domain/Buttons';

<>
  <ButtonGroup>
    <DropdownMenu
      toggleComponent={({ toggleMenu, toggleComponentRef, ariaProps }) =>
        <Button
          onClick={toggleMenu}
          innerRef={toggleComponentRef}
          buttonOverrides={{...ariaProps}}
        >
          Anchored bottom left
        </Button>
      }
      sections={[
        {
          text: 'Item 1'
        },
        {
          text: 'Item 2'
        }
      ]}
      parentAnchorPosition={{
        xPos: 'left',
        yPos: 'bottom'
      }}
      dropdownAnchorPosition={{
        xPos: 'left',
        yPos: 'top'
      }}
    />
    <DropdownMenu
      toggleComponent={({ toggleMenu, toggleComponentRef, ariaProps }) =>
        <Button
          onClick={toggleMenu}
          innerRef={toggleComponentRef}
          buttonOverrides={{...ariaProps}}
        >
          Anchored bottom right
        </Button>
      }
      sections={[
        {
          text: 'Item 1'
        },
        {
          text: 'Item 2'
        }
      ]}
      parentAnchorPosition={{
        xPos: 'right',
        yPos: 'bottom'
      }}
      dropdownAnchorPosition={{
        xPos: 'right',
        yPos: 'top'
      }}
    />
    <DropdownMenu
      toggleComponent={({ toggleMenu, toggleComponentRef, ariaProps }) =>
        <Button
          onClick={toggleMenu}
          innerRef={toggleComponentRef}
          buttonOverrides={{...ariaProps}}
        >
          Drop upwards, top left
        </Button>
      }
      sections={[
        {
          text: 'Item 1'
        },
        {
          text: 'Item 2'
        }
      ]}
      parentAnchorPosition={{
        xPos: 'left',
        yPos: 'top'
      }}
      dropdownAnchorPosition={{
        xPos: 'left',
        yPos: 'bottom'
      }}
    />
    <DropdownMenu
      toggleComponent={({ toggleMenu, toggleComponentRef, ariaProps }) =>
        <Button
          onClick={toggleMenu}
          innerRef={toggleComponentRef}
          buttonOverrides={{...ariaProps}}
        >
          Anchored top right, open to right
        </Button>
      }
      sections={[
        {
          text: 'Item 1'
        },
        {
          text: 'Item 2'
        }
      ]}
      parentAnchorPosition={{
        xPos: 'right',
        yPos: 'top'
      }}
      dropdownAnchorPosition={{
        xPos: 'left',
        yPos: 'top'
      }}
    />
    <DropdownMenu
      toggleComponent={({ toggleMenu, toggleComponentRef, ariaProps }) =>
        <Button
          onClick={toggleMenu}
          innerRef={toggleComponentRef}
          buttonOverrides={{...ariaProps}}
        >
          Anchored bottom left, open to left upwards
        </Button>
      }
      sections={[
        {
          text: 'Item 1'
        },
        {
          text: 'Item 2'
        }
      ]}
      parentAnchorPosition={{
        xPos: 'left',
        yPos: 'bottom'
      }}
      dropdownAnchorPosition={{
        xPos: 'right',
        yPos: 'bottom'
      }}
    />
  </ButtonGroup>
</>
```

#### Custom Components

```jsx
import { Callout } from '@Domain/Callouts';

<DropdownMenu
   sections={[
     {
       onClick: () => alert('Test'),
       text: 'Item 1'
     },
     {
       component: <hr/>
     },
     {
       onClick: () => alert('Test'),
       text: 'Item 2'
     },
     {
       text: 'Item 3',
       component: <Callout>asdf</Callout>
     }
   ]}
/>
```

#### Left and right section components

```jsx
import { FontAwesomeIcon } from '@Domain/Icons';

<DropdownMenu
   sections={[
     {
       leftComponent: <FontAwesomeIcon type='solid' icon='hand-point-right' />,
       rightComponent: <FontAwesomeIcon type='solid' icon='hand-point-left' />,
       onClick: () => alert('Test'),
       text: 'Surrounded by icons'
     }
   ]}
/>
```

#### Custom children + hasInitialFocus prop

If the `sections` prop is not passed to the menu it will render the children as the content of the menu instead.
DropdownMenu takes `children` *as a function* and will pass through a callback to close the menu if needed.

The `hasInitialFocus` can be used to specify that some child element of the menu needs focus when the menu is
opened. The default behaviour is to focus the first element in the menu. The `initialFocusElement` prop can be
used in tandem to choose which element gets the initial focus - this can be a dom element, css selector or function.
See the [focus-trap-react](https://github.com/davidtheclark/focus-trap-react) library, which is used under the hood,
for more details.

```jsx
import _ from 'lodash';
import { Button } from '@Domain/Buttons';
import { FontAwesomeIcon } from '@Domain/Icons';
import { TextInput } from '@Domain/Inputs';

let textInput;

initialState = { selectedOption: {value: 1, label: 'AUD'}, inputValue: '' };

class ThingList extends React.PureComponent {
  get options () {
    const { options, query } = this.props

    return _.filter(options, option => {
      return _.toLower(option.label).includes(query)
    })
  }

  render () {
    const { handleClick } = this.props

    return _.map(this.options, (option) => {
      return <Button key={option.value} onClick={() => handleClick(option)}>{option.label}</Button>
    })
  }
}

<DropdownMenu
  toggleComponent={({ toggleMenu, toggleComponentRef, ariaProps }) =>
    <Button
      onClick={toggleMenu}
      innerRef={toggleComponentRef}
      buttonOverrides={{...ariaProps}}
    >
      {state.selectedOption.label}
    </Button>
  }
  hasInitialFocus
  initialFocusElement='.selectMe'
>
  {({closeMenu}) =>
    <>
      <TextInput
        placeholder='dummy input'
      />
      <TextInput
        className='selectMe'
        placeholder='Search country!'
        icon={<FontAwesomeIcon type='solid' icon='search' />}
        value={state.inputValue}
        handleChange={(e) => setState({inputValue: e.target.value})}
      />
      <ThingList
        query={state.inputValue}
        handleClick={(option) => {
          setState({selectedOption: option})
          closeMenu()
        }}
        options={[
          { value: 1, label: 'AUD' },
          { value: 2, label: 'USD' },
          { value: 3, label: 'NZD' }
        ]}
      />
    </>
  }
</DropdownMenu>
```
