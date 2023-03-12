import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, redirect } from 'react-router-dom';
import './index.css';
import Modal from './modal'
import axios from 'axios';

function Landing() {
  const { state } = useLocation();
  const { email, username, uid } = state;
  const [showModal, setShowModal] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [posts, setPosts] = useState([{id:'1', name:'How to merge arrays in Javascript', uid:'719'}, {id:'2', name:'How to remove duplicates in Javascript', uid:'719'},  {id:'3', name:'Sorting Arrays', uid:'719'}])
  const navigate = useNavigate();

  useEffect(()=>{
    loadAllPostsOfUser()
  },[])

  useEffect(()=>{
    setShowModal(false)
  }, [refresh])

  const loadAllPostsOfUser = () => {
    axios.get('/api/get/allposts')
          .then(res => setPosts(res.data) )
          .catch((err) => console.log(err))
        }

  const openPost = (post_id) => {
    navigate(`/post`, {
      email: email,
      uid: uid,
      username: username,
      post_id: post_id
    })
  }

  const openAddNewPostModal = () => {
    setShowModal(true)
  }

  const signOutOfSystem = () => {

  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = {title: event.target.title.value,
                  body: event.target.body.value,
                  username: username,
                  uid: uid}

    axios.post('/api/post/posttodb', data)
      .then(response => console.log(response))
      .catch((err) => console.log(err))
      .then(setTimeout(() => setRefresh(!refresh), 700) )
  }

  return (
    <div className="container">
      <div className='title'>
      Hello {username} [{email}]!
      <button onClick={()=>openAddNewPostModal()}>Add New Post</button>
      <button onClick={()=>signOutOfSystem()}>Sign out</button>
      </div>
      <br/>
      <br/>
      <br/>
      <div className="header">
        <span>No</span>
        <span>Blog Title</span>
      </div>
      <br/>
      <br/>
      <Modal show={showModal} handleClose={()=>setShowModal(!showModal)}>
          <form onSubmit={handleSubmit} className='modalContainer'>
            <span>Title of the Blog</span><input type='text'/>
            <span>Subject</span><textarea/>
            <button type='submit'>Submit</button>
            </form>
      </Modal>
      <div className="post_container">
        {posts.map((post, index) => <React.Fragment>
          <span>{index + 1}</span>
          <span className="post_title" onClick={()=>openPost(post.id)}>{post.name}</span>
        </React.Fragment>)}
      </div>
    </div>
  );
}

export default Landing;
