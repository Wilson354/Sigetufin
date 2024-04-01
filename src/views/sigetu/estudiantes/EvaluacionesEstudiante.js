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
  TabPane,
  Col
} from "reactstrap";

import React from "react";
import classnames from "classnames";

class EvaluacionesE extends React.Component {
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
        <Container fluid>
            <Col xl="12">
            <Card className="shadow">
                <CardBody >
                  <TabContent activeTab={"tabsin" + this.state.tabsin}>
                    <TabPane tabId="tabsin1">
                      <Table striped className="align-items-center table-flush" responsive>
                        <thead className="thead-Default" >
                          <tr className="bg-info">
                            <th scope="col">Asignatura</th>
                            <th scope="col">Profesor</th>
                            <th scope="col">Parcial 1</th>
                            <th scope="col">Parcial 2</th>
                            <th scope="col">Parcial 3</th>
                            <th scope="col">Ev. Final</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">Integradora</th>
                            <td>Ramirez Campoy Lorena</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>SA</td>
                            <td>SA</td>
                          </tr>
                        </tbody>
                      </Table>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>

            <Col xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Evaluaciones Escolares</h3>
                  <div className="nav-wrapper">
                    <Nav
                      pills
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          aria-selected={this.state.tabs === 3}
                          className={classnames("mb-sm-3 mb-md-0", {
                            active: this.state.tabs === 3
                          })}
                          onClick={e => this.toggleNavs(e, "tabs", 3)}
                          href="#pablo"
                          role="tab"
                        >
                          Primer
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          aria-selected={this.state.tabs === 4}
                          className={classnames("mb-sm-3 mb-md-0", {
                            active: this.state.tabs === 4
                          })}
                          onClick={e => this.toggleNavs(e, "tabs", 4)}
                          href="#pablo"
                          role="tab"
                        >
                          Segundo
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          aria-selected={this.state.tabs === 5}
                          className={classnames("mb-sm-3 mb-md-0", {
                            active: this.state.tabs === 5
                          })}
                          onClick={e => this.toggleNavs(e, "tabs", 5)}
                          href="#pablo"
                          role="tab"
                        >
                          tercero
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </CardHeader>
                <CardBody className="mt--5">
                  <TabContent activeTab={"tabs" + this.state.tabs}>
                    <TabPane tabId="tabs3">
                      <Table striped className="align-items-center table-flush" responsive>
                        <thead className="thead-Default" >
                          <tr className="bg-info">
                            <th scope="col">Asignatura</th>
                            <th scope="col">Profesor</th>
                            <th scope="col">Parcial 1</th>
                            <th scope="col">Parcial 2</th>
                            <th scope="col">Parcial 3</th>
                            <th scope="col">Ev. Final</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">Integradora</th>
                            <td>Ramirez Campoy Lorena</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>sa</td>
                            <td>SA</td>
                          </tr>
                          <tr>
                            <th scope="row">Videojuegos</th>
                            <td>Tellez Barrientos Omar</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>SA</td>
                            <td>SA</td>
                          </tr>
                          <tr>
                            <th scope="row">Desarrollo movil</th>
                            <td>Atlitec Mejia Jonathan</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                          <tr>
                            <th scope="row">Negociacion empresarial</th>
                            <td>Miranda Rivera Eduardo</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                          <tr>
                            <th scope="row">ingles</th>
                            <td>Chavez Torrez Yaxben</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                          <tr>
                            <th scope="row">Desarrollo software</th>
                            <td>Tellez Barrientos Omar</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                          <tr>
                            <th scope="row">Negociacion empresarial</th>
                            <td>Miranda Rivera Eduardo</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                          <tr>
                            <th scope="row">Negociacion empresarial</th>
                            <td>Miranda Rivera Eduardo</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                          <tr>
                            <th scope="row">Negociacion empresarial</th>
                            <td>Miranda Rivera Eduardo</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                          <tr>
                            <th scope="row">Negociacion empresarial</th>
                            <td>Miranda Rivera Eduardo</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                        </tbody>
                      </Table>
                    </TabPane>

                    <TabPane tabId="tabs4">
                      <Table striped className="align-items-center table-flush" responsive>
                        <thead className="thead-Default" >
                          <tr className="bg-default">
                            <th scope="col">Asignatura</th>
                            <th scope="col">Profesor</th>
                            <th scope="col">Parcial 1</th>
                            <th scope="col">Parcial 2</th>
                            <th scope="col">Parcial 3</th>
                            <th scope="col">Ev. Final</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">Integradora</th>
                            <td>Ramirez Campoy Lorena</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td className="text-danger">NA</td>
                            <td className="text-danger">NA</td>
                          </tr>
                          <tr>
                            <th scope="row">Videojuegos</th>
                            <td>Tellez Barrientos Omar</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>SA</td>
                            <td>SA</td>
                          </tr>
                          <tr>
                            <th scope="row">Desarrollo movil</th>
                            <td>Atlitec Mejia Jonathan</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                          <tr>
                            <th scope="row">Negociacion empresarial</th>
                            <td>Miranda Rivera Eduardo</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                          <tr>
                            <th scope="row">ingles</th>
                            <td>Chavez Torrez Yaxben</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                          <tr>
                            <th scope="row">Desarrollo software</th>
                            <td>Tellez Barrientos Omar</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                          <tr>
                            <th scope="row">Negociacion empresarial</th>
                            <td>Miranda Rivera Eduardo</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                          <tr>
                            <th scope="row">Negociacion empresarial</th>
                            <td>Miranda Rivera Eduardo</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                          <tr>
                            <th scope="row">Negociacion empresarial</th>
                            <td>Miranda Rivera Eduardo</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                          <tr>
                            <th scope="row">Negociacion empresarial</th>
                            <td>Miranda Rivera Eduardo</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                        </tbody>
                      </Table>
                    </TabPane>

                    <TabPane tabId="tabs5">
                      <Table striped className="align-items-center table-flush" responsive>
                        <thead className="thead-Default">
                          <tr className="bg-success">
                            <th scope="col">Asignatura</th>
                            <th scope="col">Profesor</th>
                            <th scope="col">Parcial 1</th>
                            <th scope="col">Parcial 2</th>
                            <th scope="col">Parcial 3</th>
                            <th scope="col">Ev. Final</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">Integradora</th>
                            <td>Ramirez Campoy Lorena</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                          <tr>
                            <th scope="row">Videojuegos</th>
                            <td>Tellez Barrientos Omar</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                          <tr>
                            <th scope="row">Desarrollo movil</th>
                            <td>Atlitec Mejia Jonathan</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                          <tr>
                            <th scope="row">Negociacion empresarial</th>
                            <td>Miranda Rivera Eduardo</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                          <tr>
                            <th scope="row">ingles</th>
                            <td>Chavez Torrez Yaxben</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                          <tr>
                            <th scope="row">Desarrollo software</th>
                            <td>Tellez Barrientos Omar</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                          <tr>
                            <th scope="row">Negociacion empresarial</th>
                            <td>Miranda Rivera Eduardo</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                          <tr>
                            <th scope="row">Negociacion empresarial</th>
                            <td>Miranda Rivera Eduardo</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                          <tr>
                            <th scope="row">Negociacion empresarial</th>
                            <td>Miranda Rivera Eduardo</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                          <tr>
                            <th scope="row">Negociacion empresarial</th>
                            <td>Miranda Rivera Eduardo</td>
                            <td>AU</td>
                            <td>DE</td>
                            <td>DE</td>
                            <td>DE</td>
                          </tr>
                        </tbody>
                      </Table>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
        </Container>
      </>
    );
  };
}

export default EvaluacionesE;
