import React, { Component } from "react";
import Newsitems from "./Newsitems";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    capitaliseFn = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    constructor(props) {
        super(props);
        console.log("Hello I am a constructor.");
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        };
        document.title =
            this.props.category === "general"
                ? "NewsPoint - Let's explore what's happeninig around the globe.."
                : `NewsPoint - ${this.capitaliseFn(this.props.category)} `;
    }

    async updateNews() {
        this.props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();

        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        });

        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    // handlePreviousClick = async () => {
    //     console.log("Previous")
    //     this.setState({ page: this.state.page - 1 })
    //     this.updateNews();
    // }

    // handleNextClick = async () => {
    //     console.log("Next")
    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews();
    // }

    fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country
            }&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page + 1
            }&pageSize=${this.props.pageSize}`;

        this.setState({ page: this.state.page + 1 });
        // this.setState({ loading: true })
        let data = await fetch(url);

        let parsedData = await data.json();

        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false,
        });
    };

    render() {
        return (
            <>
                <h1 className="text-center ">
                    {this.props.category === "general"
                        ? "NewsPoint top Headlines"
                        : `NewsPoint top Headlines - ${this.capitaliseFn(
                            this.props.category
                        )}`}
                </h1>
                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container ">
                        <div className="row my-3 ">
                            {this.state.articles.map((element) => {
                                return (
                                    <div className="col md-3 d-flex justify-content-center" key={element.url}>
                                        <Newsitems
                                            title={element.title ? element.title.slice(0, 50) : ""}
                                            description={
                                                element.description
                                                    ? element.description.slice(0, 70)
                                                    : ""
                                            }
                                            imageUrl={element.urlToImage}
                                            newsUrl={element.url}
                                            author={element.author}
                                            publishedAt={new Date(element.publishedAt).toGMTString()}
                                            source={element.source.name}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>Previous</button>

                        <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 15)}

                            className="btn btn-dark" onClick={this.handleNextClick}>Next</button>
                    </div> */}
            </>
        );
    }
}
