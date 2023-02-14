
const commentOnPost = async (e) => {
    
  e.stopPropagation();
  let postComment = e.target;
  let postCommentId = postComment.getAttribute('data-id');
  let postCommentFunc = postComment.getAttribute('data-func');
  let commentForm = document.querySelector(".post-comment-form-" + postCommentId);
  let commentTextarea = document.querySelector(".new-comment-" + postCommentId);


  if(postCommentFunc === 'add-comment') {
    commentForm.setAttribute("style", "display:block");
    e.target.innerHTML = "- CANCEL";
    postComment.setAttribute("data-func", "cancel");
    commentTextarea.focus();
    return;
  }

  if(postCommentFunc === 'cancel') {
    commentForm.setAttribute("style", "display:none");
    e.target.innerHTML = "+ ADD COMMENT";
    postComment.setAttribute("data-func", "add-comment");
    return;
  }

  if(postCommentFunc === 'submit-comment') {
    e.preventDefault();
    let comment = commentTextarea.value;

    const newComment = {
      'comment': comment,
      'post_id': postCommentId
    }

    const saveResponse = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(saveResponse.ok) {
      const anchoredPage = `/#post-${postCommentId}`;
      document.location.reload();
      document.location.replace(anchoredPage);
    } else {
      alert('Failed to save comment');
    }
  }
  return;
}

document.querySelector('.home-posts').addEventListener('click', commentOnPost); 


