'use-client'

import { ErrorMessage, Field } from 'formik';
import React, { useEffect, useRef } from 'react';

interface GooglePlacesInputProps {
    onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
    label?: string
    name: string
    type?: string
    showError?: any
    className?: string
    placeholder: string,
    LeftIcon?: React.ReactNode
}

const GooglePlacesInput: React.FC<GooglePlacesInputProps> = ({ onPlaceSelected, name, label, placeholder, LeftIcon, showError, type, className }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!inputRef.current) return;

        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
            types: ['geocode'], 
        });

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place && place.geometry) {
                onPlaceSelected(place);
            }
        });
    }, [onPlaceSelected]);

    return (
        <div className='text-[14px] mb-2'>
            <div className="relative rounded-md shadow-sm">
                {LeftIcon && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                        {LeftIcon}
                    </div>
                )}
                <input 
                    ref={inputRef} 
                    type={type} 
                    className={`${className} block w-full rounded-md h-11 border-0 py-1.5 ${LeftIcon ? 'pl-9' : 'pl-3'} text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6`} 
                    placeholder={placeholder} 
                />
                {showError && (
                    <ErrorMessage name={name} />
                )}
            </div>
        </div>
    )
};

export default GooglePlacesInput;
