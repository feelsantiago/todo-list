import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    constructor(private readonly router: Router, private readonly authenticationService: AuthService) {}

    public ngOnInit(): void {}

    public onLogout(): void {
        this.authenticationService.clearStorage();
        void this.router.navigate(['./auth']);
    }
}
