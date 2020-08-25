class SubsessionLink extends React.Component {
    render() {
        const { subsessionid, custid, val } = this.props;
        const BASE_URL = "https://members.iracing.com/membersite/member/EventResult.do";

        return (
            <React.Fragment>
                <a target="_blank" 
                   href={`${BASE_URL}?subsessionid=${subsessionid}&custid=${custid}`}>{val}</a>
            </React.Fragment>
        );
    }
}

export default SubsessionLink;