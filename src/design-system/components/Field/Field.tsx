import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { cx } from '../../utils/cx.ts'
import './Field.css'

interface FieldShellProps {
  label: string
  hint?: ReactNode
  error?: string
  required?: boolean
  className?: string
  children: (id: string, describedBy: string | undefined) => ReactNode
}

/** Label + control + hint/error, sharing ids so the control stays described. */
function FieldShell({ label, hint, error, required, className, children }: FieldShellProps) {
  const id = `f${useId().replace(/:/g, '')}`
  const messageId = error || hint ? `${id}-msg` : undefined

  return (
    <div className={cx('bfk-field', error && 'bfk-field--invalid', className)}>
      <label className="bfk-field__label" htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children(id, messageId)}
      {(error || hint) && (
        <p className="bfk-field__message" id={messageId} role={error ? 'alert' : undefined}>
          {error ?? hint}
        </p>
      )}
    </div>
  )
}

type Shared = { label: string; hint?: ReactNode; error?: string; className?: string }

export type InputProps = Shared &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>

export function Input({ label, hint, error, className, required, ...rest }: InputProps) {
  return (
    <FieldShell label={label} hint={hint} error={error} required={required} className={className}>
      {(id, describedBy) => (
        <input
          id={id}
          className="bfk-field__control"
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          required={required}
          {...rest}
        />
      )}
    </FieldShell>
  )
}

export type TextareaProps = Shared &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>

export function Textarea({ label, hint, error, className, required, rows = 4, ...rest }: TextareaProps) {
  return (
    <FieldShell label={label} hint={hint} error={error} required={required} className={className}>
      {(id, describedBy) => (
        <textarea
          id={id}
          rows={rows}
          className="bfk-field__control bfk-field__control--area"
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          required={required}
          {...rest}
        />
      )}
    </FieldShell>
  )
}

export type SelectProps = Shared &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> & {
    options: { value: string; label: string }[]
  }

export function Select({ label, hint, error, className, required, options, ...rest }: SelectProps) {
  return (
    <FieldShell label={label} hint={hint} error={error} required={required} className={className}>
      {(id, describedBy) => (
        <div className="bfk-field__selectWrap">
          <select
            id={id}
            className="bfk-field__control bfk-field__control--select"
            aria-describedby={describedBy}
            aria-invalid={error ? true : undefined}
            required={required}
            {...rest}
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <svg className="bfk-field__chevron" viewBox="0 0 12 8" aria-hidden="true">
            <path d="M1 1.5 6 6.5l5-5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </div>
      )}
    </FieldShell>
  )
}
