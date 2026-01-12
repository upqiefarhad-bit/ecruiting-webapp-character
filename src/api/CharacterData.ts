const BASE_URL = 'https://recruiting.verylongdomaintotestwith.ca/api/maketest/character';

export const saveCharacter = async (data: any) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            throw new Error(`Failed to save: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Save Error:", error);
        throw error;
    }
};

export const getCharacter = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const result = await response.json();
        return result.body
    } catch (error) {
        console.error("Fetch Error:", error);
        throw error;
    }
};