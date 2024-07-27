import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css'],
})
export class ArticleFormComponent implements OnInit {
  articleForm: FormGroup;
  isEdit = false;
  articleId: number | null = null;
  imagePreviewUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      author: ['', Validators.required],
      imageUrl: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.articleId = +id;
      this.articleService.getArticle(this.articleId).subscribe((data) => {
        this.articleForm.patchValue({
          ...data,
          createdAt: data.createdAt ? new Date(data.createdAt) : null,
        });
      });
    }
  }
  updateImagePreview(url: string): void {
    this.imagePreviewUrl = url;
  }

  onSubmit(): void {
    if (this.articleForm.invalid) return;

    const article: Article = this.articleForm.value;
    article.createdAt = new Date().toISOString();
    if (this.isEdit) {
      this.articleService
        .updateArticle(this.articleId!, article)
        .subscribe(() => {
          this.router.navigate(['/articles']);
        });
    } else {
      this.articleService.createArticle(article).subscribe(() => {
        this.router.navigate(['/articles']);
      });
    }
  }
}
