"use client"
import { Button } from '@/app/components/common/Button'
import Input from '@/app/components/common/Input'
import NotLoggedIn from '@/app/components/common/NotLoggedIn'
import { Select } from '@/app/components/common/Select'
import { Spinner } from '@/app/components/common/Spinner'
import Wallet from '@/app/components/common/Wallet'
import { ProfileImageUploader } from '@/app/components/ProfileImageUploader'
import { BASE_URL } from '@/app/config'
import { getUserProfile, updateProfile, uploadImage } from '@/app/services/auth.service'
import { useAuthStore } from '@/app/store/authStore'
import { countries } from '@/app/utils/countries'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const ProfilePage = () => {
    const { isAuthenticated } = useAuthStore();
    
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState('');
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        country: "",
    });

    const handleImageChange = async (file: File | null, previewUrl: string | null) => {
        setProfileImage(previewUrl);
        setLoading(true);
        try {
            const response = await uploadImage(file!);
            const  url = BASE_URL + response.url;
            setProfileImage(url);
        } catch (err: unknown) {
            setProfileImage('');
            toast.error(
                err instanceof Error
                    ? err.message || "Failed to upload image"
                    : "Failed to upload image"
            );
        } finally {
            setLoading(false);
        }
    };

    const validate = () => {
        const newErrors = { name: "", email: "", country: "" };
        let isValid = true;

        if (!name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Invalid email format";
            isValid = false;
        }

        if (!country) {
            newErrors.country = "Please select a country";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSave = async () => {
        if (!validate()) return;
        try {
            setLoading(true);
            const  data: { name: string, email: string, profileImage?: string, country: string } = {
                name,
                email,
                country
            }
            if (profileImage) {
                data.profileImage = profileImage
            }
            const  response = await updateProfile(data);
            if (response) {
                setLoading(false);
                setEdit(false);
            }
            toast.success("Profile updated successfully!");
        } catch (err: unknown) {
            toast.error(
                err instanceof Error
                    ? err.message || "Failed to update profile"
                    : "Failed to update profile"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getProfile = async () => {
            try {
                setLoading(true);
                const data = await getUserProfile();
                const  { kycInfo } = data;
                if (kycInfo.email) setEmail(kycInfo.email);
                if (kycInfo.name) setName(kycInfo.name);
                if (kycInfo.profileImage) setProfileImage(kycInfo.profileImage);
                if (kycInfo.country) setCountry(kycInfo.country);
            } catch (err: unknown) {
                toast.error(
                    err instanceof Error
                        ? err.message || "Failed to fetch profile"
                        : "Failed to fetch profile"
                );
            } finally {
                setLoading(false);
            }
        };
        if(isAuthenticated){
          getProfile();
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <main className="w-full min-h-screen bg-gray-50 relative overflow-hidden px-4 pb-24">
                <div className="flex items-center gap-4 py-5 sticky top-0 bg-gray-50 z-10">
                    <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition">
                        <ChevronLeft className="text-white" />
                    </button>
                    <h5 className="text-xl font-semibold text-gray-900">
                        Profile
                    </h5>
                </div>
                <div className="w-full h-[calc(100vh-200px)] flex flex-col items-center justify-center">
                    <NotLoggedIn />
                    <br />
                    <Wallet />
                </div>
            </main>
        )
    }
    return (
        <main className="w-full min-h-screen relative overflow-hidden pb-12">
            <section className='w-full px-4'>
                <br />
                <div className='flex items-center justify-start gap-3'>
                    <button
                        onClick={() => router.back()}
                        className="w-10 h-10 rounded-full bg-dark-50 flex items-center justify-center hover:bg-primary-100 transition"
                    >
                        <ChevronLeft className="text-white" />
                    </button>
                    <h5 className={`text-xl font-normal text-black`}>
                        Profile
                    </h5>
                </div>
            </section>

            {loading ? (
                <div className='flex items-center justify-center'>
                    <Spinner />
                </div>
            ) : ""}

            <section className='w-full h-auto mt-8'>
                <ProfileImageUploader
                    value={profileImage || ""}
                    onChange={handleImageChange}
                />
                <div className='w-full flex flex-col gap-4 p-4'>
                    <Input
                        value={name}
                        onChange={(v) => setName(v)}
                        label="Name"
                        placeholder="Enter Your Name"
                        disabled={!edit || loading}
                        error={errors.name}
                    />
                    <Input
                        value={email}
                        onChange={(v) => setEmail(v)}
                        label="Email"
                        placeholder="Enter Your Email"
                        disabled={!edit || loading}
                        error={errors.email}
                    />
                    <Select
                        label="Select Country"
                        options={countries}
                        value={country}
                        onChange={setCountry}
                        placeholder="Choose your country"
                        search={true}
                        disabled={!edit || loading}
                        error={errors.country}
                    />
                </div>

                <section className="w-full z-50 lg:max-w-3xl mx-auto flex items-center justify-center fixed bottom-2 left-0 right-0 p-2">
                    {edit ? (
                        <Button variant='dark' loading={loading} size='full' onClick={handleSave}>
                            Save Changes
                        </Button>
                    ) : (
                        <Button variant='dark' size='full' onClick={() => setEdit(true)}>
                            Edit Profile
                        </Button>
                    )}
                </section>
            </section>
        </main>
    )
}

export default ProfilePage;
