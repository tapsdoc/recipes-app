import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
    template: `
      <div class="backdrop" (click)="onClose()"></div>
      <div class="alert-box">
        <p>{{ message }}</p>
        <div class="alert-box-actions">
          <button type="button" (click)="onClose()" class="btn btn-primary">Close</button>
        </div>
      </div>
    `,
    styles: [`
        .backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.75);
            z-index: 50;
        }
        
        .alert-box {
            position: fixed;
            top: 30vh;
            left: 20vw;
            width: 60vw;
            padding: 16px;
            z-index: 100;
            background: white;
            box-shadow: 0 2px 8px rgb(0, 0, 0, 0.26);
        }
        
        .alert-box-actions {
            text-align: right;
        }
    `],
    selector: 'app-alert'
})
export class AlertComponent implements OnInit {
    
    @Input() message = '';
    @Output() close = new EventEmitter<void>();
    
    ngOnInit(): void {
    }
    
    onClose() {
        this.close.emit();
    }
}