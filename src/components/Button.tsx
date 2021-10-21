import React from 'react'

interface Props {
    children?: React.ReactNode
    onClick: () => void
    variant: string
    className: string
    size: string
}

const cls = (input: string) =>
    input.replace(/\s+/gm, ' ').split(' ').join(' ').trim()

const classes = {
    base: 'focus:outline-none transition ease-in-out duration-300',
    pill: 'rounded-full',
    size: {
        small: 'px-2 py-1 text-sm',
        normal: 'px-4 py-2',
        large: 'px-8 py-3 text-lg',
    },
    variant: {
        primary:
            'bg-blue-500 hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white',
        secondary:
            'bg-gray-200 hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-gray-900 hover:text-white',
        danger: 'bg-red-500 hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-white',
        next: '',
        prev: '',
        warning: '',
        disabled: 'opacity-50 cursor-not-allowed',
    },
}

const Button: React.FC<Props> = ({
    children,
    variant,
    className,
    size,
    ...props
}) => {
    return (
        <button
            className={cls(`
                ${classes.base}
                ${classes.size[size]}
                ${classes.variant[variant]}
                ${className}`)}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
