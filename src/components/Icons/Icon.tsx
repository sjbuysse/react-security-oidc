import React from 'react';

interface Props {
    icon: string,
    size?: number,
    color?: string,
    className?: string;
    viewBox?: string
    [key: string]: any;
}

// tip: find icons here https://icomoon.io/app/#/select and click on generate SVG on the bottom of the page
export const Icon = ({icon, viewBox = '0 0 32 32', size = 16, color = 'white', className = '', ...restProps}: Props) => (
    <svg
        {...restProps}
        className={`${className} inline-block`}
        width={`${size}px`}
        height={`${size}px`}
        viewBox={viewBox}
    >
        <path style={{fill: color}}
              d={icon}/>
    </svg>
);
