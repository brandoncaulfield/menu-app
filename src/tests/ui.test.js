import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { OrderForm } from '../Components/OrderForm';

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('Sanity Check', () => {
    test('true === true', () => {
        expect(true).toBe(true);
    });
});

describe('Order form renders', () => {
    act(() => {
        render(<OrderForm />, container);
    });
    expect(container.textContent).toBe('Your Username');
});
