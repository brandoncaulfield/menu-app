const courseCountChecker = require('../Helper/Rules');

describe('Sanity Check', () => {
    test('true === true', () => {
        expect(true).toBe(true);
    });
});

describe('Rules', () => {
    test('Course count checker', () => {
        const data = { starters: 'Soup', mains: 'Steak', desserts: '' };
        const res = courseCountChecker(data);
        expect(res).toBe(false);
    });
});
