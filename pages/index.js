import Link from 'next/link';

import Layout from '../components/Layout';

class Index extends React.Component {
    render() {
        return (
            <Layout title="IR Stats">
                <div className="main-menu">
                    <Link href="/all-challenge">
                        <button className="main-link">
                            <span>All Positions Challenge</span>
                        </button>
                    </Link>
                    <Link href="/season/career">
                        <button className="main-link">
                            <span>Career Stats</span>
                        </button>
                    </Link>
                    <Link href="/season/2020/3">
                        <button className="main-link">
                            <span>2020 Season 3</span>
                        </button>
                    </Link>
                    <Link href="/season/2020/2">
                        <button className="main-link">
                            <span>2020 Season 2</span>
                        </button>
                    </Link>
                    <Link href="/season/2019/3">
                        <button className="main-link">
                            <span>2019 Season 3</span>
                        </button>
                    </Link>
                    <Link href="/season/2018/4">
                        <button className="main-link">
                            <span>2018 Season 4</span>
                        </button>
                    </Link>
                    <Link href="/season/2015/3">
                        <button className="main-link">
                            <span>2015 Season 3</span>
                        </button>
                    </Link>
                </div>
            </Layout>
        );
    }
}

export default Index;