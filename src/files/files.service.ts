import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FileViewModel } from './view-models/file-view-model';
import { MapperFile } from './mapper/mapperFile';
import { BlogService } from '../blog/blog.service';
import { ConfigurationService } from 'src/shared/configuration/configuration.service';
import { Configuration } from 'src/shared/configuration/configuration.enum';


@Injectable()
export class FilesService {
    constructor(
        private _blogService: BlogService,
        private readonly _configurationService: ConfigurationService) { }


    async uploadFile(files: any): Promise<FileViewModel> {

        const cloudinary = require("cloudinary").v2;
        cloudinary.config({
            // eslint-disable-next-line @typescript-eslint/camelcase
            cloud_name: "dh3brdrrz",
            // eslint-disable-next-line @typescript-eslint/camelcase
            api_key: "712365938938492",
            // eslint-disable-next-line @typescript-eslint/camelcase
            api_secret: "o4d5k3O8dv21kH0SgTZgzDIlU04"
        });
        const path = files[0].path;

        cloudinary.uploader.upload(path).then((result) => {
            console.log('info subida: ', result);
            this._blogService.findOne({ _id: files[0].originalname })
                .then(blog => {
                    if (blog != null) {
                        console.log('secure_url', result.secure_url);
                        blog.urlPicture = result.secure_url;
                        blog.save();
                        console.log('se ha guardado en id{0}', files[0].originalname)
                    }
                    else {
                        console.log('blog no encontrado');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }).catch(err => {
            if (err) throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        });

        try {
            return MapperFile.mapFile(files[0]);
        }
        catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

}
