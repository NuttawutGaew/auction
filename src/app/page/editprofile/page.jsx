'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import NavbarEditProfile from '../../components/NavbarEditProfile'

const ShowCard = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-xl font-bold text-gray-900">Confirm change?</p>
            <p className="font-light text-gray-600">Are you sure? who want to change information</p>
            <div className="flex justify-end space-x-4 mt-4">
                <button 
                    onClick={onCancel}
                    className="px-4 py-2 border rounded-lg bg-red-500 hover:bg-red-800 text-white"
                >
                    Cancel
                </button>
                <button 
                    onClick={onConfirm}
                    className="px-4 py-2 border rounded-lg bg-green-500 text-white hover:bg-green-700"
                >
                    Confirm
                </button>
            </div>
        </div>
    </div>
);

function EditProfilePage() {
  const router = useRouter()
  const [showCard, setShowCard] = useState(false)

  const handleCancel = () => {
    router.push('/page/profile')
  }

  const handleSave = (e) => {
    e.preventDefault()
    setShowCard(true)
  }

  const handleConfirm = () => {
    setShowCard(false)
    // Add your form submission logic here
    router.push('/page/profile')
  }

  const handleCardCancel = () => {
    setShowCard(false)
  }

  return (
    <div>
      <NavbarEditProfile />
      <div className="container mx-auto pt-16">
        <div className="bg-white shadow rounded-lg p-6">
            <div className="p-8 bg-yellow-100 ml-10 mr-10 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 font-custom">Edit Profile</h1>
                <form onSubmit={handleSave}>
                    {/* Profile Image Section */}
                    <div className="mb-6">
                    <div className="flex flex-col items-center">
                        <img 
                        src="../images/profile.jpg" 
                        alt="Profile" 
                        className="w-60 h-60 rounded-full border-4 border-gray-200 mb-4"
                        />
                        <label className="cursor-pointer bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 hover:scale-125 shadow-lg">
                        <span>Upload Image</span>
                        <input type="file" className="hidden" accept="image/*" />
                        </label>
                    </div>
                    </div>

                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 mb-2">User name</label>
                        <input 
                        type="text"
                        className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="User name"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Phone Number</label>
                        <input 
                        type="tel"
                        className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Phone Number"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-gray-700 mb-2">Address</label>
                        <textarea 
                            className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            rows="3"
                            placeholder="Address"
                        ></textarea>
                    </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-4 mt-6">
                    <button 
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 border rounded-lg hover:bg-red-700 bg-red-500 text-white hover:text-white"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Save
                    </button>
                    </div>
                </form>
            </div>
          
        </div>
      </div>
      {showCard && <ShowCard onConfirm={handleConfirm} onCancel={handleCardCancel} />}
    </div>
  )
}

export default EditProfilePage