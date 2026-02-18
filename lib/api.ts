export const api = {
  get: (url: string) =>
    fetch(`http://localhost:5000${url}`, {
      credentials: "include",
    }).then(r => r.json()),

  post: (url: string, body: any) =>
    fetch(`http://localhost:5000${url}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then(r => r.json()),
};
