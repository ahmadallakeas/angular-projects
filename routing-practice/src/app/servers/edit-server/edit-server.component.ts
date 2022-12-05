import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-gurad.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';
  allowEdit;
  changesSaved = false;
  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.server = this.serversService.getServer(
      +this.route.snapshot.params['id']
    );
    console.log(this.server);
    this.route.params.subscribe((params) => {
      this.server = this.serversService.getServer(+params['id']);
    });
    this.route.queryParams.subscribe((queryParams) => {
      this.allowEdit = queryParams['allowEdit'] == 1 ? true : false;
    });
    this.route.fragment.subscribe();

    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {

    if (!this.allowEdit) {
      return true;
    }
    if (
      (this.serverName !== this.server.name ||
        this.serverStatus !== this.server.status) &&
      !this.changesSaved
    ) {

      return confirm('Are you sure you want to discard changes?');
    } else {

      return true;
    }
  }
}
