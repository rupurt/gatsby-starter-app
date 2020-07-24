import { Link } from "gatsby";
import React from "react";
import Image from "../components/image";
import Layout from "../components/layout";
import SEO from "../components/seo";


const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Gatsby Starter!</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link><br />
    <Link to="/style-guide/">Style guide</Link> <br />
  </Layout>
);

export default IndexPage;
