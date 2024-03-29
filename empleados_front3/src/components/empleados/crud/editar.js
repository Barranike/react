import React from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import Loading from "../../loading/loading";
import { request } from "../../helper/helper";
import MessagePrompt from "../../prompts/message";

import "../empleados.css";
import ConfirmationPrompts from "../../prompts/confirmation";

export default class EmpleadosEditar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idEmpleado: this.props.getIdEmpleado(),
      redirect: false,
      message: {
        text: "",
        show: false,
      },
      confirmation: {
        title: "Modificar empleado",
        text: "Desea modificar el empleado",
        show: false,
      },
      loading: false,
      empleado: {
        nombre: "",
        nit: "",
        telefono: "",
        direccion: "",
        mail: "",
        descripcion: "",
        firma: ""
        
      },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  componentDidMount() {
    this.getEmpleado();
  }
  getEmpleado() {
    this.setState({ loading: true });
    request
      .get(`/empleados/${this.state.idEmpleado}`)
      .then((response) => {
        this.setState({
          empleado: response.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
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
      .put(`/empleados/${this.state.idEmpleado}`, this.state.empleado)
      .then((response) => {
        if (response.data.exito) {
          this.props.changeTab("buscar");
          if (response.data.exito) window.location.reload();
        }
        this.setState({ loading: false });
      })

      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
      
  }
 

  onExitedMessage() {
    if (this.state.rediret) this.props.changeTab("buscar");
  }

  onCancel() {
    this.setState({
      confirmation: {
        ...this.state.confirmation,
        show: false,
      },
    });
  }

  onConfirm() {
    this.setState({
      confirmation: {
        ...this.state.confirmation,
        show: false,
      },
    });
    this.guardarEmpleados();
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
        <ConfirmationPrompts
          show={this.state.confirmation.show}
          title={this.state.confirmation.title}
          text={this.state.confirmation.text}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
        />

        <Loading show={this.state.loading}></Loading>

        <Row>
          <h1>EDITAR REPORTE</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                value={this.state.empleado.nombre}
                onChange={(e) => this.setValue("nombre", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Nit</Form.Label>
              <Form.Control
                value={this.state.empleado.nit}
                onChange={(e) => this.setValue("nit", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>TELEFONO</Form.Label>
              <Form.Control
                value={this.state.empleado.telefono}
                onChange={(e) => this.setValue("telefono", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>DIRECCION</Form.Label>
              <Form.Control
                value={this.state.empleado.direccion}
                onChange={(e) => this.setValue("direccion", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>MAIL</Form.Label>
              <Form.Control
                value={this.state.empleado.mail}
                onChange={(e) => this.setValue("mail", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>DESCRIPCION</Form.Label>
              <Form.Control as="textarea" rows={3}
                value={this.state.empleado.descripcion}
                onChange={(e) => this.setValue("descripcion", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>FIRMA</Form.Label>
              <Form.Control as="textarea" rows={3}
                value={this.state.empleado.firma}
                onChange={(e) => this.setValue("firma", e.target.value)}
              />
            </Form.Group>

            {/* <Button
              variant="primary"
              onClick={this.setState({
                confirmation: {
                  ...this.state.confirmation,
                  show: true,
                },
              })
            } */}
            <Button
              variant="primary"
              onClick={() =>
                this.setState({
                  confirmation: {
                    ...this.state.confirmation,
                    show: true,
                  },
                })
              }
            >
              GUARDAR REPORTE
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
