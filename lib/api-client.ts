import { supabase } from './supabase';

/**
 * Get authorization header for API requests
 * Returns null if user is not authenticated
 */
export async function getAuthHeader(): Promise<string | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.access_token ? `Bearer ${session.access_token}` : null;
}

/**
 * Make authenticated API request
 * Automatically includes auth token if user is logged in
 */
export async function authenticatedFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const authHeader = await getAuthHeader();
  const headers = new Headers(options.headers);

  if (authHeader) {
    headers.set('Authorization', authHeader);
  }

  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(url, {
    ...options,
    headers,
  });
}

