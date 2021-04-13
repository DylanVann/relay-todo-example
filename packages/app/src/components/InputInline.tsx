import { FocusEventHandler, KeyboardEventHandler, useRef } from 'react'
import Input from './Input'
import { tw } from 'twind'
import classNames from 'classnames'

export type InputInlineProps = JSX.IntrinsicElements['input'] & {
  onSave?: (value: string) => void
}

export default function InputInline(props: InputInlineProps) {
  const { onSave, className, ...inputProps } = props
  const ref = useRef<HTMLInputElement>(null)
  const save = () => {
    const value = ref.current?.value || ''
    if (value !== props.defaultValue) {
      props.onSave?.(value)
    }
  }
  const onBlur: FocusEventHandler = (e) => {
    save()
  }
  const onKeyDown: KeyboardEventHandler = (e) => {
    if (ref.current) {
      if (e.key === 'Escape') {
        ref.current.value = (props.defaultValue as string) || ''
        ref.current.blur()
      } else if (e.key === 'Enter') {
        save()
        ref.current.blur()
      }
    }
  }
  return (
    <Input
      {...inputProps}
      ref={ref}
      defaultValue={props.defaultValue}
      className={classNames(tw`shadow-none`, className)}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onKeyPress={() => console.log('keypress')}
    />
  )
}
