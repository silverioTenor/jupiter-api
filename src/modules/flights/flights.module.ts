import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { FlightController } from './controllers/Flight.controller';
import { FlightService } from './services/flight.service';

@Module({
  imports: [SharedModule],
  controllers: [FlightController],
  providers: [FlightService],
})
export class FlightsModule {}
