import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './post.css';
import './index.css';
import axios from 'axios';

function Post() {
  const { state } = useLocation();
  const { email, username, uid, post_id } = state || {username: 'Tuts+ Envato', email: 'tuts@envato.com', uid: '123', post_id: 1}
  const [post, setPost] = useState({likes:2, post_title:'How to merge an array', post_body:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac lorem et dui hendrerit viverra eu ut ligula. Phasellus nec nibh ornare, tempus ante non, maximus dui. Aliquam elementum efficitur sodales. Aliquam suscipit, lectus ut congue egestas, ipsum augue volutpat eros, vulputate posuere mi neque finibus massa. Integer ut gravida arcu. Integer nec arcu tortor. Duis pretium, augue non euismod consequat, augue diam dictum nunc, a fringilla felis lacus porta est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent libero mauris, laoreet in nisi eget, mollis porta justo. Phasellus cursus vulputate euismod. Nulla diam arcu, commodo sed rutrum et, sagittis non dui. Proin pellentesque facilisis quam vitae aliquet. Nunc posuere orci sed velit cursus interdum sed sed eros. Fusce sed ante in ex semper volutpat sed at quam. Phasellus egestas tempus cursus. Vivamus suscipit imperdiet ipsum sit amet egestas. In hac habitasse platea dictumst. Integer vitae mi ac felis aliquet aliquam. Ut nec aliquam metus. Proin a augue a ante tempus dictum vitae a diam. Suspendisse eget ligula lacus. Nulla tempor justo vitae ultrices bibendum. Aenean lectus neque, laoreet ut dictum consequat, feugiat quis ligula.', post_author: 'Tuts Envato'})

  useEffect(()=>{
    if(post_id && uid) {
      axios.get('/api/get/post',
        {params: {post_id: post_id}} )
        .then(res => res.data.length !== 0
                ?   setPost({likes: res.data[0].likes,
                        like_user_ids: res.data[0].like_user_id,
                        post_title: res.data[0].title,
                        post_body: res.data[0].body,
                        post_author: res.data[0].author
                      })
                 : null
              )
        .catch((err) => console.log(err) )
    }
  }, [post_id])

  const signOutOfSystem = () => {

  }
  
  return (
    <div className="container">
       <div className='title'>
      Hello {username} [{email}]!

      {!uid && <div>Seems like you are not logged in!</div>}
      <button onClick={()=>signOutOfSystem()}>Sign out</button>
      </div>
      <br/>
      <div>
        {post.post_title} by {post.post_author}
      </div>
      <br/>
      <br/>
      <section>
        {post.post_body}
      </section>
      <br/>
      <br/>
      <aside>
        {post.likes > 0 ? <div>Liked by {post.likes} readers</div>: null} 
      </aside>
    </div>
  );
}

export default Post;
