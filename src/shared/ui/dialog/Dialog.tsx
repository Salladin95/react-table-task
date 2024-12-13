import React from 'react'
import { cn } from '~/shared/utils'
import * as RadixDialog from '@radix-ui/react-dialog'

import './dialog.scss'

export type DialogProps = RadixDialog.DialogContentProps & {
	trigger?: React.ReactNode
	children: React.ReactNode
	open?: boolean
	defaultOpen?: boolean
	onOpenChange?: (open: boolean) => void
	onOverlayClick?: (e?: React.SyntheticEvent) => void
}
export const Dialog = (props: DialogProps) => {
	const { className, trigger, children, open: propsOpen, defaultOpen, onOpenChange, onOverlayClick, ...rest } = props
	const [open, setOpen] = React.useState(false)
	React.useEffect(() => setOpen(Boolean(propsOpen)), [propsOpen])
	React.useEffect(() => onOpenChange && onOpenChange(open), [onOpenChange, open])

	return (
		<RadixDialog.Root defaultOpen={defaultOpen} onOpenChange={setOpen} open={open}>
			{trigger && (
				<RadixDialog.Trigger asChild onClick={() => setOpen(true)}>
					{trigger}
				</RadixDialog.Trigger>
			)}
			<RadixDialog.Portal>
				<RadixDialog.Overlay data-visible={open} className={'dialog-overlay'} onClick={onOverlayClick} />
				<RadixDialog.Content {...rest} asChild>
					<div className={cn('dialog-content', className)}>
						<RadixDialog.Title className="dialog-title">Edit profile</RadixDialog.Title>
						{children}
					</div>
				</RadixDialog.Content>
			</RadixDialog.Portal>
		</RadixDialog.Root>
	)
}

Dialog.Close = RadixDialog.Close
