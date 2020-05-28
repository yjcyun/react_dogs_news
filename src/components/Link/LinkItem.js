import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getDomain } from '../../utils';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { FirebaseContext } from '../../firebase';

const LinkItem = ({ link, index, showCount, history }) => {
  const { firebase, user } = React.useContext(FirebaseContext);

  function handleVote() {
    if (!user) {
      history.push('/login');
    } else {
      const voteRef = firebase.db.collection('links').doc(link.id);

      voteRef.get().then(doc => {
        if (doc.exists) {
          const previousVotes = doc.data().votes;
          const vote = { votedBy: { id: user.uid, name: user.displayName } };
          const updatedVotes = [...previousVotes, vote];
          voteRef.update({ votes: updatedVotes })
        }
      })
    }
  }

  function handleDeleteLink() {
    const linkRef = firebase.db.collection('links').doc(link.id);
    linkRef.delete()
      .then(() => {
        console.log(`Document with ID ${link.id} deleted`)
      })
      .catch(err => {
        console.error('Error deleting document:', err)
      });
  }

  const postedByAuthUser = user && user.uid === link.postedBy.id;

  return (
    <div className="ui comments">
      <div className="comment">
        <div className="avatar">
          {showCount && <span>{index}.
          </span>}
        </div>

        <div className="content">
          <span className="author">
            <span onClick={handleVote} className="vote-btn">⯅</span>
            {link.description}
          </span>
          <div className="metadata">
            <span className="date">({getDomain(link.url)})</span>
          </div>
          <div className="text">
            {link.votes.length} votes by {link.postedBy.name}{" "}{formatDistanceToNow(link.created)}
            {" | "}
            <Link to={`/link/${link.id}`}>
              {link.comments.length > 0
                ? `${link.comments.length} comments`
                : `discuss`}
            </Link>
            {postedByAuthUser && (
              <>
                {" | "}
                <span className="delete-btn"onClick={handleDeleteLink}>delete</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(LinkItem);
