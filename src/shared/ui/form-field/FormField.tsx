import { cn } from '~/shared/utils'
import { PropsWithChildren, PropsWithClassName } from '~/shared/types'

import './form-field.scss'

type FormFieldProps = {
	error?: string
	required?: boolean
} & Required<PropsWithChildren> &
	PropsWithClassName

type FormFieldWithLabelProps = {
	forId: string
	label: string
} & FormFieldProps

export function FormFieldWithLabel(props: FormFieldWithLabelProps) {
	const { forId: id, label, children, error, className, required } = props
	return (
		<div data-error={Boolean(error)} className={cn('form-field', className)}>
			<div className='flex gap-1'>
				{Boolean(required) && <span className="form-field__required">*</span>}
				<label className={'form-field__label'} htmlFor={id}>
					{label}
				</label>
			</div>
			{children}
			{error && <span className={'form-field__error'}>{error}</span>}
		</div>
	)
}

export function FormField(props: FormFieldProps) {
	const { children, error, className } = props
	return (
		<div data-error={Boolean(error)} className={cn('form-field', className)}>
			{children}
			{error && <span className={'form-field__error'}>{error}</span>}
		</div>
	)
}
