'use client';

import React, { FC } from "react";

interface SelectProps {
    label: String;
    value?: Record<string, any>;
    onChange: (value: Record<string, any>) => void;
    options: Record<string, any>[];
    disabled?: boolean;
}

const Select: FC<SelectProps> = ({
    label,
    value,
    onChange,
    options,
    disabled
}) => {
    return (
        <div className='z-[100]'>
            <label
                className="block text-sm font-medium leading-6 text-gray-700"
            >
                { label }
            </label>
            <div className="mt-2">
                
            </div>
        </div>
    );
}

export default Select;