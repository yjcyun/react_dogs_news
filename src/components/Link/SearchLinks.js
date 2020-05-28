import React, { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../../firebase';
import LinkItem from './LinkItem';

const SearchLinks = () => {
  const { firebase } = useContext(FirebaseContext);
  const [filter, setFilter] = useState('');
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);

  useEffect(() => {
    getInitialLinks();
  }, []);

  function getInitialLinks() {
    firebase.db.collection('links').get()
      .then(snapshot => {
        const links = snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() }
        });
        setLinks(links);
      })

  };

  function handleSearch(event) {
    event.preventDefault();
    const query = filter.toLowerCase();
    const matchedLinks = links.filter(link => {
      return (
        link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.postedBy.name.toLowerCase().includes(query)
      );
    });
    setFilteredLinks(matchedLinks);
  };

  return (
    <div className="ui container">
      <div className="ui segment">
        <form className="ui form" onSubmit={handleSearch}>
          <div className="inline fields">
            <div className="ten wide field">
              <label>Search</label>
              <input onChange={event => setFilter(event.target.value)} />
              <button className="ui button" type="submit">OK</button>
            </div>
          </div>
        </form>
        {filteredLinks.map((filteredLink, index) => (
          <LinkItem
            key={filteredLink.id}
            showCount={false}
            link={filteredLink}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default SearchLinks
