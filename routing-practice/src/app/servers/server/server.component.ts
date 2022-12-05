import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // const id= +this.route.snapshot.params['id']
    // this.server = this.serversService.getServer(id);
    // console.log(this.server)
    // this.route.params.subscribe((params) => {
    //   this.server = this.serversService.getServer(+params['id']);
    // });

    this.route.data.subscribe((data: Data) => {
      this.server = data['server'];
    });
  }
  onEdit() {
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });
  }
}
