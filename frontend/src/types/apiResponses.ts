export interface BackendErrorResponse {
    status: number;
    error: string;
    message: string;
    timestamp: string;
}

// You can also add other global API types here later!
// For example, what an Event or User looks like:
export interface UserProfile {
    userId: string;
    fullName: string;
    email: string;
    role: 'STUDENT' | 'ORGANIZER' | 'ADMIN';
}