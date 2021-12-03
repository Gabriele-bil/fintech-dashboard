import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivateGuard {
  canDeactivate: () => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivateGuard> {

  canDeactivate(
    component: CanComponentDeactivateGuard,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

}
