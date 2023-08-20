from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
import jwt
from decouple import config
from app.models import User


class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            token = request.headers.get("Authorization", None)
        if not token:
            return None
        try:
            payload = jwt.decode(token, config("JWT_SECRET"), algorithms=[
                                 config("JWT_ALGORITHM")])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token has expired")
        except jwt.DecodeError:
            raise AuthenticationFailed("Token is invalid")

        user_id = payload.get('id')
        user = User.objects.get(id=user_id)
        return (user, None)
