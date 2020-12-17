import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { Todo } from 'src/app/interfaces/todo';
import { TimelineMax, gsap } from 'gsap';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
  t2 = new TimelineMax();
  tasks = Array<Todo>();

  constructor(
    private router: ActivatedRoute,
    private api: ApiService,
    private route: Router
  ) { }

  ngAfterViewInit(): void {
    const t1 = new TimelineMax();
    t1.from('.task', {opacity: 0, y: 30, stagger: 0.25})
    .from('h1', {opacity: 0, scale: 0, ease: 'back(2)', duration: 1}, '<');
  }

  deleteTaskAnimation(id:number){
    this.t2
    .to(`#task-${id}`, { scale: 0.95, duration: 0.8 })
    .to(`#task-${id}`, { xPercent: 100, opacity: 0, duration: .8 })
    gsap.delayedCall(2, ()=> this.deleteTask(id));
  }

  async deleteTask(id: number){
    const index = this.tasks.findIndex(x => x.id === id);
    this.tasks.splice(index, 1);
    this.api.deleteTask(id).subscribe(data => {});
  }

  incomplete(id: number, option: boolean){
    this.t2.to(`#task-${id}`, { scale: 1, background: 'rgba(255,255,255,1)' });
    this.updateTaskComplete(id, option);
    this.api.taskCompleted(id, {completed: option}).subscribe(data =>{console.log(data)});
  }

  completed(id: number, option:boolean): void{
    this.t2.to(`#task-${id}`, { scale: 0.95, background: 'rgba(255,255,255,0.75)', duration: 0.8 });
    this.updateTaskComplete(id, option);
    this.api.taskCompleted(id, {completed: option}).subscribe(data =>{console.log(data)});
  }

  edit(id: number){
    const selectedTasks = document.querySelectorAll('.task');
    const time = gsap.timeline({});
    const classes = [];

    selectedTasks.forEach(element => {
      if(element.id !== `task-${id}`){
        classes.push('#' + element.id);
      }
    });
    time
    .to(classes, { scale: 0.95, duration: 0.5 })
    .to(classes, { xPercent: 100, opacity: 0, duration: .8 })
    this.navigateUrl(id);
  }

  async navigateUrl(id: number){
    gsap.delayedCall(2, ()=> this.route.navigateByUrl(`/edit/${id}`));
  }

  ngOnInit(): void {
    this.router.data.pipe(pluck('todos', 'rows')).subscribe(data =>{
      this.tasks =  data;
    });
  }

  updateTaskComplete(id:number, option: boolean){
    const item = this.tasks.findIndex(x => x.id === id);
    this.tasks[item].completed = option;
  }

  createTask(){
    const xTo = .5 * document.getElementById('panel').offsetWidth - document.getElementById('new-task').offsetWidth;
    const t1 = new TimelineMax();
    t1.to('.new-task', { x: -xTo, rotationZ: -360, color: 'rgba(0,0,0,0)' })
    .to('.new-task', { scale: 70, transformOrigin: '50% 50%' })
    .to('.new-task', {opacity: 0});
    gsap.delayedCall(1, ()=> this.route.navigateByUrl('/create'));
  }
}
