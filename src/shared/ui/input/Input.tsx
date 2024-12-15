import React from 'react';
import styled from 'styled-components';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'> & {
  /**
   * Applies error styles
   */
  error?: boolean;
  /**
   * Adds prefix content before the input
   */
  prefix?: React.ReactNode;
  /**
   * Adds suffix content after the input
   */
  suffix?: React.ReactNode;
};

const InputWrapper = styled.div<{ error?: boolean }>`
  width: 100%;
  border: 1px solid ${props => (props.error ? '#880000' : '#000')};
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.5s ease, box-shadow 0.5s ease;
  padding: 0.25rem;
  margin-bottom: 1rem;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;

  &:focus-within,
  &:hover {
    border-color: ${props => (props.error ? '#880000' : 'hsl(calc(var(--lightness) - 15%), 78%, 78%)')};
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  }
`;

const StyledInput = styled.input<{ error?: boolean }>`
  min-width: 3.5rem;
  justify-self: stretch;
  align-self: stretch;
  flex: 1;
  border: none;
  background: transparent;
  color: ${props => (props.error ? '#880000' : 'inherit')};

  &:focus {
    outline: none;
  }
`;

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { id, error, prefix, suffix, ...rest } = props;

  return (
    <InputWrapper error={error}>
      {prefix ?? null}
      <StyledInput
        aria-invalid={error}
        autoComplete="off"
        error={error}
        id={id}
        ref={ref}
        {...rest}
      />
      {suffix ?? null}
    </InputWrapper>
  );
});
