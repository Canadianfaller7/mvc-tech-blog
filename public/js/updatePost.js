const updatePost = async (e) => {
  e.preventDefault();

  const title = document.querySelector('#update-title').value.trim();
  const description = document.querySelector('#update-description').value.trim();

  const postId = e.target.getAttribute('data-id');
  const postAction = e.target.getAttribute('data-func');

  if(postAction === 'update') {
    const updatedPost = {
      'title': title,
      'description': description
    }
    const updateResponse = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedPost),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(updateResponse.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update post');
    }
    return;
  }
  return console.log("An error has occurred!");;
}


const updateDelPost = async (e) => {
  const reqAction = e.target.getAttribute('data-func');

  if(reqAction === 'update') {
    if (e.target.hasAttribute('data-id')) {
      const id = e.target.getAttribute('data-id');
      const idNum = parseInt(id, 10);
      location.href=`/post/${idNum}`;
    }
    return;
  }
  if(reqAction === 'delete') {
    if (e.target.hasAttribute('data-id')) {
      const id = e.target.getAttribute('data-id');
      const idNum = parseInt(id, 10);

      const response = await fetch(`/api/posts/${idNum}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to delete project');
      }
    }
    return;
  }
}

let updateDelBtn = document.querySelector('.posts-containers');

if(updateDelBtn) {
  updateDelBtn.addEventListener('click', updateDelPost);
} 


let updatePostBtn = document.querySelector('.update-post-form');

if(updatePostBtn) {
  updatePostBtn.addEventListener('submit', updatePost);
}