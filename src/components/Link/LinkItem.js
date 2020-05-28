import React from 'react';
import { Link } from 'react-router-dom';
import {getDomain} from '../../utils';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const LinkItem = ({ link, index, showCount }) => {
  return (
    <div className="ui container">
      <div className="ui comments">
        <div className="comment">
          <div className="avatar">
            {showCount && <span>{index}.</span>}
          </div>

          <div className="content">
            <a className="author">
              <span>⯅</span>
              {link.description}
            </a>
            <div className="metadata">
              <span className="date">({getDomain(link.url)})</span>
            </div>
            <div className="text">
              {link.votes.length} votes by {link.postedBy.name}{" "}{formatDistanceToNow(link.created)}
                {" | "}
              <Link  to={`/link/${link.id}`}>
                {link.comments.length > 0
                  ? `${link.comments.length} comments`
                  : `discuss`}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LinkItem
