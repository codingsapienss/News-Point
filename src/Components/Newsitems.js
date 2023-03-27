// import { getByTitle } from '@testing-library/react'
import React, { Component } from 'react'

export default class Newsitems extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, publishedAt , source } = this.props

        return (
            <div>
                <div className="card my-4" style={{ width: '18rem' }}>
                    <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{zIndex : 1 , left: "90%"}}>
                        {source}
                       
                    </span>

                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-primary">load more..</a>
                        <p className="card-text"><small className="text-muted"> by {!author? "Unknown" : author} on {publishedAt}</small></p>

                    </div>
                </div>

            </div>
        )
    }
}
