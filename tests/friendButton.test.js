import FriendButton from '../client/src/components/friendButton';
import { render, waitFor, fireEvent } from '@testing-library/react';

test('no request, show button send friend request', async () => {

    const { container } = render(<FriendButton />);
    expect(
        container.querySelector('button').innerHTML
    ).toContain(
        'send friend request'
    );
});



test('request was made, sender Button shows: Cancel friend request ', async () => {

    fetch.mockResolvedValueOnce({
        async json() {
            return {
                data: {
                    id: 6, sender_id: 200, recipient_id: 12, accepted: false
                }
            };
        }
    });

    const { container } = render(<FriendButton otherProfileId="12" />);

    fetch.mockResolvedValueOnce({
        async json() {
            return {
                data: {
                    id: 6, sender_id: 200, recipient_id: 12, accepted: false
                }
            };
        }
    });

    fireEvent.click(
        container.querySelector('button')
    );


    await waitFor(
        () => expect(container.querySelector('button').innerHTML
        ).toContain(
            'Cancel friend request'
        )
    );

});

test('request was made, for recipient the button shows: Accept friend request ', async () => {

    fetch.mockResolvedValueOnce({
        async json() {
            return {
                data: {
                    id: 6, sender_id: 12, recipient_id: 16, accepted: false
                }
            };
        }
    });

    const { container } = render(<FriendButton otherProfileId="12" />);

    fetch.mockResolvedValueOnce({
        async json() {
            return {
                data: {
                    id: 6, sender_id: 12, recipient_id: 16, accepted: false
                }
            };
        }
    });

    fireEvent.click(
        container.querySelector('button')
    );


    await waitFor(
        () => expect(container.querySelector('button').innerHTML
        ).toContain(
            'Accept friend request'
        )
    );

});

test('request was made && accepted, renders button unfriend,', async () => {



    const { container } = render(<FriendButton otherProfileId="12" />);

    fetch.mockResolvedValueOnce({
        async json() {
            return {
                data: {
                    id: 6, sender_id: 12, recipient_id: 100, accepted: true
                }
            };
        }
    });

    fireEvent.click(
        container.querySelector('button')
    );


    await waitFor(
        () => expect(container.querySelector('button').innerHTML
        ).toContain(
            'unfriend'
        )
    );

});
// if (data && data.sender_id == props.otherProfileId) {
//     setButtonText("Accept friend request");

// }
