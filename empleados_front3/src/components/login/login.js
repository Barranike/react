import React from "react"; //atajo imr
import axios from "axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import app from "../app.json";
import "./login.css";
import { isNull } from "util";
import Cookies from "universal-cookie";
import { calculaExpiracionSesion } from "../helper/helper";
import Loading from "../loading/loading";

const { APIHOST } = app;
const cookies = new Cookies();

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      usuario: "",
      pass: "",
    };
  }
  iniciarSesion() {
    this.setState({ loading: true });

    axios.post(`${APIHOST}/usuarios/login`, {
        usuario: this.state.usuario,
        pass: this.state.pass,
      })
      .then((response) => {
        if (isNull(response.data.token)) {
          alert("usuario y/o contraseña invalidas");
        } else {
          cookies.set("_s", response.data.token, {
            path: "/",
            expires: calculaExpiracionSesion(),
          });

          this.props.history.push("/empleados");
          window.location.reload(); /* linea para que cargue en la misma ventana */
        }

        this.setState({ loading: false });
      })

      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.state.show)
      this.setState({ show: nextProps.show });
  }

  render() {
    return (
      <Container id="login-container">
        <Loading show={this.state.loading} />

        <Row>
          <Col>
            <Row>
              <h2>INICIAR SECION</h2>
            </Row>

            <Row>
              <Col
                sm="12"
                xs="12"
                md={{ span: 4, offset: 4 }}
                lg={{ span: 4, offset: 4 }}
                xl={{ span: 4, offset: 4 }}
              >
                <Form>
                  <Form.Group>
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                      onChange={(e) =>
                        this.setState({ usuario: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => this.setState({ pass: e.target.value })}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    onClick={() => {
                      this.iniciarSesion();
                    }}
                  >
                    Iniciar sesion

                    
                  </Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
