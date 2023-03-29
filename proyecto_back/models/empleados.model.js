const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmpleadosSchema = new Schema({
  nombre:{type: String, required: true, max: 60},
  nit:{type: String, required: true, max: 40},
  telefono:{type: String, required: true, max: 40},
  direccion:{type: String, required: true, max: 15},
  mail:{type: String, required: false, max: 70},
  descripcion:{type: String, required: false, max: 150},
  firma:{type: String, required: false, max: 500},

});
module.exports = mongoose.model("empleados", EmpleadosSchema);
