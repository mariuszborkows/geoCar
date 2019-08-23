export const apiCall = async (method: string, url: string, data?: string) => {
  const response = await fetch(url, {});
  if (response.ok) {
    return response.json();
  }
};

const put = (url: string, data?: any) => apiCall('PUT', url, data);

const post = (url: string, data?: any) => apiCall('POST', url, data);

const get = (url: string) => apiCall('GET', url);

export const api = { put, post, get };
