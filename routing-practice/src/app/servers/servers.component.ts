import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from './servers.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }
  loadServer(id)
  {
    this.router.navigate(['/servers',1,'edit'],{queryParams:{allowEdit:1},fragment:'loading'})

  }
}
