import { UserService } from 'src/app/services/user.service';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class AdminGuard implements CanActivate{

    constructor(private userService: UserService){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.userService.isAdmin();
        
    }

}