const clientRoot = "http://localhost:3000/";

export const settings = {
  authority: "https://keycloak.ordina-jworks.io/auth/realms/react-base-app",
  client_id: "reactjs-base-app",
  redirect_uri: `${clientRoot}signin-callback.html`,
  silent_redirect_uri: `${clientRoot}silent-renew.html`,
  automaticSilentRenew: true,
  // tslint:disable-next-line:object-literal-sort-keys
  post_logout_redirect_uri: `${clientRoot}`,
  response_type: "code",
  scope: "openid",
};
