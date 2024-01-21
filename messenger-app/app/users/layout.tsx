import { ReactNode } from 'react';

import Sidebar from '../components/Sidebar';

async function UsersLayout({ children }: { children: ReactNode }) {
    return (
        <Sidebar>
            <div className="h-full">
                {children}
            </div>
        </Sidebar>
    );
};

export default UsersLayout;