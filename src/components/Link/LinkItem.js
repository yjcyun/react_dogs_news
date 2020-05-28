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

  return (
    <div className="ui comments">
      <div className="comment">
        <div className="avatar">
          {showCount && <span>{index}.
          <span onClick={handleVote} className="vote-btn">⯅</span></span>}
        </div>

        <div className="content">
          <a className="author">
            {link.description}
          </a>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(LinkItem);
