"use client";
import React, { useActionState, useEffect } from 'react'
import { ContactType } from '../_types/contact';
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';

type ContactFormProps = {
    action: (prevState: any, formData: FormData) => Promise<any>;
    contact?: ContactType;
};

const ContactForm = ({ action, contact }: ContactFormProps) => {
    // const router = useRouter();
    const [state, formAction] = useActionState(action, null);

    useEffect(() => {
        if(state?.success) {
            redirect("/contact")
        }
    },[state])

    return (
        <form action={formAction} className='space-x-4'>
            <input type="hidden" name="id" value={contact?.id}/>
            <div>
                <label htmlFor="name" className='block text-sm font-medium text-gray-700'>Name</label>
                <input
                    type='text'
                    name='name'
                    defaultValue={contact?.name || ""}
                    placeholder='Enter name'
                    required
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2'
                />
            </div>
            <div className='mt-3'>
                <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
                <input
                    type='email'
                    name='email'
                    defaultValue={contact?.email || ""}
                    placeholder='Enter email'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2'
                />
            </div>
            <div className='mt-3'>
                <label htmlFor="number" className='block text-sm font-medium text-gray-700'>Number</label>
                <input
                    type='text'
                    name='number'
                    defaultValue={contact?.number || ""}
                    placeholder='Enter number'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2'
                />
            </div>
            {state?.error && (
                <div className='text-red-500 text-sm'>{state.error}</div>
            )}
            <button
                type='submit'
                className='mt-3 w-full rounded-md text-white flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-whire bg-green-600 hover:bg-green-700 focus:outline-2'>
                Save Contact</button>
        </form>
    )
}

export default ContactForm
