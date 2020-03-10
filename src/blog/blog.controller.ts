import { Controller, Get, Post, HttpStatus, HttpException, Delete, Put, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { Blog } from './models/blog.model';
import { BlogService } from './blog.service';
import { BlogParams } from './view-models/blog-params.model';
import { BlogViewModel } from './view-models/blog-view-model';
import { ApiException } from '../shared/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id';
import { MapperBlog } from './mapper/mapperBlog';
import { UserRole } from 'src/user/models/user-role.enum';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/shared/guards/roles.guard';



@Controller('blogs')
@ApiTags('blogs')
@ApiBearerAuth()
export class BlogController {

  constructor(private readonly _blogService: BlogService) { }



  @Post('create')
  @Roles(UserRole.User)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCreatedResponse({ type: BlogViewModel })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Blog.modelName, 'Create'))
  async create(@Body() params: BlogParams): Promise<BlogViewModel> {

    if (!params.title) {
      throw new HttpException('Title is required', HttpStatus.BAD_REQUEST);
    }
    if (!params.body) {
      throw new HttpException('Body is required', HttpStatus.BAD_REQUEST);
    }

    if (!params.country) {
      throw new HttpException('Country is required', HttpStatus.BAD_REQUEST);
    }
    if (!params.city) {
      throw new HttpException('City is required', HttpStatus.BAD_REQUEST);
    }
    if (!params.createdBy) {
      throw new HttpException('CreatedBy is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const newBlog = await this._blogService.newBlog(params);
      return MapperBlog.mapBlog(newBlog);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }


  }

  @Get()
  @Roles(UserRole.Admin, UserRole.User)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({ status: HttpStatus.OK, type: BlogViewModel, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(Blog.modelName, 'GetAll'))
  @ApiQuery({ name: 'id', required: false })
  @ApiQuery({ name: 'country', required: false })
  async get(@Query('id') id?: string,@Query('country') country?: string): Promise<BlogViewModel[]> {

    let filter;

    if (id) {
      filter = { _id: id };
    }
    if(country)
     { 
       filter = { country: country };
     }

    try {
      const blogs: Blog[] = await this._blogService.findAll(filter);
      return MapperBlog.mapBlogCollection(blogs);
    }
    catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  @Roles(UserRole.Admin, UserRole.User)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({ status: HttpStatus.CREATED, type: BlogViewModel })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(Blog.modelName, 'Update'))
  async update(@Body() vm: BlogViewModel): Promise<BlogViewModel> {

    console.log(vm);

    if (!vm || vm.id) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }
    const exist: BlogViewModel = await this._blogService.findById(vm._id);

    if (!exist) {
      throw new HttpException(`${vm.id} Not foound`, HttpStatus.NOT_FOUND);
    }
    exist.body = vm.body;
    exist.title = vm.title;
    exist.country = vm.country;
    exist.createdBy = vm.createdBy;
    exist.city = vm.city;
    exist.travelDate = vm.travelDate;
    exist.urlPhotoAlbum = vm.urlPhotoAlbum;
    exist.urlPicture = vm.urlPicture;

    try {
      const blogUpdated: Blog = await this._blogService.update(vm._id, exist);
      return MapperBlog.mapBlog(blogUpdated);
    }
    catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }


  }

  @Delete(':id')
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({ status: HttpStatus.OK, type: BlogViewModel })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(Blog.modelName, 'Delete'))
  async delete(@Param('id') id: string): Promise<BlogViewModel> {

    try {
      const blogDeleted: Blog = await this._blogService.delete(id);
      return MapperBlog.mapBlog(blogDeleted);
    }
    catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }




}
