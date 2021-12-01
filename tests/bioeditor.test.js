import BioEditor from '../client/src/components/bioeditor.js';
import { render, waitFor, fireEvent } from '@testing-library/react';

test('no bio is passed to it, an "Add" button is rendered', async () => {

    const { container } = render(<BioEditor bio={null} />);
    expect(
        container.querySelector('button').innerHTML
    ).toContain(
        'Add your bio'
    );
});

test('When a bio is passed to it, an "Edit" button is rendered', async () => {

    const { container } = render(<BioEditor bio={"some text"} />);
    expect(
        container.querySelector('button').innerHTML
    ).toContain(
        'Edit bio'
    );
});

test('Clicking either the "Add" or "Edit" button causes a textarea and a "Save" button', async () => {

    const { container } = render(<BioEditor />);

    fireEvent.click(
        container.querySelector('button')
    );

    expect(
        container.querySelector('button').innerHTML
    ).toContain(
        'Save'
    );
});



test('function that was passed as a prop to the component gets called', async () => {


    fetch.mockResolvedValueOnce({
        async json() {
            return {
                data: {
                    bio: "some string"
                }
            };
        }
    });

    const updateProfileBioMock = jest.fn();

    const { container } = render(<BioEditor updateProfileBio={updateProfileBioMock} />);

    fireEvent.click(
        container.querySelector('button')
    );

    fireEvent.click(
        container.querySelector('button')
    );


    await waitFor(
        () => expect(container.querySelector('button').innerHTML
        ).toContain(
            'Add your bio'
        )
    );

    expect(
        expect(updateProfileBioMock).toHaveBeenCalledTimes(1)
    ).toBe(

    );
});
