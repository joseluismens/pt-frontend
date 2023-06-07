import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { admin, user } from '../../constantes/const';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('snav') snav: any;
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  @ViewChild('contenidoInterno') contenidoInterno: any
  @ViewChild('divContenidoInterno') divContenidoInterno: any
  isButtonHidden = true;
  items: any = [];
  fullname:string = '';

  constructor( changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService:AuthService) { 
    
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    let  rol =localStorage.getItem('rol');
    this.fullname = localStorage.getItem('fullname')!;
    if (rol =='admin') {
      this.items = admin
    }
    if (rol == 'user') {
      this.items = user
    }
    

  }

  logout(){
    this.authService.logout();
  }

  detectScroll($event:any){
    let scrollPosition = this.contenidoInterno.elementRef.nativeElement.scrollTop
    if (scrollPosition >= 1) {
      this.isButtonHidden = false;
    } else {
      this.isButtonHidden = true;
    }
  }
}
