/**
 *  Focuses first input of event
 * */
export const focusFirstInput = (e: React.MouseEvent) => {
	const input = e.currentTarget.querySelector("input")
	input?.focus()
}