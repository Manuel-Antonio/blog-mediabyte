import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit {
  articles: any[] = [];
  paginatedArticles: any[] = [];
  currentPage = 1;
  itemsPerPage = 6;
  totalArticles = 0;

  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getArticles().subscribe((data) => {
      this.articles = data;
      this.totalArticles = this.articles.length;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedArticles = this.articles.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  viewArticle(id: number): void {
    this.router.navigate([`/articles/${id}`]);
  }

  confirmDelete(id: number): void {
    if (confirm('Are you sure you want to delete this article?')) {
      this.deleteArticle(id);
    }
  }

  deleteArticle(id: number): void {
    this.articleService.deleteArticle(id).subscribe(() => {
      this.loadArticles();
    });
  }
}
