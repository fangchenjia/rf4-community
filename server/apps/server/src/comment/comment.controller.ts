import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreatePositionCommentDto } from './dto/create-comment.dto';
import { QueryPositionCommentDto } from './dto/query-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { ReqUser } from 'shared/decorators/req-user.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('comment')
@ApiTags('评论模块')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('position')
  @ApiOperation({ summary: '创建评论' })
  @UseGuards(AuthGuard('USER_JWT'))
  create(@Body() createCommentDto: CreatePositionCommentDto,  @ReqUser() user) {
    createCommentDto.user = user.id;
    return this.commentService.createPositionComment(createCommentDto);
  }

  @Get('position')
  findPositionComments(@Query() query: QueryPositionCommentDto) {
    return this.commentService.findPositionComments(query);
  }

  @Get('position:id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Delete('position:id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
