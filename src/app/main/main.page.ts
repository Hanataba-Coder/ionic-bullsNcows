import { Component, OnInit } from '@angular/core';
import { userInfo } from 'os';
import { TestBed } from '@angular/core/testing';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  arr = [];
  correctNum = 0;
  correctIndex = 0;
  usrInput ;
  status: string;
  round = 1;
  toggle = true;
  previousNum;
  toggleAnswer = false;

  constructor(private alertController: AlertController) { }

  ngOnInit() {
    this.randomNum();
  }

  randomNum() {
    this.arr = [];
    while (this.arr.length < 4) {
        const r = Math.floor(Math.random() * 10);
        if (this.arr.indexOf(r) === -1) {
          this.arr.push(r);
        }
    }
    console.log( 'answer: ' + this.arr);
  }

  async presentAlertPlayAgain() {
    const alert = await this.alertController.create({
      header: 'Congratulation!',
      message: 'you use total ' + this.round + ' rounds',
      buttons: [
        {
          text: 'play again',
          handler: () => {
            this.playAgain();
          }
        }
      ]
    });

    await alert.present();
  }

  checkDupiclate(arr): boolean {
    const valuesSoFar = [];
    for (const num of arr) {
      const value = num;
      console.log(valuesSoFar);
      if (valuesSoFar.indexOf(value) !== -1) {
        return true;
      }
      valuesSoFar.push(value);
    }
    return false;
  }

  calculateNum() {
    this.correctIndex = 0;
    this.correctNum = 0;

    if (this.usrInput == null || this.usrInput.length < 4) {
      this.status = 'plese enter 4 digits';
    } else {

      const arrNum = Array.from(this.usrInput.toString()).map(Number);
      console.log(arrNum);
      console.log(this.checkDupiclate(arrNum));

      if (this.checkDupiclate(arrNum)) {
        this.status = 'please enter uniqu number';
      } else {
        this.previousNum = 'previous number: ' + this.usrInput;
        this.status = '';
        arrNum.map((num, index) => {
          // tslint:disable-next-line: no-shadowed-variable
          this.arr.map(( arrNum, arrIndex) => {
            if (arrNum === num) {
              this.correctNum += 1;
              if (arrIndex === index) {
                this.correctIndex += 1;
              }
            }
          });
        });
        this.status = 'correct number: ' + this.correctNum + ' correct index: ' + this.correctIndex;
        if (this.correctIndex === 4 && this.correctNum === 4) {
          this.presentAlertPlayAgain();
        } else {

          this.round += 1;
        }
      }
    }
    this.usrInput = '';
  }

  toggleAns() {
    this.toggleAnswer = !this.toggleAnswer;
  }

  playAgain() {
    this.status = '';
    this.previousNum = '';
    this.toggleAnswer = false;
    this.round = 1;
    this.randomNum();
  }
}
