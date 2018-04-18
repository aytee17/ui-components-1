import classNames from 'classnames'
import React from 'react'

const style = require('./AttributeLabel.scss')

export interface AttributeLabelProps {
  /** Text to show inside the label  */
  text: string

  /** Extra classes to apply to the label  */
  className?: string

  /** Background or border colour of the label  */
  color?: 'alert' | 'success' | 'warning' | 'primary' | 'neutral' | 'secondary'

  /** Should the label have a hollow centre with a border outline  */
  isHollow?: boolean

  /** size of the label  */
  size?: 'small' | 'medium' | 'large'
}

export class AttributeLabel extends React.Component<AttributeLabelProps> {
  public static defaultProps: AttributeLabelProps = {
    text: '',
    color: 'neutral',
    isHollow: false,
    size: 'small'
  }

  public render (): JSX.Element {
    const {
      text,
      color,
      isHollow,
      size,
      className
    } = this.props

    return (
      <span
        className={classNames(className, 'label', style.AttributeLabel, color, size, {'hollow': isHollow})}
      >
        {text}
      </span>
    )
  }
}
