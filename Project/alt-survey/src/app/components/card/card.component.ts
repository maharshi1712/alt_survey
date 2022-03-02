import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Router } from '@angular/router';
import { SurveyModel } from '../../models/survey.model';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { FilterPipe } from 'src/app/pages/home/filter.pipe';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  // animations: [
  //   trigger('listAnimation', [
  //     transition('* <=> *', [
  //       query(
  //         ':enter',
  //         [
  //           style({ opacity: 0 }),
  //           stagger('100ms', animate('200ms ease-in', style({ opacity: 1 }))),
  //         ],
  //         { optional: true }
  //       ),
  //       query(':leave', animate('20ms ease-out', style({ opacity: 0 })), {
  //         optional: true,
  //       }),
  //     ]),
  //   ]),
  // ],
})
export class CardComponent implements OnInit {
  constructor(private surveyService: SurveyService, private router: Router) {
    this.paginator;
  }

  showPlaceholder = false;
  showContent = false;
  isLoaderShow = true;
  surveyNotFound = false;
  pageNotFound = false;
  surveys: SurveyModel[] = [];
  surveysSlice: SurveyModel[] = [];
  user_id: any;
  @Input() selectedFilter: String = '';
  @Input() surveyName: String = '';
  @Input() surveyType: String = '';
  @Input() searchInput: string = '';
  @ViewChild('paginator') paginator: any;
  username: any = `${localStorage
    .getItem('first_name')
    ?.toLocaleLowerCase()}-${localStorage
    .getItem('last_name')
    ?.toLocaleLowerCase()}`;
  ngOnInit() {
    this.showPlaceholder = true;
    setTimeout(() => {
      this.showPlaceholder = false;
    }, 3000);
  }

  pageEvent: PageEvent = new PageEvent();

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.user_id = localStorage.getItem('user_id');

    if (this.selectedFilter === 'All Surveys') {
      this.isLoaderShow = true;
      this.showContent = false;
      this.surveyNotFound = false;
      this.pageNotFound = false;
      this.surveyService.getSurvey().subscribe(
        (response) => {
          setTimeout(() => {
            this.isLoaderShow = false;
            this.pageNotFound = false;
            let res: any = response;
            if (res.length === 0) {
              this.surveyNotFound = true;
            } else {
              this.surveyNotFound = false;
              this.surveys = [];
              res.forEach((element: any) => {
                this.surveys.push(element);
              });
              this.paginator.firstPage();
              this.surveysSlice = this.surveys.slice(0, 6);
              this.showContent = true;
            }
          }, 2000);
        },
        (error) => {
          this.isLoaderShow = false;
          this.pageNotFound = true;
          console.log(error);
        }
      );
    } else {
      this.isLoaderShow = true;
      this.showContent = false;
      this.surveyNotFound = false;
      this.pageNotFound = false;
      setTimeout(() => {
        this.isLoaderShow = false;
        this.pageNotFound = false;
        this.surveyService.showMySurvey(this.user_id).subscribe(
          (response) => {
            let res: any = response;
            if (res.length === 0) {
              this.surveyNotFound = true;
            } else {
              this.surveyNotFound = false;
              this.surveys = [];
              res.forEach((element: any) => {
                this.surveys.push(element);
              });
              this.paginator.firstPage();
              this.surveysSlice = this.surveys.slice(0, 6);
              this.showContent = true;
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }, 1200);
    }

    console.log(this.surveysSlice);
  }

  onViewSurvey(suvrey_id: Number) {
    this.router.navigate([`${this.username}/view/${suvrey_id}/`]);
    this.surveyService.viewSurvey(suvrey_id);
  }

  onPageChange(event: PageEvent) {
    this.showPlaceholder = true;
    setTimeout(() => {
      this.showPlaceholder = false;
    }, 1200);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.surveys.length) {
      endIndex = this.surveys.length;
    }
    this.surveysSlice = this.surveys.slice(startIndex, endIndex);
  }

  onDeleteSurvey(survey: SurveyModel, survey_id: Number) {
    if (survey.createdBy != survey.modifiedBy) {
      Swal.fire(
        'You are not authorized person to delete',
        'You can Only Modify it!'
      );

      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.surveyService.deleteSurvey(survey_id).subscribe((response) => {
          console.log(response);
        });
        Swal.fire('Deleted!', 'Your Survey has been deleted.');
        setTimeout(() => {
          let currentUrl = this.router.url;
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([currentUrl]);
            });
        }, 1500);
      }
    });
  }
}
