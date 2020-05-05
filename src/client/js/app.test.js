//mport '@babel/polyfill';
import { submitTrip } from "./app.js";


//Main Function
describe('Test, the function submitTripshould be a function', () => {
    test('It should return true', async () => {
        expect(typeof submitTrip).toBe("function");
    });
});
