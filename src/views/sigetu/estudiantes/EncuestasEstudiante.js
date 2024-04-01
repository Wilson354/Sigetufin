
import {
    Card,
    CardHeader,
    Table,
    Container,
    Row,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane
} from "reactstrap";
import React from "react";
import classnames from "classnames";

class Navs extends React.Component {
    state = {
        tabs: 1
    };
    toggleNavs = (e, state, index) => {
        e.preventDefault();
        this.setState({
            [state]: index
        });
    };
    render() {
        return (
            <>
                <Container className="mt--4" fluid>
                    {/* Table */}
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0">Encuestas</h3>
                                    <div className="nav-wrapper">
                                        <Nav
                                            className="nav-fill flex-column flex-md-row"
                                            id="tabs-icons-text"
                                            pills
                                            role="tablist"
                                        >
                                            <NavItem>
                                                <NavLink
                                                    aria-selected={this.state.tabs === 1}
                                                    className={classnames("mb-sm-3 mb-md-0", {
                                                        active: this.state.tabs === 1
                                                    })}
                                                    onClick={e => this.toggleNavs(e, "tabs", 1)}
                                                    href="#docente"
                                                    role="tab"
                                                >
                                                    Evaluacion Docente
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    aria-selected={this.state.tabs === 2}
                                                    className={classnames("mb-sm-3 mb-md-0", {
                                                        active: this.state.tabs === 2
                                                    })}
                                                    onClick={e => this.toggleNavs(e, "tabs", 2)}
                                                    href="tutor"
                                                    role="tab"
                                                >
                                                    Evaluacion al tutor
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <tbody>
                                        <Card className="shadow">
                                            <CardBody>
                                                <TabContent activeTab={"tabs" + this.state.tabs}>
                                                    <TabPane tabId="tabs1">
                                                    </TabPane>
                                                    <TabPane tabId="tabs2">
                                                    </TabPane>
                                                </TabContent>
                                            </CardBody>
                                        </Card>

                                    </tbody>
                                </Table>
                            </Card>
                        </div>
                    </Row>

                </Container>
            </>
        );
    };
}

export default Navs;
