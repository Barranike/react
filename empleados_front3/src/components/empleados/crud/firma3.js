import React, { useRef, useState } from "react";
import SignaturePad from "react-signature-canvas";
import "reactjs-popup/dist/index.css";

class MiComponente extends React.Component {
  const [imageURL, setImageUrl] = useState(null);
  const sigCanvas = useRef({});
  const limpiar = () => sigCanvas.current.clear();
  const firmaGuardada = () =>
    setImageUrl(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));

    render() {
  return (
    <div className="App">
      <h1>FIRMA</h1>
      <SignaturePad
        ref={sigCanvas}
        canvasProps={{
          className: "signatureCanvas",
        }}
      />
      <button onClick={limpiar}>Limpiar</button>
      <button primary onClick={firmaGuardada}>
        Listo!
      </button>

      <br />
      <br />

      {imageURL ? (
        <img
          src={imageURL}
          alt="mi firma"
          style={{
            display: "block",
            margin: "auto",
            border: "1px solid black",
            width: "150px",
          }}
        />
      ) : null}
    </div>
  );
}}
