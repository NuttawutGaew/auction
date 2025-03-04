// 'use client'

// import React, { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import NavbarEditProfile from '../../components/NavbarEditProfile'

// const ShowCard = ({ onConfirm, onCancel }) => (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//         <div className="bg-white p-4 rounded-lg shadow-lg">
//             <p className="text-xl font-bold text-gray-900">Confirm change?</p>
//             <p className="font-light text-gray-600">Are you sure? who want to change information</p>
//             <div className="flex justify-end space-x-4 mt-4">
//                 <button 
//                     onClick={onCancel}
//                     className="px-4 py-2 border rounded-lg bg-red-500 hover:bg-red-800 text-white"
//                 >
//                     Cancel
//                 </button>
//                 <button 
//                     onClick={onConfirm}
//                     className="px-4 py-2 border rounded-lg bg-green-500 text-white hover:bg-green-700"
//                 >
//                     Confirm
//                 </button>
//             </div>
//         </div>
//     </div>
// );

// function EditProfilePage() {
//   const router = useRouter()
//   const [showCard, setShowCard] = useState(false)

//   const handleCancel = () => {
//     router.push('/page/profile')
//   }

//   const handleSave = (e) => {
//     e.preventDefault()
//     setShowCard(true)
//   }

//   const handleConfirm = () => {
//     setShowCard(false)
//     // Add your form submission logic here
//     router.push('/page/profile')
//   }

//   const handleCardCancel = () => {
//     setShowCard(false)
//   }

//   return (
//     <div>
//       <NavbarEditProfile />
//       <div className="container mx-auto pt-16">
//         <div className="bg-white shadow rounded-lg p-6">
//             <div className="p-8 bg-yellow-100 ml-10 mr-10 rounded-lg shadow-lg">
//                 <h1 className="text-2xl font-bold mb-6 font-custom">Edit Profile</h1>
//                 <form onSubmit={handleSave}>
//                     {/* Profile Image Section */}
//                     <div className="mb-6">
//                     <div className="flex flex-col items-center">
//                         <img 
//                         src="../images/profile.jpg" 
//                         alt="Profile" 
//                         className="w-60 h-60 rounded-full border-4 border-gray-200 mb-4"
//                         />
//                         <label className="cursor-pointer bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 hover:scale-125 shadow-lg">
//                         <span>Upload Image</span>
//                         <input type="file" className="hidden" accept="image/*" />
//                         </label>
//                     </div>
//                     </div>

//                     {/* Personal Information */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                         <label className="block text-gray-700 mb-2">User name</label>
//                         <input 
//                         type="text"
//                         className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                         placeholder="User name"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-gray-700 mb-2">Phone Number</label>
//                         <input 
//                         type="tel"
//                         className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                         placeholder="Phone Number"
//                         />
//                     </div>

//                     <div className="md:col-span-2">
//                         <label className="block text-gray-700 mb-2">Address</label>
//                         <textarea 
//                             className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                             rows="3"
//                             placeholder="Address"
//                         ></textarea>
//                     </div>
//                     </div>

//                     {/* Buttons */}
//                     <div className="flex justify-end space-x-4 mt-6">
//                     <button 
//                         type="button"
//                         onClick={handleCancel}
//                         className="px-4 py-2 border rounded-lg hover:bg-red-700 bg-red-500 text-white hover:text-white"
//                     >
//                         Cancel
//                     </button>
//                     <button 
//                         type="submit"
//                         className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//                     >
//                         Save
//                     </button>
//                     </div>
//                 </form>
//             </div>
          
//         </div>
//       </div>
//       {showCard && <ShowCard onConfirm={handleConfirm} onCancel={handleCardCancel} />}
//     </div>
//   )
// }

// export default EditProfilePage

'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import NavbarEditProfile from '../../components/NavbarEditProfile'

function EditProfilePage() {
  const router = useRouter()
  const [profileImage, setProfileImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' })

  // โหลดข้อมูลโปรไฟล์จากเซิร์ฟเวอร์
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3111/api/v1/profile', {
          method: 'GET',
          credentials: 'include',
        })
        if (!response.ok) throw new Error('โหลดข้อมูลโปรไฟล์ไม่สำเร็จ')
        const data = await response.json()
        setFormData({
          name: data.data.profile.name || 'New User',  // ✅ ป้องกัน name ว่าง,
          phone: data.data.profile.phone || '',
          address: data.data.profile.address || '',
        })
      } catch (error) {
        console.error('Error loading profile:', error)
      }
    }

    const fetchProfileImage = async () => {
      try {
        const response = await fetch('http://localhost:3111/api/v1/profile/image', {
          method: 'GET',
          credentials: 'include',
        })
        if (response.ok) {
          const data = await response.json()
          setPreviewImage(data.image) // ใช้ Base64 image
        }
      } catch (error) {
        console.error('Error loading profile image:', error)
      }
    }

    fetchProfile()
    fetchProfileImage()
  }, [])

  const handleCancel = () => {
    router.push('/page/profile')
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      setPreviewImage(URL.createObjectURL(file)) // แสดงตัวอย่างรูปที่เลือก
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("📩 Sending Data:", formData); // ✅ Debug formData ก่อนส่ง
  
    try {
      // 🔹 อัปเดตข้อมูลโปรไฟล์
      const profileUpdateResponse = await fetch('http://localhost:3111/api/v1/profile', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!profileUpdateResponse.ok) throw new Error('Failed to upload image.');
  
      // 🔹 อัปโหลดรูปโปรไฟล์ (ถ้ามีการเปลี่ยนรูป)
      if (profileImage) {
        const formDataToSend = new FormData();
        formDataToSend.append('image', profileImage);
  
        const uploadResponse = await fetch('http://localhost:3111/api/v1/profile/upload', {
          method: 'POST',
          credentials: 'include',
          body: formDataToSend,
        });
  
        if (!uploadResponse.ok) throw new Error('Failed to upload image.');
      }
  
      router.push('/page/profile'); // 🔄 กลับไปหน้าโปรไฟล์
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavbarEditProfile />
      <div className="container mx-auto px-4 py-10 flex flex-col items-center pt-20">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Edit profile</h1>
          
          <form onSubmit={handleSubmit}>
            {/* Profile Image Section */}
            <div className="mb-6 flex flex-col items-center">
              <img 
                src={previewImage || "/image/profile1.jpg"} 
                alt="Profile" 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-gray-300 mb-4"
              />
              <label className="cursor-pointer bg-gradient-to-tr from-red-500 to-yellow-500 text-white px-4 py-2 rounded-lg transition-all">
                Upload Image
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">User name</label>
                <input 
                  type="text"
                  name="name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="User name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Phone number</label>
                <input 
                  type="tel"
                  name="phone"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Address</label>
                <textarea 
                  name="address"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  rows="3"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col space-y-4 mt-6">
              <button 
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-tr from-red-500 to-yellow-500 text-white rounded-lg  transition-all"
              >
                Save
              </button>
              <button 
                type="button"
                onClick={handleCancel}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfilePage