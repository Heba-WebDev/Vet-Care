export type payload = {
    id: string;
    job_title: string;
    permission_type: string;
}

export type SignToken = (payload: payload, duration?: string) => Promise<string | null>;
