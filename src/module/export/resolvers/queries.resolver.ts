import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Roles } from 'src/module/auth/decorators/roles.decorator';
import { Role } from 'src/module/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/module/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/module/auth/guards/roles.guard';
import { ExportService } from '../export.service';

@Resolver(() => String)
export class ExportQueryResolver {
  constructor(
    private readonly exportService: ExportService
  ) { }

  @Query(() => String)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  exportAllBook(
    @Args('offset') offset: number,
    @Args('limit') limit: number
  ) {
    return this.exportService.exportBook(offset, limit);
  }
}