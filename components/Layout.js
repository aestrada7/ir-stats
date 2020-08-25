import Router from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

class Layout extends React.Component {
    render() {
        const { children, title, backButton } = this.props;
        return (
            <React.Fragment>
                <Head>
                    <title>{title}</title>
                    <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap" rel="stylesheet"></link>
                </Head>
                <div className="header">
                    <div className="logo">
                        <Link href="/">
                            <a><img src="/images/logo.png"></img></a>
                        </Link>
                    </div>
                    <div className="back">
                        {backButton && <button className="back-button" alt="back" onClick={() => Router.back()}></button>}
                    </div>
                    <div className="page-title">
                        {title}
                    </div>
                </div>
                <div className="content"></div>
                <div className="ir-stats">{children}</div>
            </React.Fragment>
        )
    }
}

export default Layout;