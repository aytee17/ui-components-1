import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import React, { FormEvent } from 'react'
import { SingleDatePicker, SingleDatePickerShape } from 'react-dates'
import moment, { Moment } from 'moment'
import classNames from 'classnames'
import { FontAwesomeIcon } from '../../Icons/FontAwesomeIcon'

const style = require('./style.scss')

interface ISingleDateInputProps {
  name: string
  dateFormat: string
  handleChange?: (date: Moment | string | null) => void
  isInvalid?: boolean
}

interface ISingleDateInputState {
  date: Moment | null
  focused: boolean
}

class SingleDateInput extends React.PureComponent<ISingleDateInputProps & SingleDatePickerShape, ISingleDateInputState> {
  public static defaultProps = {
    dateFormat: 'DD/MM/YYYY'
  }

  public state: ISingleDateInputState = {
    date: null,
    focused: false
  }

  public render (): JSX.Element {
    const {
      name,
      dateFormat
    } = this.props

    return (
      <div
        className={this.classNames}
        onChange={this.onChange}
      >
        <SingleDatePicker
          id={name}
          date={this.state.date}
          placeholder={moment().format(dateFormat)}
          displayFormat={dateFormat}
          onDateChange={this.dateChange}
          focused={this.state.focused}
          onFocusChange={this.focusChange}
          noBorder
          block
          isOutsideRange={this.disabledDateRange}
          hideKeyboardShortcutsPanel
          renderMonthText={this.renderMonthText}
          navPrev={
            <div className={this.navigationButtonClassNames('left')}>
              <FontAwesomeIcon type='arrow-left'/>
            </div>
          }
          navNext={
            <div className={this.navigationButtonClassNames('right')}>
              <FontAwesomeIcon type='arrow-right'/>
            </div>
          }
        />
      </div>
    )
  }

  get classNames (): string {
    const {
      isInvalid
    } = this.props

    return classNames(
      style.singleDatePickerOverrides,
      {
        'is-invalid-input': isInvalid
      }
    )
  }

  private disabledDateRange: () => boolean =
    () => false

  private renderMonthText: (day: Moment) => string =
    day => moment(day).format('MMM YYYY')

  private dateChange: (date: Moment | null) => void =
    date => {
      const {
        handleChange
      } = this.props

      if (handleChange && date !== null) {
        handleChange(date)
      }

      this.setState({ date })
    }

  private onChange: (e: FormEvent<HTMLDivElement>) => void =
    e => {
      const {
        handleChange,
        dateFormat
      } = this.props

      const rawInputElement =  e.target as HTMLInputElement

      if (handleChange && !moment(rawInputElement.value, dateFormat, true).isValid()) {
        handleChange(rawInputElement.value)
      }
    }

  private focusChange: (focusChangeArgs: { focused: boolean | null }) => void =
    focusChangeArgs => {
      this.setState({
        focused: focusChangeArgs.focused || false
      })
    }

  private navigationButtonClassNames: (side: 'left' | 'right') => string =
    side => {
      return classNames(
        'DayPickerNavigation_button__default',
        'DayPickerNavigation_button__horizontalDefault',
        `DayPickerNavigation_${side}Button__horizontalDefault`
      )
    }
}

export {
  SingleDateInput
}
