import { Choices } from '../Components/OrderForm';

export const coursesCountChecker = (choices) => {
    // Each person must have at least two courses, one of which must be a main
    try {
        let choiceCount = 0;
        const keys = Object.keys(choices);
        keys.forEach((key) => {
            if (choices[key].length > 0) {
                choiceCount += 1;
            }
        });

        if (choiceCount >= 2) {
            return false;
        } else {
            return true;
        }
    } catch (err) {
        throw err;
    }
};

// module.exports = coursesCountChecker;
