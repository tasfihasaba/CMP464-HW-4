import React, { useState } from 'react';
import Table from './Table';

const LinkTable = () => {
  const [links, setLinks] = useState([]);

  const addLink = (name, URL) => {
    const newLinks = [...links, { name, URL }];
    setLinks(newLinks);
  };

  const removeLink = (index) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };

  return (
    <div>
      <h1>Link Table</h1>
      <Table linkData={links} removeLink={removeLink} />
      <AddLinkForm addLink={addLink} />
    </div>
  );
};

const AddLinkForm = (props) => {
  const [name, setName] = useState('');
  const [URL, setURL] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addLink(name, URL);
    setName('');
    setURL('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />
      <label htmlFor="url">URL:</label>
      <input type="text" id="url" value={URL} onChange={(event) => setURL(event.target.value)} />
      <button type="submit">Add Link</button>
    </form>
  );
};

export default LinkTable;




