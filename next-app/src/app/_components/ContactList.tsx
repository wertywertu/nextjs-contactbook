import React from 'react'
import { ContactType } from '../_types/contact';
import Link from 'next/link';
import { FiEdit } from 'react-icons/fi';
import DeleteButton from './DeleteButton';
import { deleteContactAction } from '../actions/contact';

const ContactList = ({ contacts }: { contacts: ContactType[] }) => {
    return <div className='space-y-4'>{contacts.map((contact) => (
        <div key={contact.id} className='p-4 border rounded-lg'>
            <div className='flex justify-between items-start'>
                <div>
                    <h2 className='text-lg font-semibold'>{contact.name} - {contact.email}</h2>
                    <p>{contact.number}</p>
                    <p></p>
                </div>
                <div className='flex items-center self-center gap-3'>
                    <Link href={`/contact/edit/${contact.id}`} className='flex items-center text-green-600 gap-2 px-3 py-1 border border-green-300 rounded-md hover:border-green-400 hover:bg-green-100'>
                        <FiEdit className="text-green-600"/>Edit
                    </Link>
                    <DeleteButton action={deleteContactAction} contact={contact}/>
                </div>
            </div>
        </div>
    ))}</div>;
};

export default ContactList
