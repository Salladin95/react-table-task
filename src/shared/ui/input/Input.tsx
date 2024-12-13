import React from 'react'
import { cn, focusFirstInput } from '~/shared/utils'
import { cva, VariantProps } from 'class-variance-authority'

import './input.scss'

const inputVariants = cva('input-wrapper__input input p3', {
	variants: {
		variant: {
			primary: ['input-wrapper__input_primary'],
			secondary: ['input-wrapper__input_secondary'],
			none: [],
		},
		size: {
			default: ['input_size-default'],
			none: [],
		},
	},
	defaultVariants: {
		variant: 'primary',
		size: 'default',
	},
})

export type InputVariant = VariantProps<typeof inputVariants>
export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'> & {
	variant?: InputVariant['variant']
	/**
	 * Size: [default, none]
	 * */
	size?: InputVariant['size']
	/**
	 * Applies error styles
	 * */
	error?: boolean
	/**
	 * Adds prefix content before the input
	 */
	prefix?: React.ReactNode
	/**
	 * Adds suffix content after the input
	 */
	suffix?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { id, variant, size, className, error, prefix, suffix, ...rest } = props
	return (
		<div
			className={cn('input-wrapper', className, {
				'input-wrapper_error': error,
			})}
			onClick={focusFirstInput}
		>
			{prefix ?? null}
			<input
				aria-invalid={error}
				autoComplete="off"
				className={inputVariants({
					variant,
					size,
				})}
				data-error={error}
				id={id}
				ref={ref}
				{...rest}
			/>
			{suffix ?? null}
		</div>
	)
})
