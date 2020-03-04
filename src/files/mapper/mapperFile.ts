
import { FileViewModel } from '../view-models/file-view-model';

export class MapperFile {
    static mapFile(file: any): FileViewModel {
        const fileVM: FileViewModel = {
            fileName: file.filename,
            originalName: file.originalname,
            size: file.size
        };
        return fileVM;

    }

}