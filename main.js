// Loads posts/posts.json and renders a list of posts on the home page.
async function loadPostList() {
  const listEl = document.getElementById("post-list");

  try {
    const response = await fetch("posts.json");
    if (!response.ok) throw new Error("Could not load posts.json");
    const posts = await response.json();

    // Sort newest first
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    listEl.innerHTML = posts
      .map(
        (post) => `
        <li class="post-item">
          <a href="post.html?slug=${encodeURIComponent(post.slug)}">${post.title}</a>
          <span class="post-date">${formatDate(post.date)}</span>
          <p class="post-excerpt">${post.excerpt}</p>
        </li>
      `
      )
      .join("");
  } catch (err) {
    listEl.innerHTML = `<li class="post-item">Could not load posts. ${err.message}</li>`;
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Run immediately if DOM is ready, or wait for it
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadPostList);
} else {
  loadPostList();
}
