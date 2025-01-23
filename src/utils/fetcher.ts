import { GetFetchProps } from "./types";

const responseHandling = async (response: Response) => {
    const { status, statusText, url } = response;
  
    // Handle 200 for no body response
    if (status !== 200) {
        throw Error(`${url} Status: ${status} (${statusText})`);
    }
  
    const data = await response.json();
    return data;
  };

export const getFetch = async ({ path }: GetFetchProps) => {
  const response = await fetch(path, {
    method: 'GET',
  });

  return responseHandling(response);
};

// PUT, POST, DELETE, etc. can be added here