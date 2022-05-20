// React
import { createContext, useContext, useState } from 'react';

export const userContext = createContext<any>([{}, () => {}]);

export type User = {
    uid: string;
    username: string;
    firstName?: string;
    lastName?: string;
};

export type Diners = { diners: number[] };

export function UserContextProvider({ children }: { children: any }) {
    const [user, setUser] = useState<User>({ uid: '1', username: 'gordon_ramsay305' });
    const [diners, setDiners] = useState<Diners>({ diners: [1, 2] });

    return (
        <userContext.Provider value={{ diners: [diners, setDiners], user: [user, setUser] }}>
            {children}
        </userContext.Provider>
    );
}

export function useUserContext() {
    return useContext(userContext);
}
