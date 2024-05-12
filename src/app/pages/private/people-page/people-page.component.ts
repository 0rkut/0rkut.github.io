import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { User } from '@models/user.model';
import { PeopleService } from '@services/people/people.service';
import { UserService } from '@services/user/user.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-people-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeoplePageComponent {
  private peopleService = inject(PeopleService);

  private userService = inject(UserService);

  people$ = this.peopleService.list();

  user$ = this.userService.user$;

  myConnectionIds$ = this.people$.pipe(
    map((connections) => connections.map((connection) => connection.id)),
  );

  blockedConnectionIds$ = this.people$.pipe(
    map((blockedConnections) =>
      blockedConnections.map((blockedConnection) => blockedConnection.id),
    ),
  );

  newConnectionIds$ = this.people$.pipe(
    map((newConnections) =>
      newConnections.map((newConnection) => newConnection.id),
    ),
  );

  trackByPersonId(index: number, person: User) {
    return person.id;
  }
}
