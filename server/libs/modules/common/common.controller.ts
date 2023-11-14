import { RedisCacheService } from 'libs/cache';
import {
  Controller,
  Get,
  UseGuards,
  Req,
  Body,
  Session,
  Res,
  Post,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CommonService } from './common.service';
import { Keep } from 'shared/decorators/keep.decorator';
import { CaptchaGuard } from 'shared/guards/captcha.guard';
import { QueryDictDto, getSmsDto } from './common.dto';
import { generateSmsCodeKey } from 'libs/cache';
import { ErrorEnum } from 'shared/contants/error-code.contants';
import { ApiException } from 'shared/exceptions/api.exception';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('common')
@ApiTags('公共服务')
export class CommonController {
  constructor(private commonService: CommonService) {}

  @Get('captcha')
  @ApiOperation({ summary: '获取图形验证码' })
  @Keep()
  async captcha(@Session() session, @Res() res) {
    const svgCaptcha = await this.commonService.captche(); //创建验证码
    session.captcha = svgCaptcha.text; //使用session保存验证，用于登陆时验证
    console.log(session.captcha);
    res.type('image/svg+xml'); //指定返回的类型
    res.send(svgCaptcha.data); //给页面返回一张图片
  }

  @Post('sms')
  @ApiOperation({ summary: '获取短信验证码' })
  @UseGuards(CaptchaGuard)
  async sms(@Body() body: getSmsDto) {
    const { mobile } = body;
    return this.commonService.getSmsCaptcha(mobile);
  }

  @Get('dict')
  @ApiOperation({ summary: '获取字典项' })
  async dict(@Query() queryParam: QueryDictDto) {
    return this.commonService.dict(queryParam);
  }

  @Post('uploadImage')
  @ApiOperation({ summary: '上传图片' })
  @UseGuards(AuthGuard('USER_JWT'))
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * 4,
      },
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new ApiException(ErrorEnum.FILE_TYPE_ERROR), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.commonService.uploadImage(file);
  }

  @Get('ossClear')
  @ApiOperation({ summary: 'oss文件清理' })
  async ossClear() {
    return this.commonService.ossClear();
  }
}
