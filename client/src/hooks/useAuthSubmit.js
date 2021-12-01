
import { useState } from 'react';

export default function useAuthSubmit(url, values) {
    const [error, setError] = useState();

    const submit = () => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(
            response => response.json()
        ).then(
            data => data.success ? location.replace('/') : setError(true)
        );
    }

    return [submit, error];
}
