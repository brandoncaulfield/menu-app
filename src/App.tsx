// React
import React from 'react';
import { render } from 'react-dom';

// Context
import { UserContextProvider } from './Context/UserContext';

// react-query
import { QueryClient, QueryClientProvider } from 'react-query';

// components
import { OrderForm } from './Components/OrderForm';

const queryClient = new QueryClient();

function App() {
    return (
        <UserContextProvider>
            <QueryClientProvider client={queryClient}>
                <h1>Menu 🍴</h1>
                <OrderForm />
            </QueryClientProvider>
        </UserContextProvider>
    );
}

render(<App />, document.getElementById('root'));
