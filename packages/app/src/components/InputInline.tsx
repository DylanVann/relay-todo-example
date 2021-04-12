import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react'
import Input from './Input'
import { tw } from 'twind'
import { useUncontrolledProp } from 'uncontrollable'
import classNames from 'classnames'

export type InputInlineProps = JSX.IntrinsicElements['input'] & {
  onSave?: (value: string) => void
  defaultIsEditing?: boolean
  isEditing?: boolean
  onChangeIsEditing?: (isEditing: boolean) => void
}

export default function InputInline(props: InputInlineProps) {
  const [isEditing, onChangeIsEditing] = useUncontrolledProp(
    props.isEditing,
    props.defaultIsEditing,
    props.onChangeIsEditing,
  )
  const [value, setValue] = useState(String(props.defaultValue))
  const onClickedDiv = () => onChangeIsEditing(true)
  const save = () => {
    if (value !== props.defaultValue) {
      props.onSave?.(value)
    }
    onChangeIsEditing(false)
  }
  const onBlur = () => save()
  const onKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === 'Escape') {
      onChangeIsEditing(false)
    } else if (e.key === 'Enter') {
      save()
    }
  }
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
  }
  return isEditing ? (
    <Input
      autoFocus
      defaultValue={props.defaultValue}
      className={props.className}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onChange={onChange}
    />
  ) : (
    <div
      className={classNames(tw`px-1.5 py-0`, props.className)}
      onClick={onClickedDiv}
    >
      {props.defaultValue}
    </div>
  )
}
