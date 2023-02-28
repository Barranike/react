import { isUndefined } from "util";
import app from "../app.json";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();
const { APIHOST } = app;

export function calculaExpiracionSesion() {
  const now = new Date().getTime();
  const newDate = now + 60 * 30 * 1000;
  return new Date(newDate);
}

export function getSession() {
  return isUndefined(cookies.get("_s")) ? false : cookies.get("_s");
}

function renovarSesion() {
  const sesion = getSession();
  if (!sesion) window.location.href = "/login";

  cookies.set("_s", sesion, {
    path: "/",
    expires: calculaExpiracionSesion(),
  });
  return sesion;
}

export const request = {
  get: function (services) {
    let token = renovarSesion();
    return axios.get(`${APIHOST}${services}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  post: function (services, data) {
    let token = renovarSesion();
    return axios.post(`${APIHOST}${services}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  put: function (services, data) {
    let token = renovarSesion();
    return axios.put(`${APIHOST}${services}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  delete: function (services) {
    let token = renovarSesion();
    return axios.delete(`${APIHOST}${services}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
