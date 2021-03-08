import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router, private tokenService : TokenStorageService) {}

  canActivate(): boolean {
    if(this.tokenService.getToken() && this.tokenService.getToken()!='undefined') {
        return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}