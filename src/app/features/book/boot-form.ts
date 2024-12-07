import { Validators } from "@angular/forms";
import { ControlsOf, FormControl, FormGroup } from "@ngneat/reactive-forms";


export interface BookModel {
    id?:string,
    name: string;
    author: string;
}

export const bookForm = new FormGroup<ControlsOf<BookModel>>({
    id: new FormControl<string | undefined>(undefined),
    name: new FormControl<string>({value:'',disabled:false}, [Validators.required]),
    author: new FormControl<string>(undefined, [Validators.required])
});