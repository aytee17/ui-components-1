import classNames from 'classnames'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import React from 'react'
import Select, {
  Creatable,
  FilterOptionsHandler,
  OnChangeHandler,
  OnOpenHandler,
  Option,
  OptionValues,
  Options,
  ReactSelectProps
} from 'react-select'

import { Props } from '../../../common'
import { TabGroupContainer } from '../../Tabs/ScrollingTabGroup/style'
import { StyledSelectInputWrapper } from './style'
import style from './style.scss'

export interface ISelectInputProps {
  /** ID of the input */
  id?: string
  /** Input name */
  name?: string
  /** Input value */
  value?: OptionValues | OptionValues[]

  /** Placeholder label when no option is selected */
  placeholder?: string | JSX.Element
  /** Value when no option is selected */
  emptyValue?: OptionValues | null
  /** Text to display when no results found */
  noResultsText?: string | JSX.Element
  /** Array of options to display. */
  options?: Options

  /** Should an 'x' be shown which clears select inputs? */
  isClearable?: boolean
  /** If true, sets input to disabled state */
  isDisabled?: boolean
  /** Pending state for async loading options */
  isFetching?: boolean
  /** If true, adds invalid input class to component */
  isInvalid?: boolean
  /** If true, allows selecting multiple options */
  isMultiSelect?: boolean
  /** If true, allows typing on select inputbox */
  isSearchable?: boolean

  /** Should the input autoselect an option when there is only one provided? */
  shouldAutoSelectWhenSingleOption?: boolean
  /** Should close the menu when an item is selected? */
  shouldCloseOnSelect?: boolean
  /** Should filtering be performed within the component? Disable for async usage. */
  shouldFilteringBePerformed?: boolean
  /** For multiselects; should items be removed once selected? */
  shouldRemoveElementsFromMultiSelect?: boolean

  /**
   * DEPRECATED: component to render for options.
   * Should not be used - please create a separate component if you need this functionality.
   */
  optionComponent?: ReactSelectProps<OptionValues>['optionComponent']
  /** Handler for selecting an option */
  handleChange?: OnChangeHandler<OptionValues>
  /** Called when the input is changed */
  onChange?: (value?: OptionValues | OptionValues[] | null) => void
  /** Handler for opening the select menu */
  onOpen?: OnOpenHandler
  /** Handler for creating new options */
  onNewOptionCreated?: (option: Option) => void
  /** Handler for input being updated when user type to search */
  onInputChange?: (input: string) => void
  /** A function to customize the filtering logic */
  filterOptions?: FilterOptionsHandler
  /** Label for accessibility */
  'aria-label'?: string

  /** The margins around the component */
  margins?: Props.IMargins
  /** The data-component-context */
  componentContext?: string
}

export class SelectInput extends React.PureComponent<ISelectInputProps> {
  public static defaultProps: Partial<ISelectInputProps> = {
    placeholder: 'Please Select',
    isClearable: true,
    isSearchable: true,
    shouldCloseOnSelect: true,
    shouldFilteringBePerformed: true,
    shouldRemoveElementsFromMultiSelect: true
  }

  public UNSAFE_componentWillMount () {
    this.autoSelectValue()
  }

  public componentDidUpdate (prevProps: ISelectInputProps) {
    if (!isEqual(prevProps.options, this.props.options)) {
      this.autoSelectValue()
    }
  }

  public render (): JSX.Element {
    const {
      onNewOptionCreated,
      margins,
      componentContext
    } = this.props

    if (onNewOptionCreated) {
      return (
        <StyledSelectInputWrapper
          margins={margins}
          data-component-context={componentContext}
          data-component-type={Props.ComponentType.SelectInput}
        >
          <Creatable<OptionValues>
            {...this.reactSelectProps}
            onNewOptionClick={onNewOptionCreated}
            showNewOptionAtTop={false}
          />
        </StyledSelectInputWrapper>
      )
    }

    return (
      <StyledSelectInputWrapper
        margins={margins}
        data-component-context={componentContext}
        data-component-type={Props.ComponentType.SelectInput}
      >
        <Select<OptionValues>
          {...this.reactSelectProps}
        />
      </StyledSelectInputWrapper>
    )
  }

  private get reactSelectProps () {
    const {
      id,
      name,
      value,
      placeholder,
      emptyValue,
      noResultsText,
      options,
      isClearable,
      isSearchable,
      isDisabled,
      isFetching,
      isInvalid,
      isMultiSelect,
      shouldCloseOnSelect,
      shouldFilteringBePerformed,
      shouldRemoveElementsFromMultiSelect,
      onOpen,
      optionComponent,
      filterOptions,
      'aria-label': label
    } = this.props

    return {
      'autoFocus': false,
      'className': classNames({ 'is-invalid-input': isInvalid }, `react-select-${name}`, style.selectInput),
      'clearable': isClearable,
      'searchable': isSearchable,
      'closeOnSelect': shouldCloseOnSelect,
      'disabled': isDisabled,
      'id': id || name,
      'isLoading': isFetching,
      'filterOption': shouldFilteringBePerformed ? undefined : this.disableFiltering,
      filterOptions,
      'multi': isMultiSelect,
      'name': isMultiSelect ? `${name}[]` : name,
      noResultsText,
      'onBlurResetsInput': true,
      'onChange': this.handleChange,
      'onCloseResetsInput': true,
      'onInputChange': this.onInputChange,
      'onSelectResetsInput': true,
      'openOnFocus': false,
      onOpen,
      optionComponent,
      options,
      placeholder,
      'removeSelected': shouldRemoveElementsFromMultiSelect,
      'resetValue': emptyValue,
      value,
      'aria-label': label
    }
  }

  private handleChange = (newValue: Option | Options | null) => {
    const {
      onChange,
      handleChange
    } = this.props

    if (onChange) {
      if (newValue && Array.isArray(newValue)) {
        onChange(
          newValue.reduce((result: OptionValues[], currentOption: Option) => {
            if (currentOption.value) {
              result.push(currentOption.value)
            }
            return result
          }, [])
        )
      } else {
        onChange(newValue ? newValue.value : null)
      }
    } else if (handleChange) {
      return handleChange(newValue)
    }
  }

  private autoSelectValue = (): void => {
    const {
      isMultiSelect,
      shouldAutoSelectWhenSingleOption,
      options,
      value
    } = this.props

    if (shouldAutoSelectWhenSingleOption && isEmpty(value) && options && options.length === 1) {
      let changeValue: Option | Option[] = options[0]

      if (isMultiSelect) {
        changeValue = [changeValue]
      }

      this.handleChange(changeValue)
    }
  }

  private disableFiltering = () => true

  // tslint:disable-next-line:member-ordering
  private debounceOnInputChangeCallback = debounce((input: string): void => {
    const {
      onInputChange
    } = this.props

    if (onInputChange) {
      onInputChange(input)
    }
  }, 500, { maxWait: 1000 })

  // We debounce the callback but onInputChange must always return the current input text to work correctly
  private onInputChange = (input: string): string => {
    this.debounceOnInputChangeCallback(input)

    return input
  }
}
