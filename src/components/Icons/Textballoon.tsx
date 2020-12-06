import React from 'react';
import { Icon } from './Icon';

const COMMENTING_FULL = 'M10 14c0-1.109-0.891-2-2-2s-2 0.891-2 2 0.891 2 2 2 2-0.891 2-2zM16 14c0-1.109-0.891-2-2-2s-2 0.891-2 2 0.891 2 2 2 2-0.891 2-2zM22 14c0-1.109-0.891-2-2-2s-2 0.891-2 2 0.891 2 2 2 2-0.891 2-2zM28 14c0 5.531-6.266 10-14 10-1.141 0-2.25-0.094-3.297-0.281-1.781 1.781-4.109 3-6.797 3.578-0.422 0.078-0.875 0.156-1.344 0.203-0.25 0.031-0.484-0.141-0.547-0.375v0c-0.063-0.25 0.125-0.406 0.313-0.578 0.984-0.922 2.156-1.656 2.562-4.953-2.984-1.828-4.891-4.547-4.891-7.594 0-5.531 6.266-10 14-10s14 4.469 14 10z'

interface Props {
    className?: string;

    [key: string]: any;
}

export const Textballoon = ({className = '', isOpen, ...restProps}: Props) => (
    <Icon className={`${className} cursor-pointer`} {...restProps} icon={COMMENTING_FULL} viewBox={'0 0 28 28'}
          size={36} color='black'/>
)

