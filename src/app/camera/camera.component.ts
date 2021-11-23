import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  public showWebcam = true;
  public allowCameraSwitch = false;
  public webcamImage: WebcamImage = null;
  private trigger: Subject<void> = new Subject<void>();

  @Output() shot = new EventEmitter<WebcamImage>();

  constructor() { }

  ngOnInit(): void {
  }
  
  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public retry(): void {
    this.webcamImage = null;
    this.showWebcam = true;
  }

  public save(): void {
    this.shot.emit(this.webcamImage);
  }
  
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.showWebcam = false;
  }
}
