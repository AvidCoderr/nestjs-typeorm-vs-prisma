export interface JwtDto {
  userId: string;
  sessionVersion?: number;
}

export interface HealthCheck {
  pong: boolean;
}
