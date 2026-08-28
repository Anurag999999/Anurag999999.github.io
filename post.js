// Reads ?slug=... from the URL, loads posts/<slug>.md, and renders it as HTML.
async function loadPost() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const contentEl = document.getElementById("post-content");

  if (!slug) {
    contentEl.innerHTML = "<p>No post specified.</p>";
    return;
  }

  try {
    const response = await fetch(`posts/${slug}.md`);
    if (!response.ok) throw new Error("Post not found");
    const markdown = await response.text();

    // marked.js (loaded via CDN in post.html) converts Markdown to HTML
    contentEl.innerHTML = marked.parse(markdown);
    document.title = slug + " · My Blog";
  } catch (err) {
    contentEl.innerHTML = `<p>Sorry, this post could not be loaded. ${err.message}</p>`;
  }
}

document.addEventListener("DOMContentLoaded", loadPost);
