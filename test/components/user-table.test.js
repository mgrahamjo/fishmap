import userTable from 'components/user-table';
import api from 'util/api';

describe('userTable', () => {

    it('should get the user list', done => {

        // You can prevent an actual HTTP request by spying on the method
        // and returning a stubbed response.
        spyOn(api, 'get').and.returnValue(Promise.resolve([{name: 'barney'}]));

        const component = userTable();

        // The API request is asynchronous, so we need to pop
        // our expectation on the end of the event queue.
        setTimeout(() => {

            expect(component._el.querySelectorAll('tbody td')[1].textContent).toBe('barney');

            done();

        });

    });

});
