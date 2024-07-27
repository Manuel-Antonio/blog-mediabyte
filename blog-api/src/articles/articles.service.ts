import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticlesService {
  private readonly logger = new Logger(ArticlesService.name);
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
  ) {}

  async create(article: Partial<Article>): Promise<Article> {
    const newArticle = this.articlesRepository.create(article);
    return this.articlesRepository.save(newArticle);
  }

  async findAll(): Promise<Article[]> {
    return this.articlesRepository.find();
  }

  async findOne(id: number): Promise<Article> {
    return this.articlesRepository.findOneBy({ id });
  }

  async update(id: number, updateData: Partial<Article>): Promise<Article> {
    const article = await this.articlesRepository.findOneBy({ id });
    if (!article) {
      throw new Error('Article not found');
    }
    Object.assign(article, updateData);
    return this.articlesRepository.save(article);
  }
  
  async remove(id: number): Promise<void> {
    await this.articlesRepository.delete(id);
  }

  async searchByTitle(title: string): Promise<Article[]> {
    this.logger.log(`Searching for articles with title: ${title}`);
    const results = await this.articlesRepository.find({
      where: {
        title: Like(`%${title}%`),
      },
    });
    this.logger.log(`Found ${results.length} articles`);
    return results;
  }

   async findByAuthor(author: string): Promise<Article[]> {
    return this.articlesRepository.find({ where: { author } });
  }
}
