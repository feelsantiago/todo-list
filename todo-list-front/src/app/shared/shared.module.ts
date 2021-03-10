import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
    imports: [CommonModule],
    declarations: [NavbarComponent],
    exports: [NavbarComponent],
    providers: [],
})
export class SharedModule {}
