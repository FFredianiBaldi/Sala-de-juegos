import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GithubService } from '../../services/github.service';
import { GithubUser } from '../../interfaces/interfaces';


@Component({
  selector: 'app-who-am-i',
  imports: [],
  templateUrl: './who-am-i.html',
  styleUrl: './who-am-i.css',
})
export class WhoAmI {

  private githubService = inject(GithubService);

  user = toSignal<GithubUser | undefined>(this.githubService.getUser());

}
