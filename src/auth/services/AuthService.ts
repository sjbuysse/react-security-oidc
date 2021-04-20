import { Log, User, UserManager } from "oidc-client";

import * as constants from "../constants";

export class AuthService {
  public userManager: UserManager;

  constructor() {
    const settings = {
      authority: constants.stsAuthority,
      client_id: constants.clientId,
      redirect_uri: `${constants.clientRoot}signin-callback.html`,
      silent_redirect_uri: `${constants.clientRoot}silent-renew.html`,
      // tslint:disable-next-line:object-literal-sort-keys
      post_logout_redirect_uri: `${constants.clientRoot}`,
      response_type: "code",
      scope: constants.clientScope,
    };
    this.userManager = new UserManager(settings);

    Log.logger = console;
    Log.level = Log.INFO;
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public renewToken(): Promise<User> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
}
