const API_URL = 'http://localhost/api/v1';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIwQGV4YW1wbGUuY29tIiwiaWQiOiJkMmExNjI5OC03ZGQxLTRhNjItYjEzZC1iNGQ2YWQ5MjhmOTQiLCJyb2xlcyI6IjEiLCJpYXQiOjE3MDk2MjIwMTUsImV4cCI6MTcxMDIyNjgxNX0.mMlFdd_dBGWPoCHAfFhGvD4ICoenm6WNSoH9GIgjLNA'

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