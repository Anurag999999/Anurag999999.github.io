// Loads a single post by slug and renders it
async function loadPost() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  if (!slug) {
    document.getElementById("post-content").innerHTML = "<p>Post not found.</p>";
    return;
  }

  try {
    const response = await fetch(`posts/${slug}.md`);
    if (!response.ok) throw new Error("Post not found");
    const markdown = await response.text();
    
    document.getElementById("post-content").innerHTML = marked.parse(markdown);
  } catch (err) {
    document.getElementById("post-content").innerHTML = `<p>Error loading post: ${err.message}</p>`;
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadPost);
} else {
  loadPost();
}