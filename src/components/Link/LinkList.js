import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../firebase';
import LinkItem from './LinkItem';
import { LINKS_PER_PAGE } from '../../utils';
import axios from 'axios';

const LinkList = (props) => {
  const { firebase } = useContext(FirebaseContext);
  const [links, setLinks] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const isNewPage = props.location.pathname.includes('new');
  const isTopPage = props.location.pathname.includes('top');
  const page = +props.match.params.page;
  const linksRef = firebase.db.collection('links');

  useEffect(() => {
    const unsubscribe = getLinks();
    return () => unsubscribe();
  }, [isTopPage, page]);

  function getLinks() {
    const hasCursor = Boolean(cursor);
    setLoading(false);

    if (isTopPage) {
      //top page
      return linksRef
        .orderBy('voteCount', 'desc')
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    }
    else if (page === 1) {
      //homepage
      return linksRef
        .orderBy('created', 'desc')
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    }
    else if (hasCursor) {
      return linksRef
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
          setLoading(false);
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
    setLoading(false);
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
    <div className="ui container" style={{ opacity: loading ? '0.25' : '1' }}>
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
            <button className="ui labeled icon button" onClick={visitPreviousPage}>
              Previous
              <i className="left arrow icon"></i>
            </button>
            <button className="ui right labeled icon button" onClick={visitNextPage}>
              <i className="right arrow icon"></i>
                 Next
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default LinkList
