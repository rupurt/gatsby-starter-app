import { Link } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'


const SecondPage = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Submitted')
    }

    return (
        <Layout>
            <SEO title="Page two" />
            <h1>Style guide</h1>
            <p>These are the styles for Chainlink</p>
            <Link to="/">Go back to the homepage</Link>

            <section className="container">
                <div className="row">
                    <div className="col-sm-4 col-md-2">
                        <button type="button" className="btn btn-primary">Click me</button>
                    </div>
                    <div className="col-sm-4 col-md-8">
                        <button type="button" className="btn btn-primary">Don't click me</button>
                    </div>
                    <div className="col-sm-4 col-md-2">
                        <button type="button" className="btn btn-primary">Start again</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <button type="button" className="btn btn-primary">Click me</button>
                    </div>
                    <div className="col-md-6">
                        <button type="button" className="btn btn-primary">Don't click me</button>
                    </div>
                </div>
            </section>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <button type="submit" className="btn btn-success">Submit form</button>
            </form>
        </Layout>
    );
}

export default SecondPage
