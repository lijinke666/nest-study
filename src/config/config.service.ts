import * as Joi from 'joi';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

export interface EnvConfig {
  NODE_ENV: 'development' | 'production' | 'test';
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test'])
        .default('development'),
      PORT: Joi.number().default(3000),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get isDevelopment(): boolean {
    return Boolean(this.envConfig.NODE_ENV === 'development');
  }
  get isProduction(): boolean {
    return Boolean(this.envConfig.NODE_ENV === 'production');
  }
  get isTest(): boolean {
    return Boolean(this.envConfig.NODE_ENV === 'test');
  }
}