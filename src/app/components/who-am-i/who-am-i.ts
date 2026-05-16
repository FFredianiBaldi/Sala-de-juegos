import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GithubServiceTs } from '../../services/github.service.ts';


@Component({
  selector: 'app-who-am-i',
  imports: [],
  templateUrl: './who-am-i.html',
  styleUrl: './who-am-i.css',
})
export class WhoAmI {

  private githubService = inject(GithubServiceTs);

  user = toSignal(this.githubService.getUser());

}
