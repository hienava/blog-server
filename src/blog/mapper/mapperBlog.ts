import { Blog } from '../models/blog.model';
import { BlogViewModel } from '../view-models/blog-view-model';



export class MapperBlog {
    static mapBlog(blog: Blog): BlogViewModel {
        const blogVM: BlogViewModel = {
            title: blog.title,
            body: blog.body,
            country: blog.country,
            city: blog.city,
            createdBy: blog.createdBy,
            travelDate: blog.travelDate,
            urlPicture: blog.urlPicture,
            urlPhotoAlbum: blog.urlPhotoAlbum,
        };
        return blogVM;

        }

        static mapBlogCollection(blogs: Blog[]): BlogViewModel[] {
            const blogsMapped: BlogViewModel[] = [];

            blogs.forEach(element => {
                const blog:Blog = new Blog();
                blog.title = element.title;
                blog.body = element.body,
                blog.country = element.country,
                blog.city = element.city,
                blog.createdBy = element.createdBy,
                blog.travelDate = element.travelDate,
                blog.urlPicture = element.urlPicture,
                blog.urlPhotoAlbum = element.urlPhotoAlbum,
                
                blogsMapped.push(element);
                
            });

            return blogsMapped;
      
    
            }
        


}