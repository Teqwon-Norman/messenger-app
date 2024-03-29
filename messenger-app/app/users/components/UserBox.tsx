'use client';

import { FC, useState, useCallback } from 'react';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import Avatar from '../../components/desktop-view/Avatar';
import LoadingModal from '../../components/LoadingModal';

interface UserBoxProps {
    data: User;
}

const UserBox: FC<UserBoxProps> = ({
    data
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    const handleClick = useCallback(() => {
        setIsLoading(true);

        axios.post('/api/conversations', {
            userId: data.id
        }).then((resp) => {
            router.push(`/conversations/${resp.data.id}`);
        }).finally(() => setIsLoading(false));
    }, [data, router]);

    return (
        <>
            {isLoading && (<LoadingModal />)}
            <div
                onClick={handleClick}
                className='
                    w-full 
                    relative 
                    flex 
                    items-center 
                    space-x-3 
                    bg-white p-3 
                    hover:bg-neutral-100 
                    cursor-pointer'
            >
                <Avatar user={data} />
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium text-gray-900">
                            { data.name }
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserBox;