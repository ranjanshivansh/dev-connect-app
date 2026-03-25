export async function fetchGithubReadme(url: string): Promise<string> {
  try {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) return "";

    const [, owner, repo] = match;

    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: {
          Accept: "application/vnd.github.v3.raw",
        },
      }
    );

    if (!res.ok) return "";

    return await res.text();
  } catch {
    return "";
  }
}