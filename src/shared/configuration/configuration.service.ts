import { Injectable } from '@nestjs/common';
import { Configuration } from './configuration.enum';

@Injectable()
export class ConfigurationService {

    static connectionString: string = process.env.NODE_ENV != 'production' ? process.env[Configuration.MONGO_URI] : process.env[Configuration.MONGO_URI_PRO] ;
    //To deploy in heroku
    private environmentHosting: string = process.env.NODE_ENV || 'development';

    get isDevelopment(): boolean {
        return this.environmentHosting === 'development';
    }

    //To access from another class to this method
    get(name: string): string {
        return process.env[name];
    }




}
