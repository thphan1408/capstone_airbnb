import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/createComment.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCommentDto } from './dto/updateComment.dto';

@ApiTags('Comments')
@Controller('api')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/comments')
  async getListComments(@Res() response): Promise<any> {
    const data = await this.commentService.getListComments();
    response.status(data.status).json(data);
  }

  @Post('/comments')
  @ApiBody({ type: CreateCommentDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async createComment(
    @Body() body: CreateCommentDto,
    @Res() response,
  ): Promise<any> {
    const data = await this.commentService.createComment(body);
    response.status(data.status).json(data);
  }

  @Put('/comments/:id')
  @ApiBody({ type: CreateCommentDto })
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updateComment(
    @Param('id') id,
    @Body() body: UpdateCommentDto,
    @Res() response,
  ): Promise<any> {
    const data = await this.commentService.updateComment(id, body);
    response.status(data.status).json(data);
  }

  @Delete('/comments/:id')
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deleteComment(
    @Param('id') id,
    @Res() response,
  ): Promise<any> {
    const data = await this.commentService.deleteComment(id);
    response.status(data.status).json(data);
  }

  @Get('/comments/:maPhong')
  @ApiParam({ name: 'maPhong', required: true, type: Number })
  async getCommentByIdRoom(@Param('maPhong') maPhong, @Res() response): Promise<any> {
    const data = await this.commentService.getCommentByIdRoom(maPhong);
    response.status(data.status).json(data);
  }
}
