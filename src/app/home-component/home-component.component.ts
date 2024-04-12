import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../app/data.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {
  form !: FormGroup;
  dataList: any[] = [];
  selectedIndex: number | null = null;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.getData();
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.patchValue({ image: reader.result });
      };
    }
  }

  getData(): void {
    this.dataService.getData()
      .subscribe(data => {
        this.dataList = data;
      });
  }

  addData() {
    if (this.form.valid) {
      const formData = this.form.value;
      if (this.selectedIndex !== null) {
        this.dataList[this.selectedIndex] = formData;
        this.selectedIndex = null;
      } else {
        this.dataList.push(formData);
      }
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }

  editData(data: any) {
    this.form.patchValue(data);
    this.selectedIndex = this.dataList.indexOf(data);
  }

  deleteData(data: any) {
    const index = this.dataList.indexOf(data);
    if (index !== -1) {
      this.dataList.splice(index, 1);
    }
  }
}
