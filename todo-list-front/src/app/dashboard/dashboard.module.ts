import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { ProjectModule } from '../project/project.module';

@NgModule({
    imports: [CommonModule, DashboardRoutingModule, ProjectModule, SharedModule],
    declarations: [DashboardComponent],
})
export class DashboardModule {}
