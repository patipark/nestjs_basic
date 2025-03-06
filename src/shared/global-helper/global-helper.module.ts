import { Global, Module } from '@nestjs/common';
import { GlobalHelperService } from './global-helper.service';

@Global() // global module สามารถใช้งานได้ทุกที่ ไม่ต้อง import module นี้ใน module อื่น
@Module({
  providers: [GlobalHelperService],
  exports: [GlobalHelperService], // export the GlobalHelperService
})
export class GlobalHelperModule {}
