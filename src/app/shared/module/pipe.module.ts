import { NgModule } from '@angular/core';
import { ConvertToStringPipe } from '@shared/pipe/convert-to-string.pipe';
import { FullnamePipe } from '@shared/pipe/fullname.pipe';

@NgModule({
	declarations: [FullnamePipe, ConvertToStringPipe],
	exports: [FullnamePipe, ConvertToStringPipe],
})
export class PipeModule {}
