import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectId, ObjectIdTransform } from '../common/object-id.helper';

@Injectable()
export class ObjectIdPipe implements PipeTransform {
    public transform(value: string, _metadata: ArgumentMetadata): ObjectId {
        try {
            const _id = ObjectIdTransform(value);
            return _id;
        } catch {
            throw new BadRequestException('Invalid Id parameter!');
        }
    }
}
