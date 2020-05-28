import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../firebase';
import LinkItem from './LinkItem';
import { LINKS_PER_PAGE } from '../../utils';
import axios from 'axios';

const LinkList = (props) => {
  const { firebase } = useContext(FirebaseContext);
  const [links, setLinks] = useState([]);
  const [cursor, setCursor] = useState(null);
  const isNewPage = props.location.pathname.includes('new');
  const isTopPage = props.location.pathname.includes('top');
  const page = +props.match.params.page;

  useEffect(() => {
    const unsubscribe = getLinks();
    return () => unsubscribe();
  }, [isTopPage, page]);

  function getLinks() {
    const hasCursor = Boolean(cursor);
    if (isTopPage) {
      //top page
      return firebase.db
        .collection('links')
        .orderBy('voteCount', 'desc')
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    }
    else if (page === 1) {
      //homepage
      return firebase.db
        .collection('links')
        .orderBy('created', 'desc')
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    }
    else if (hasCursor) {
      return firebase.db
        .collection('links')
        .orderBy('created', 'desc')
        .startAfter(cursor.created)
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    }
    else {
      const offset = page * LINKS_PER_PAGE - LINKS_PER_PAGE;
      axios.get(`https://us-central1-dog-news-b10d7.cloudfunctions.net/linksPagination?offset=${offset}`)
        .then(response => {
          const links = response.data;
          const lastLink = links[links.length - 1];
          setLinks(links);
          setCursor(lastLink);
        });
      return () => { }
    }
  }

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    });
    const lastLink = links[links.length - 1];
    setLinks(links);
    setCursor(lastLink);
  }

  function visitPreviousPage() {
    if (page > 1) {
      props.history.push(`/new/${page - 1}`);
    }
  }

  function visitNextPage() {
    if (page <= links.length / LINKS_PER_PAGE) {
      props.history.push(`/new/${page + 1}`)
    }
  }

  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE + 1 : 0;

  return (
    <div className="ui container">
      <div className="ui segment">
        {links.map((link, index) => (
          <LinkItem
            key={link.id}
            showCount={true}
            link={link}
            index={index + pageIndex}
          />
        ))}
        {isNewPage && (
          <>
            <button class="ui labeled icon button" onClick={visitPreviousPage}>
              Previous
              <i class="left arrow icon"></i>
            </button>
            <button class="ui right labeled icon button" onClick={visitNextPage}>
              <i class="right arrow icon"></i>
                 Next
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default LinkList
