import GravitAPI from "gravit-api";

export default ({env}, inject) => {
  const api = new GravitAPI;
  api.apiUrl = env.apiUrl; // Временные костыли, надеюсь
  inject('api', api);
}
