const createPost = async (e) => {

  e.preventDefault();

  const title = document.querySelector('#newpost-title').value.trim();
  const description = document.querySelector('#newpost-body').value.trim();

  if (
    title &&
    description
  ) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);

    if(response.ok) {
      document.location.replace('/');
    } else {
      alert('New post not created!')
    }
  }
}

// document.querySelector('#create-post')
//   .addEventListener('click', (e) => { location.href='/newPost' });

document.querySelector('.create-a-post-form')
  .addEventListener('submit', createPost);
