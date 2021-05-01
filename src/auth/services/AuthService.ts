import { Log, User, UserManager } from "oidc-client";
import { settings } from "../oidc-settings";

export class AuthService {
  public userManager: UserManager;

  constructor() {
    this.userManager = new UserManager(settings);
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public renewToken(): Promise<User | void> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }

  public removeUser(): Promise<void> {
    return this.userManager.removeUser();
  }
}
