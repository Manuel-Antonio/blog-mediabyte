import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Put,
  HttpException,
  HttpStatus,
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './article.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}
  private readonly logger = new Logger(ArticlesService.name);
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() article: Partial<Article>): Promise<Article> {
    return this.articlesService.create(article);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<Article[]> {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number): Promise<Article> {
    return this.articlesService.findOne(id);
  }
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: number,
    @Body() article: Partial<Article>,
  ): Promise<Article> {
    return this.articlesService.update(id, article);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number): Promise<void> {
    return this.articlesService.remove(id);
  }

  @Get('search')
  @UseGuards(JwtAuthGuard)
  async searchByTitle(@Query('title') title: string): Promise<Article[]> {
    console.log(`Received search request with title: ${title}`);
    try {
      if (!title) {
        throw new HttpException(
          'Title query parameter is required',
          HttpStatus.BAD_REQUEST,
        );
      }
      const articles = await this.articlesService.searchByTitle(title);
      console.log(`Search results: ${JSON.stringify(articles)}`);
      return articles;
    } catch (error) {
      console.error(`Error in searchByTitle endpoint: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  @Get('search-by-author')
  @UseGuards(JwtAuthGuard)
  async searchByAuthor(@Query('author') author: string): Promise<Article[]> {
    this.logger.log(`Searching for articles with author: ${author}`);
    if (!author) {
      this.logger.error('Author query parameter is missing');
      throw new BadRequestException('Author query parameter is required');
    }

    try {
      const articles = await this.articlesService.findByAuthor(author);
      this.logger.log(
        `Found ${articles.length} articles for author: ${author}`,
      );
      return articles;
    } catch (error) {
      this.logger.error(
        `Error searching for articles by author: ${author}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Error while searching for articles',
      );
    }
  }
}
