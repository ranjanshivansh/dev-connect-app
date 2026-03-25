export async function fetchRepoFiles(repoUrl: string) {
  try {
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) return [];

    const [, owner, repoRaw] = match;
    const repo = repoRaw.replace(".git", "");

   const repoRes = await fetch(
  `https://api.github.com/repos/${owner}/${repo}`,
  {
    headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    }
  }
);
    const repoData = await repoRes.json();

    const branch = repoData.default_branch; 

    const res = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
                {
                    headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                    Accept: "application/vnd.github+json",
                    },
                }
                );


    const data = await res.json();
    console.log("TREE RESPONSE:", data);

    console.log("FILES FOUND:", data.tree?.length); 

    const allowed = [".js", ".ts", ".jsx", ".tsx",".py",".java"];

    return (
      data.tree
        ?.filter((f: any) =>
          allowed.some(ext => f.path.endsWith(ext))
        )
        .slice(0, 5) || []
    );

  } catch (err) {
    console.log("FETCH FILES ERROR", err);
    return [];
  }
}
export async function fetchFileContnet(
  owner: string,
  repo: string,
  path: string,
  branch: string
) {
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`
    );

    if (!res.ok) return "";

    const text = await res.text();
    return text.slice(0, 10000);
  } catch {
    return "";
  }
}

export async function getRepoCode(url: string): Promise<string> {
  try {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) return "";

    const [, owner, repoRaw] = match;
    const repo = repoRaw.replace(".git", "");

    // 🔥 1. Get default branch
    const repoRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    const repoData = await repoRes.json();
    const branch = repoData.default_branch;

   
    const files = await fetchRepoFiles(url);

    let code = "";

    
    for (const file of files) {
      const content = await fetchFileContnet(
        owner,
        repo,
        file.path,
        branch 
      );
      code += content + "\n";
    }

    console.log("FINAL CODE LENGTH:", code.length);

    return code.slice(0, 20000);
  } catch (err) {
    console.log("GET CODE ERROR:", err);
    return "";
  }
}