"use client";

import Select from "react-select";

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    value: string;
    onChange: ((value: string) => void) | ((e: { target: { value: string } }) => void);
    options: Option[];
    placeholder?: string;
}

function CustomSelect({
    value,
    onChange,
    options,
    placeholder = "Select an option",
}: CustomSelectProps) {
    // Ensure all option values and the value prop are strings
    const normalizedOptions = options.map((opt) => ({
        value: String(opt.value),
        label: opt.label,
    }));
    const normalizedValue = value !== undefined && value !== null ? String(value) : "";
    const selectedOption = normalizedOptions.find((opt) => opt.value === normalizedValue) || null;
    if (normalizedValue && !selectedOption) {
        console.warn(`CustomSelect: value '${normalizedValue}' not found in options`, normalizedOptions);
    }
    return (
        <Select
            classNamePrefix="custom-select"
            value={selectedOption}
            onChange={(optionOrEvent) => {
                let newValue = "";
                if (typeof optionOrEvent === 'string') {
                    newValue = optionOrEvent;
                } else if (optionOrEvent && typeof optionOrEvent === 'object' && 'value' in optionOrEvent) {
                    newValue = optionOrEvent.value as string;
                }
                // Support both (value) => void and (e) => void
                if (typeof onChange === 'function') {
                    // If the function expects an event, pass a synthetic event
                    if (onChange.length === 1 && typeof newValue === 'string') {
                        try {
                            onChange(newValue);
                        } catch {
                            onChange({ target: { value: newValue } } as any);
                        }
                    }
                }
            }}
            options={normalizedOptions}
            placeholder={placeholder}
            isClearable={false}
            isSearchable={true}
            styles={{
                control: (base, state) => ({
                    ...base,
                    minHeight: '48px',
                    borderColor: state.isFocused ? '#2563eb' : '#e5e7eb',
                    boxShadow: state.isFocused ? '0 0 0 2px #dbeafe' : undefined,
                    backgroundColor: '#dcebf9',
                    fontWeight: 600,
                    color: normalizedValue ? '#1e293b' : '#64748b',
                }),
                placeholder: (base) => ({
                    ...base,
                    color: '#64748b',
                }),
                singleValue: (base) => ({
                    ...base,
                    color: '#1e293b',
                }),
            }}
        />
    );
}

export default CustomSelect;
