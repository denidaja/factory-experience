const API_URL = 'http://localhost/api/v1';
const BEARER_TOKEN = '<TOKEN>'

export const fetchSupportRequests = async () => {
    const response = await fetch(`${API_URL}/support-requests?includeDetails=true`, {
        headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`
        },
    });

    if (!response.ok) throw new Error('Failed to fetch support requests. Please try again');

    return response.json();
};

export const createVolunteerRequest = async (supportRequestId: string) => {
    const response = await fetch(`${API_URL}/volunteer-submissions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${BEARER_TOKEN}`
        },
        body: JSON.stringify({support_request_id: supportRequestId}),
    });

    if (!response.ok) return {success: false, message: 'Failed to create volunteer request. Please try again.'};

    return {success: true, message: 'You have successfully signed up for the shift.'};
};