/* import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import EmpleadosCrear from "./crear";


export default function MiComponent() {
  const signatureRef = useRef();
  const miEmpleadosCrearRef = useRef(new EmpleadosCrear());

  const handleSave = () => {
    const dataUrl = signatureRef.current.toDataURL();
    miEmpleadosCrearRef.current.guardarFirma(dataUrl);
  };

  return (
    <div>
      <SignatureCanvas
        penColor='black'
        canvasProps={{width: 500, height: 200, className: 'sigCanvas',  border: "1px solid black",margin: "auto",}}
        ref={signatureRef}
      />
      <button onClick={handleSave}>Guardar firma</button>
    </div>
  );
} */
import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
export default class MiComponente extends React.Component {
  constructor(props) {
    super(props);
    this.signatureCanvas = React.createRef();
    this.state = {
      firma: null
    };
  }

  handleSave() {
    const signatureDataUrl = this.signatureCanvas.current.toDataURL();
    this.setState({ firma: signatureDataUrl });

    // Establecer el valor del campo de la firma en el formulario
    document.getElementById('campo-firma').value = signatureDataUrl;

    // Enviar la imagen de la firma al servidor
    fetch('/guardar-firma', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firma: signatureDataUrl })
    })
    .then(response => {
      // Manejar la respuesta del servidor
    })
    .catch(error => {
      // Manejar el error
    });
  }

  render() {
    return (
      <div>
        <form>
          <SignatureCanvas ref={this.signatureCanvas} penColor='black' canvasProps={{width: 500, height: 200, className: 'signature-canvas'}} />
          <button onClick={this.handleSave.bind(this)}>Guardar</button>
          <input type='hidden' id='campo-firma' name='campo-firma' value={this.state.firma} />
          <button type='submit'>Enviar</button>
        </form>
      </div>
    );
  }
}