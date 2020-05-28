import React, { useEffect, useState } from 'react'
import { FirebaseContext } from '../../firebase';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import LinkItem from './LinkItem';

const LinkDetail = (props) => {
  const { firebase, user } = React.useContext(FirebaseContext);
  const [link, setLink] = useState(null);
  const [commentText, setCommentText] = useState('');

  const linkId = props.match.params.linkId;
  const linkRef = firebase.db.collection('links').doc(linkId);

  useEffect(() => {
    getLink();
  }, []);

  function getLink() {
    linkRef.get()
      .then(doc => {
        setLink({ ...doc.data(), id: doc.id })
      });
  }

  function handleAddComment() {
    if (!user) {
      props.history.push('/login');
    } else {
      linkRef.get().then(doc => {
        if (doc.exists) {
          const previousComments = doc.data().comments;
          const comment = {
            postedBy: { id: user.uid, name: user.displayName },
            created: Date.now(),
            text: commentText
          }
          const updatedComments = [...previousComments, comment];
          linkRef.update({ comments: updatedComments });
          setLink(prevState => ({
            ...prevState,
            comments: updatedComments
          }))
          setCommentText('');
        }
      })
    }
  }

  return (
    <div className="ui container">
      <div className="ui segment">
        {!link
          ? (<div>Loading...</div>)
          : (<div>
            <LinkItem showCount={false} link={link} />
            <form className="ui reply form">
              <div className="ten wide field">
                <textarea
                  onChange={event => setCommentText(event.target.value)}
                  value={commentText}
                />
              </div>
              <div className="ui labeled submit icon button" onClick={handleAddComment}>
                <i className="icon edit"></i> Add Comment
            </div>
            </form>
            {link.comments.map((comment, index) => (
              <div class="ui comments" key={index}>
                <h3 class="ui dividing header">Comments</h3>
                <div class="comment">
                  <div class="content comment-content">
                    <a class="author">{comment.postedBy.name}</a>
                    <div class="metadata">
                      <span class="date">{formatDistanceToNow(comment.created)}</span>
                    </div>
                    <div class="text">
                      {comment.text}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
      </div>
    </div>
  )
}

export default LinkDetail
