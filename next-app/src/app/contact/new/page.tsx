import ContactForm from '@/app/_components/ContactForm';
import { createContactAction } from '@/app/actions/contact';
import React from 'react';

const NewContactPage = () => {
    return (
        <div className='namx-w-md mx-auto p-6 bg-white rounded-lg shadow-md'>
            <h1 className='text-2xl fontbold mb-6'>Create New Contact</h1>
            <ContactForm action={createContactAction}/>
        </div>
    );
};

export default NewContactPage;