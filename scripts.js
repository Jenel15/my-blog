// Sample data
let posts = [
    { id: 1, title: "First Post", content: "The Benefits of Programming", category: "Benefit", tags: ["tag1", "tag2"], comments: [] },
    { id: 2, title: "Second Post", content: "Types of Programming Language", category: "Type", tags: ["tag3", "tag4"], comments: [] },
    { id: 3, title: "Third Post", content: "The Difference of Html and Css", category: "Difference", tags: ["tag5", "tag6"], comments: [] }
];

// Function to display posts
function displayPosts() {
    const blogPosts = document.getElementById("blog-posts");
    blogPosts.innerHTML = "";

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <div class="post-content">
                <p>${post.content}</p>
                <p>Category: <input type="text" id="category-${post.id}" value="${post.category}" placeholder="Category"></p>
                <p>Tags: <input type="text" id="tags-${post.id}" value="${post.tags.join(', ')}" placeholder="Tags (comma separated)"></p>
            </div>
            <div class="post-actions">
                <button onclick="editPost(${post.id})">Edit</button>
                <button onclick="deletePost(${post.id})">Delete</button>
            </div>
            <hr>
            <h3>Comments:</h3>
            <div id="comments-${post.id}"></div>
            <input type="text" id="comment-${post.id}" placeholder="Add a comment">
            <button onclick="addComment(${post.id})">Add Comment</button>
        `;

        post.comments.forEach(comment => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");
            commentElement.textContent = comment;
            postElement.querySelector(`#comments-${post.id}`).appendChild(commentElement);
        });

        blogPosts.appendChild(postElement);
    });
}

// Function to add a new post
function addPost(title, content, category, tags) {
    const id = posts.length + 1;
    posts.push({ id, title, content, category, tags: tags.split(",").map(tag => tag.trim()), comments: [] });
    displayPosts();
}

// Function to prompt user for new post details
function addPostPrompt() {
    const newTitle = prompt("Enter the title of the new post:");
    const newContent = prompt("Enter the content of the new post:");
    const newCategory = prompt("Enter the category of the new post:");
    const newTags = prompt("Enter the tags of the new post (comma separated):");
    if (newTitle && newContent && newCategory && newTags) {
        addPost(newTitle, newContent, newCategory, newTags);
    }
}

// Function to delete a post
function deletePost(id) {
    posts = posts.filter(post => post.id !== id);
    displayPosts();
}

// Function to edit a post
function editPost(id) {
    const post = posts.find(post => post.id === id);
    const newTitle = prompt("Enter the new title:", post.title);
    const newContent = prompt("Enter the new content:", post.content);
    const newCategory = document.getElementById(`category-${id}`).value;
    const newTags = document.getElementById(`tags-${id}`).value;
    
    if (newTitle && newContent && newCategory && newTags) {
        post.title = newTitle;
        post.content = newContent;
        post.category = newCategory;
        post.tags = newTags.split(",").map(tag => tag.trim());
        displayPosts();
    }
}

// Function to add a comment to a post
function addComment(postId) {
    const commentInput = document.getElementById(`comment-${postId}`);
    const comment = commentInput.value.trim();
    if (comment !== "") {
        const post = posts.find(post => post.id === postId);
        post.comments.push(comment);
        displayPosts();
        commentInput.value = "";
    }
}

// Initial display of posts
displayPosts();
