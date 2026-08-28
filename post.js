// Reads ?slug=... from the URL, loads <slug>.md, and renders it as HTML.
async function loadPost() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const contentEl = document.getElementById("post-content");

  if (!slug) {
    contentEl.innerHTML = "<p>No post specified.</p>";
    return;
  }

  try {
    const response = await fetch(`${slug}.md`);
    if (!response.ok) throw new Error("Post not found");
    const markdown = await response.text();

    // marked.js (loaded via CDN in post.html) converts Markdown to HTML
    contentEl.innerHTML = marked.parse(markdown);
    document.title = slug + " · My Blog";
  } catch (err) {
    contentEl.innerHTML = `<p>Sorry, this post could not be loaded. ${err.message}</p>`;
  }
}

// Run immediately if DOM is ready, or wait for it
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadPost);
} else {
  loadPost();
}
