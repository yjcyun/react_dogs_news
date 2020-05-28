import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../firebase';
import LinkItem from './LinkItem';

const LinkList = (props) => {
  const { firebase } = useContext(FirebaseContext);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    getLinks();
  }, []);

  function getLinks() {
    firebase.db.collection('links').onSnapshot(handleSnapshot)
  }

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    });
    setLinks(links);
  }

  return (
    <div className="ui container">
    <div className="ui segment">
      {links.map((link, index) => (
          <LinkItem
            key={link.id}
            showCount={true}
            link={link}
            index={index + 1}
          />
      ))}
    </div>
    </div>
  )
}

export default LinkList
