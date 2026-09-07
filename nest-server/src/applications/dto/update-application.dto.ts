import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicationDto } from './create-application.dto';
import { Patch, Body, Param } from '@nestjs/common';

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {}
