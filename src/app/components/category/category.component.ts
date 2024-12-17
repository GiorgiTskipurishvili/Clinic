import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  @Output() categorySelected = new EventEmitter<string | null>();

  // Define static categories array
  // categories = [
  //   {name: 'Dermatology'},
  //   { name: 'Anesthesiologist' },
  //   { name: 'Cardologist' },
  //   { name: 'Cosmetologist' },
  //   { name: 'Laboratory Assistant' },
  //   { name: 'Family Doctor' },
  //   { name: 'Pediatrician' },
  //   { name: 'Toxicologist' },
  //   { name: 'Transfusiologist' },
  //   { name: 'Gynecologist' },
  //   { name: 'Endocrinologist' },
  //   { name: 'Gastroenterologist' },
  //   { name: 'Therapist' }
  // ];

  // categories = [
  //   { name: 'Surgery', count: 12 },
  //   { name: 'Anesthesiologist', count: 12 },
  //   { name: 'Cardiologist', count: 8 },
  //   { name: 'Dermatologist', count: 8 },
  //   { name: 'Cosmetologist', count: 5 },
  //   { name: 'Laboratory Assistant', count: 10 },
  //   { name: 'Family Doctor', count: 15 },
  //   { name: 'Pediatrician', count: 9 },
  //   { name: 'Toxicologist', count: 7 },
  //   { name: 'Transfusiologist', count: 4 },
  //   { name: 'Gynecologist', count: 6 },
  //   { name: 'Endocrinologist', count: 11 },
  //   { name: 'Gastroenterologist', count: 3 },
  //   { name: 'ოჯახის ექიმი', count: 20 }

  // ];

    categories = [
    { name: 'ანდროლოგი' , count: 19},
    { name: 'ანესთეზიოლოგი', count: 21 },
    { name: 'კარდიოლოგი', count: 3 },
    { name: 'კოსმეტოლოგი', count: 33 },
    { name: 'ლაბორანტი', count: 41 },
    { name: 'ოჯახის ექიმი', count: 4},
    { name: 'პედიატრი', count: 6 },
    { name: 'ტოქსიკოლოგი', count: 22 },
    { name: 'ტრანსფუზილოგი', count: 5 },
    { name: 'გინეკოლოგი', count: 35 },
    { name: 'დერმატოლოგი', count: 25 },
    { name: 'ენდოკრინოლოგი', count: 22 },
    { name: 'გასტროენტეროლოგი', count: 12 },
    { name: 'ალერგოლოგი', count: 13 },
    { name: 'იმუნოლოგი', count: 7 },
    { name: 'ფსიქიატრი', count: 9 },
    { name: 'ორთოპედი', count: 5 },
    { name: 'ნევროლოგი' , count: 2},
    { name: 'ნეიროქირურგი', count: 1 },
  ];


    visibleCategories = this.categories.slice(0, 14);
    showAll = false;

    
    selectedCategory: string | null = null; 


    toggleShowAll() {
      this.showAll = !this.showAll;
      this.visibleCategories = this.showAll ? this.categories : this.categories.slice(0, 14);
    }
  

    selectCategory(category: string) {
      if (this.selectedCategory === category) {
        this.selectedCategory = null;
        this.categorySelected.emit(null); 
      } else {
        this.selectedCategory = category; 
        this.categorySelected.emit(category); 
      }
    }


    
}
