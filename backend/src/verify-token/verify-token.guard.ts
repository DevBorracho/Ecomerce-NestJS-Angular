import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRequest } from 'src/interfaces/authRequest';
@Injectable()
export class VerifyTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<AuthRequest>();
    // 1. Intentar obtener el token de cookie o header;
    const token = this.extractTokenFromRequest(request);
    if (!token) {
      throw new UnauthorizedException('No se encontró token');
    }
    try {
      // 2. Verificar el token
      const payload = await this.jwtService.verifyAsync(token);
      // 3. Guardar payload en req.user para usar luego en controladores
      request.user = payload;
      return true; // deja pasar
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
  private extractTokenFromRequest(request: AuthRequest): string | null {
    // 1) Intentar cookie
    const cookieToken = request.cookies?.['token'];
    if (cookieToken) return cookieToken;
    // 2) Intentar header Authorization: Bearer

    const authHeader = request.headers['authorization'];
    if (!authHeader) return null;
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) return null;
    return token;
  }
}
