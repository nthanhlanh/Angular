import { Validators } from "@angular/forms";
import { ControlsOf, FormControl, FormGroup } from "@ngneat/reactive-forms";


export interface BookModel {
    name: string;
    author: string;
}

export const bookForm = new FormGroup<ControlsOf<BookModel>>({
    name: new FormControl<string>({value:'',disabled:false}, [Validators.required]),
    author: new FormControl<string>(undefined, [Validators.required])
});