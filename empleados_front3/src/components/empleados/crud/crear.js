import React from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import { request } from "../../helper/helper";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";

export default class EmpleadosCrear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        rediret: false,
      message: {
        text: "",
        show: false,
      },
      loading: false,
      empleado: {
        nombre: "",
        apellido_p: "",
        apellido_m: "",
        telefono: "",
        mail: "",
        direccion: "",
      },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
  }

   setValue(inicioe, value) {
    this.setState({
      empleado: {
        ...this.state.empleado,
        [inicioe]: value,
      },
    });
  } 

  guardarEmpleados() {
    this.setState({ loading: true });
    request
      .post("/empleados", this.state.empleado)
      .then((response) => {
        if (response.data.exito) {
          this.setState({
            rediret: response.data.exito,
            message: {
              text: response.data.msg,
              show: true,
            },
          });
        }
        this.setState({ loading: false });
         console.log(response.data); 
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: true });
      });
  }

onExitedMessage() {
    if (this.state.rediret) this.props.changeTab( 'buscar' );
}

  render() {
    return (
      <Container id="empleados-crear-container">
        

        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2500}
          onExited={this.onExitedMessage}

        /> 

        <Loading show={this.state.loading}></Loading>
        <Row>
          <h1>Crear Empleados</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("nombre", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>APELLIDO</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("apellido_p", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>SECOND APELLIDO</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("apellido_m", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>TELEFONO</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("telefono", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>MAIL</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("mail", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>DIRECCION</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("direccion", e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={() => console.log(this.guardarEmpleados())}>
              Guardar Empleado
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
 