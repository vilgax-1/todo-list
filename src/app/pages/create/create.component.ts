import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TimelineMax, gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ApiService } from 'src/app/services/api/api.service';
gsap.registerPlugin(TextPlugin);

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements AfterViewInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private api: ApiService
  ) {
    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      completed: new FormControl(false)
    });
  }

  ngAfterViewInit(): void {
    const t1 = new TimelineMax();
    t1.from('h1', { delay: 0.2, y: -100, opacity: .5, ease: 'bounce'})
    .from('.card', { duration: 1, yPercent: -200, opacity: 0 , ease: 'bounce' })
    .from('.error', {opacity: 0})
  }

  back(){
    const t1 = new TimelineMax();
    t1.to('.back', { rotationZ: -360, transformOrigin: '50% 50%'});
    gsap.delayedCall(0.3, ()=> this.route.navigateByUrl('/'));
  }


  submit(){
    if(this.form.valid){
      this.api.createTask(this.form.value).subscribe(data =>{
        if(data.ok){
          const t2 = gsap.timeline({});
          t2.to('#send', {text: 'CREATED', duration: .8 })
          .to('#send', { text: 'SEND', duration: .8 }, '+=.5')
          this.form.reset();
          this.form.get('completed').setValue(false);
        }
      });
    }else{
      const t2 = new TimelineMax();
      t2.to('.error', { yPercent: -98})
      .to('.error', { delay: 2, yPercent: 0})
      this.form.markAllAsTouched();
    }
  }

}
