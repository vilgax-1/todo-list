import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { Todo } from 'src/app/interfaces/todo';
import { ApiService } from 'src/app/services/api/api.service';
import { gsap, TimelineMax } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
gsap.registerPlugin(TextPlugin);

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, AfterViewInit {
  task: Todo;
  form: FormGroup;

  constructor(
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private api: ApiService,
    private route: Router
  ){
    this.form = this.fb.group({
      id: new FormControl(0, Validators.required),
      name: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      completed: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.router.data.pipe(pluck('todo', 'task')).subscribe(data=> {
      this.task = data[0];
      this.insertInfo(data[0], this.form.value);
    });
  }

  ngAfterViewInit(): void{
    const t1 = new TimelineMax();
    t1.from('h1', { opacity: 0, scale: 0, ease: 'back(4)'})
    .from('.card', {  width: 0, height: 0, borderRadius: '50%', transformOrigin: '50% 50% ', duration: .8 })
    .from('.back', { y: -30, opacity:0 })

  }


  insertInfo(body, form): void {
    Object.keys(form).forEach(item => {
      this.form.get(item).setValue(body[item]);
    });
  }

  back(){
    const t1 = new TimelineMax();
    t1.to('.back', { rotationZ: -360, transformOrigin: '50% 50%'});
    gsap.delayedCall(1, ()=> this.route.navigateByUrl('/'));
  }

  update(){
    if(this.form.valid){
      const t1 = gsap.timeline({});
      this.api.updateTask(this.task.id,this.form.value).subscribe(data => {
        t1.to('#send', {text: "UPDATED", duration: 1 })
        .to('#send', {text: "SEND", duration: .8});
      });
    }else{
      this.form.markAllAsTouched();
    }
  }
}
