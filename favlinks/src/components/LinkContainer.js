import { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkName: '',
      url: ''
    }
  
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  handleChange = event => {
    if(event.target.id === "link") {
      this.setState({ linkName: event.target.value }); 
    } else {
      this.setState({ url: event.target.value });
    }
  }

  onFormSubmit = event => {
    event.preventDefault();
    let newFavLink = { linkName: this.state.linkName, url: this.state.url };
    this.setState({ linkName: '', url: '' }); 
    this.props.addNew(newFavLink);
  }

  render() {
    return (
      <form onSubmit={(event) => this.onFormSubmit(event)}>
        <label htmlFor="link">Link Name : </label>
        <input type="text" id="link" value={this.state.linkName} onChange={(event) => this.handleChange(event)} />
        <label htmlFor="url">URL : </label>
        <input type="text" id="url" value={this.state.url} onChange={(event) => this.handleChange(event)} />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => this.setState({ linkName: '', url: '' })}>Reset</button>
      </form>
    )
  }
}

class LinkContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    }
  
    this.addNewLink = this.addNewLink.bind(this);
    this.removeLink = this.removeLink.bind(this);
  }

  addNewLink = link => {
    let newLinks = [...this.state.links, link];
    this.setState({ links: newLinks });
  }

  removeLink = index => {
    let newLinks = [...this.state.links];
    newLinks.splice(index, 1);
    this.setState({ links: newLinks });
  }

  render() {
    return (
      <div>
        <h1>My Favorite Links</h1>
        <LinkList links={this.state.links} removeLink={this.removeLink} />
        <Form addNew={this.addNewLink} />
      </div>
    )
  }
}

class LinkList extends Component {
  render() {
    const linkItems = this.props.links.map((link, index) => {
      return (
        <Link key={index} link={link} index={index} removeLink={this.props.removeLink} />
      )
    })

    return (
      <ul>
        {linkItems}
      </ul>
    )
  }
}

class Link extends Component {
  render() {
    const { link, index, removeLink } = this.props;
    return (
      <li>
        <a href={link.url}>{link.linkName}</a>
        <button onClick={() => removeLink(index)}>Remove</button>
      </li>
    )
  }
}

export default LinkContainer;




