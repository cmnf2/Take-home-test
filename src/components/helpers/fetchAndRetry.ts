"use strict";

interface FetchAndRetryProps {
  url: string;
  returnText: boolean;
  retries: number;
}

export interface ReturnJson {
  data: {
    [key: string]: any;
  }
}

export function fetchAndRetry({
  retries,
  returnText,
  url
}:FetchAndRetryProps): Promise<ReturnJson> {
  return fetch(`${url}`).then((res) => {
  
    if (res.ok) {
      return returnText ? res.text() : res.json();
    }
    if (retries !== 0) {
      return fetchAndRetry({url: url, returnText: returnText, retries: 0});
    }

    throw new Error(res.status?.toString());
  });
}