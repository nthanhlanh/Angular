export * from './bookController.service';
import { BookControllerService } from './bookController.service';
export * from './hazelcastController.service';
import { HazelcastControllerService } from './hazelcastController.service';
export const APIS = [BookControllerService, HazelcastControllerService];
