import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/User';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() username: string;

  faSignOutAlt = faSignOutAlt;
  faHome = faHome;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
  }

  click(){
    this.tokenStorage.signOut();
  }
}
