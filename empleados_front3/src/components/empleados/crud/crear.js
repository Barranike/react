import React from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import { request } from "../../helper/helper";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";
import "reactjs-popup/dist/index.css";
import SignatureCanvas from "react-signature-canvas";
import "reactjs-popup/dist/index.css";
import Firma from "../crud/firma";
import "reactjs-popup/dist/index.css";
export default class EmpleadosCrear extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firmaa: "",
      rediret: false,
      message: {
        text: "",
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
        firma: "",
      },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
    this.signatureCanvas = React.createRef();
  }

  handleClear() {
    this.signatureCanvas.current.clear();
  }
  handleSave() {
    const signatureDataUrl = this.signatureCanvas.current.toDataURL();
   
    // Hacer algo con la imagen de la firma, como enviarla a un servidor
    this.setState({ firmaa: signatureDataUrl });
    //document.getElementById("campo-firmaa").value = signatureDataUrl;
   
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
          if (response.data.exito) window.location.reload();
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
    if (this.state.rediret) this.props.changeTab("buscar");
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
          <h1>Crear Reportes</h1>
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
              <Form.Label>NIT</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("nit", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>TELEFONO</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("telefono", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>DIRECCION</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("direccion", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>MAIL</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("mail", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>DESCRIPCION</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => this.setValue("descripcion", e.target.value)}
              />
            </Form.Group>
            <div>
              <SignatureCanvas
                ref={this.signatureCanvas}
                penColor="black"
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: "signature-canvas",
                }}
              />
              <button
                id="borrar"
                type="button"
                onClick={this.handleClear.bind(this)}
              >
                Limpiar
              </button>
              <button
                id="guardar"
                type="button"
                onClick={this.handleSave.bind(this)}
              >
                Guardar
              </button>
              <input
                id="campo-firma"
                name="campo-firma"
                value={this.state.firmaa}
              />
            </div>

            <Form.Group  className="mb-3" controlId="formBasic">
              <Form.Label>FIRMA</Form.Label>
             
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={3}
                  value={this.state.firmaa}
                  onChange={(e) => this.setValue("firma", e.target.value)}
                />
              
            </Form.Group>
          </Form>

          <Button
            variant="primary"
            onClick={() => console.log(this.guardarEmpleados())}
          >
            Guardar REPORTE
          </Button>
        </Row>
      </Container>
    );
  }
}
