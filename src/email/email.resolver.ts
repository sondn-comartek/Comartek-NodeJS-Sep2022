import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateActiveAccountRequestInput } from '../shared/inputs';
import { EmailService } from './email.service';

@Resolver()
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}

  @Mutation(() => String)
  async sendOtpToEmail(
    @Args({
      name: 'createActiveAccountRequestInput',
      type: () => CreateActiveAccountRequestInput,
    })
    createActiveAccountRequestInput: CreateActiveAccountRequestInput,
  ) {
    return await this.emailService.sendOtpToEmail(
      createActiveAccountRequestInput,
    );
  }
}
