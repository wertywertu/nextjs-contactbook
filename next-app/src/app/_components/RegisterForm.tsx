import React from 'react'
import { registerAction } from '../actions/auth';

const RegisterForm = () => {
  return (
          <form action={registerAction}>
              <div>
                  <label className='block text-sm font-medium text-gray-700'>Name</label>
                  <input
                      type='text'
                      name='name'
                      placeholder='Enter your name'
                      required
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2'
                  />
              </div>
              <div className='mt-3'>
                  <label className='block text-sm font-medium text-gray-700'>Email</label>
                  <input
                      type='email'
                      name='email'
                      placeholder='Enter your email'
                      required
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2'
                  />
              </div>
              <div className='mt-3'>
                  <label className='block text-sm font-medium text-gray-700'>Password</label>
                  <input
                      type='password'
                      name='password'
                      placeholder='Enter your password'
                      required
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2'
                  />
              </div>
              <button
                  type='submit'
                  className='mt-3 w-full rounded-md text-white flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-whire bg-green-600 hover:bg-green-700 focus:outline-2 cursor-pointer'>
                  Register</button>
          </form>
      );
}

export default RegisterForm
