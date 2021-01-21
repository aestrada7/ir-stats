import { raceResultsFetch } from '../../services/DataFetch';

import Layout from '../../components/Layout';
import SubsessionLink from '../../components/SubsessionLink';
import RaceResultTable from '../../components/RaceResultTable';

class Race extends React.Component {
    static async getInitialProps({ query }) {
        const subsessionId = query.race[0];
        const pageTitle = `Subsession ${subsessionId} Detail`;

        let sessionData = await raceResultsFetch(null, null, null, null, null, subsessionId);
        return { pageTitle, sessionData, subsessionId };
    }

    render() {
        const { pageTitle, sessionData, subsessionId } = this.props;
        return (
            <Layout title={pageTitle} backButton={true}>
                <SubsessionLink subsessionid={subsessionId} custid={182407} val="Open Results in iRacing Website"></SubsessionLink>
                <RaceResultTable sessionData={sessionData}></RaceResultTable>
            </Layout>
        );
    }
}

export default Race;