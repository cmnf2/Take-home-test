"use strict";

export function fetchScenes(retries:number = 1): Promise<any> {
  return fetch("https://img.pixton.com/data/comic-scene-group-data.json").then((res) => {
  
    if (res.ok) {
      return res.json();
    }
    if (retries !== 0) {
      return fetchScenes(0);
    }

    throw new Error(res.status?.toString());
  });
}